import { Hono } from 'hono';
import { zValidator } from '@hono/zod-validator';
import { streamSSE } from 'hono/streaming';
import { z } from 'zod';
import { generateWithLLM, generateWithLLMStream } from '../services/llm';
import {
  NANO_BANANA_PRO_SYSTEM_PROMPT,
  buildUserPrompt,
} from '../prompts/system';
import type { GeneratePromptResponse, ParsedSlide } from '../prompts/types';
import { parseSlides } from '../prompts/types';

const generateSchema = z.object({
  content: z.object({
    type: z.enum(['text', 'topic', 'file', 'url']),
    text: z.string().optional(),
    topic: z.string().optional(),
    fileContent: z.string().optional(),
    fileName: z.string().optional(),
    url: z.string().optional(),
    urlContent: z.string().optional(),
  }),
  style: z.enum([
    'professional',
    'technical',
    'creative',
    'infographic',
    'educational',
    'pixel-art',
    'minimalist',
    'dark-neon',
    'hand-drawn',
    'glassmorphism',
    'vintage',
    '3d-isometric',
    'watercolor',
    'newspaper',
    'flat-design',
    'gradient-mesh',
    'sci-fi-hud',
    'deep-ocean',
    'dev-console',
  ]),
  settings: z.object({
    aspectRatio: z.enum(['16:9', '4:3', '1:1', '9:16']),
    slideCount: z.number().min(1).max(20),
    colorPalette: z.enum([
      'auto',
      'corporate-blue',
      'modern-purple',
      'nature-green',
      'warm-orange',
      'elegant-monochrome',
      'vibrant-gradient',
      'ocean-teal',
      'sunset-pink',
      'forest-earth',
      'royal-gold',
      'arctic-frost',
      'neon-night',
    ]),
    layoutStructure: z.enum(['visual-heavy', 'text-heavy', 'balanced']),
  }),
});

export const promptRouter = new Hono();

/**
 * Build content text from request body
 */
function extractContentText(body: z.infer<typeof generateSchema>): string {
  switch (body.content.type) {
    case 'text':
      return body.content.text || '';
    case 'topic':
      return `Topic: ${body.content.topic || 'General presentation'}`;
    case 'file':
      return body.content.fileContent
        ? `Content from file "${body.content.fileName || 'uploaded file'}":\n${body.content.fileContent}`
        : '';
    case 'url':
      return body.content.urlContent
        ? `Content from URL "${body.content.url}":\n${body.content.urlContent}`
        : body.content.url
          ? `Create a presentation about the content from: ${body.content.url}`
          : '';
    default:
      return '';
  }
}

// Original non-streaming endpoint (kept for backwards compatibility)
promptRouter.post(
  '/generate-prompt',
  zValidator('json', generateSchema),
  async (c) => {
    const body = c.req.valid('json');
    const contentText = extractContentText(body);

    if (!contentText.trim()) {
      return c.json<GeneratePromptResponse>(
        {
          success: false,
          error: 'No content provided',
        },
        400
      );
    }

    const userPrompt = buildUserPrompt({
      content: contentText,
      style: body.style,
      colorPalette: body.settings.colorPalette,
      layoutStructure: body.settings.layoutStructure,
      aspectRatio: body.settings.aspectRatio,
      slideCount: body.settings.slideCount,
    });

    try {
      const generatedPrompts = await generateWithLLM(
        NANO_BANANA_PRO_SYSTEM_PROMPT,
        userPrompt
      );

      // Parse the output into individual slides
      const slides = parseSlides(generatedPrompts);

      return c.json<GeneratePromptResponse>({
        success: true,
        prompts: generatedPrompts,
        slides,
        metadata: {
          style: body.style,
          slideCount: body.settings.slideCount,
          aspectRatio: body.settings.aspectRatio,
        },
      });
    } catch (error) {
      console.error('LLM generation error:', error);
      return c.json<GeneratePromptResponse>(
        {
          success: false,
          error:
            error instanceof Error ? error.message : 'Failed to generate prompts',
        },
        500
      );
    }
  }
);

/**
 * Parse slides progressively from accumulated buffer.
 * Returns newly completed slides and leaves partial slide in buffer.
 */
function parseNewSlides(buffer: string, alreadyEmitted: Set<number>): {
  newSlides: ParsedSlide[];
  updatedBuffer: string;
} {
  const newSlides: ParsedSlide[] = [];

  // Match complete slides: **Slide N: Title** followed by ``` code block ```
  const slidePattern = /\*\*Slide\s+(\d+):\s*([^*]+)\*\*\s*```(?:\w*\n)?([\s\S]*?)```/gi;

  let match;
  let lastMatchEnd = 0;

  while ((match = slidePattern.exec(buffer)) !== null) {
    const slideNumber = parseInt(match[1], 10);
    const title = match[2].trim();
    const prompt = match[3].trim();

    if (prompt && !alreadyEmitted.has(slideNumber)) {
      newSlides.push({ slideNumber, title, prompt });
      alreadyEmitted.add(slideNumber);
    }

    lastMatchEnd = Math.max(lastMatchEnd, match.index + match[0].length);
  }

  // Keep only the unmatched portion (potential partial slide)
  // But we need to be careful to keep enough context for partial matches
  // Find the last **Slide marker that might be incomplete
  const lastSlideMarker = buffer.lastIndexOf('**Slide');
  if (lastSlideMarker > lastMatchEnd) {
    // There's a partial slide starting, keep from there
    return {
      newSlides,
      updatedBuffer: buffer.slice(lastSlideMarker),
    };
  }

  // Otherwise just keep trailing content that might be start of new slide
  return {
    newSlides,
    updatedBuffer: buffer.slice(lastMatchEnd),
  };
}

// Streaming endpoint using SSE
promptRouter.post(
  '/generate-prompt-stream',
  zValidator('json', generateSchema),
  async (c) => {
    const body = c.req.valid('json');
    const contentText = extractContentText(body);

    if (!contentText.trim()) {
      return c.json(
        {
          type: 'error',
          error: 'No content provided',
        },
        400
      );
    }

    const userPrompt = buildUserPrompt({
      content: contentText,
      style: body.style,
      colorPalette: body.settings.colorPalette,
      layoutStructure: body.settings.layoutStructure,
      aspectRatio: body.settings.aspectRatio,
      slideCount: body.settings.slideCount,
    });

    return streamSSE(c, async (stream) => {
      let buffer = '';
      const emittedSlides = new Set<number>();
      let eventId = 0;

      try {
        // Start streaming from LLM
        for await (const chunk of generateWithLLMStream(
          NANO_BANANA_PRO_SYSTEM_PROMPT,
          userPrompt
        )) {
          buffer += chunk;

          // Try to parse any complete slides
          const { newSlides, updatedBuffer } = parseNewSlides(buffer, emittedSlides);
          buffer = updatedBuffer;

          // Emit each new slide as an SSE event
          for (const slide of newSlides) {
            await stream.writeSSE({
              id: String(++eventId),
              event: 'slide',
              data: JSON.stringify(slide),
            });
          }
        }

        // Final parse for any remaining complete slides
        const finalSlides = parseSlides(buffer);
        for (const slide of finalSlides) {
          if (!emittedSlides.has(slide.slideNumber)) {
            await stream.writeSSE({
              id: String(++eventId),
              event: 'slide',
              data: JSON.stringify(slide),
            });
            emittedSlides.add(slide.slideNumber);
          }
        }

        // Send completion event
        await stream.writeSSE({
          id: String(++eventId),
          event: 'done',
          data: JSON.stringify({
            totalSlides: emittedSlides.size,
            style: body.style,
            aspectRatio: body.settings.aspectRatio,
          }),
        });
      } catch (error) {
        console.error('Streaming error:', error);
        await stream.writeSSE({
          id: String(++eventId),
          event: 'error',
          data: JSON.stringify({
            error: error instanceof Error ? error.message : 'Stream failed',
          }),
        });
      }
    });
  }
);

