// Shared types matching the frontend definitions

export type ContentInputType = 'text' | 'topic' | 'file' | 'url';

export type SlideStyle =
  | 'professional'
  | 'technical'
  | 'creative'
  | 'infographic'
  | 'educational'
  | 'pixel-art'
  | 'minimalist'
  | 'dark-neon'
  | 'hand-drawn'
  | 'glassmorphism'
  | 'vintage'
  | '3d-isometric'
  | 'watercolor'
  | 'newspaper'
  | 'flat-design'
  | 'gradient-mesh'
  | 'sci-fi-hud'
  | 'deep-ocean'
  | 'dev-console';

export type AspectRatio = '16:9' | '4:3' | '1:1' | '9:16';

export type LayoutStructure = 'visual-heavy' | 'text-heavy' | 'balanced';

export type ColorPalette =
  | 'auto'
  | 'corporate-blue'
  | 'modern-purple'
  | 'nature-green'
  | 'warm-orange'
  | 'elegant-monochrome'
  | 'vibrant-gradient'
  | 'ocean-teal'
  | 'sunset-pink'
  | 'forest-earth'
  | 'royal-gold'
  | 'arctic-frost'
  | 'neon-night';

export interface ContentInput {
  type: ContentInputType;
  text?: string;
  topic?: string;
  fileContent?: string;
  fileName?: string;
  url?: string;
  urlContent?: string;
}

export interface PresentationSettings {
  aspectRatio: AspectRatio;
  slideCount: number;
  colorPalette: ColorPalette;
  layoutStructure: LayoutStructure;
}

export interface GeneratePromptRequest {
  content: ContentInput;
  style: SlideStyle;
  settings: PresentationSettings;
}

export interface ParsedSlide {
  slideNumber: number;
  title: string;
  prompt: string;
}

export interface GeneratePromptResponse {
  success: boolean;
  prompts?: string;
  slides?: ParsedSlide[];
  error?: string;
  metadata?: {
    style: SlideStyle;
    slideCount: number;
    aspectRatio: AspectRatio;
  };
}

/**
 * Parse the LLM output into individual slides
 * Expected format:
 * **Slide [N]: [Title]**
 * ```
 * [prompt content]
 * ```
 */
export function parseSlides(rawOutput: string): ParsedSlide[] {
  const slides: ParsedSlide[] = [];

  // Match pattern: **Slide N: Title** followed by code block
  const slidePattern = /\*\*Slide\s+(\d+):\s*([^*]+)\*\*\s*```(?:\w*\n)?([\s\S]*?)```/gi;

  let match;
  while ((match = slidePattern.exec(rawOutput)) !== null) {
    const slideNumber = parseInt(match[1], 10);
    const title = match[2].trim();
    const prompt = match[3].trim();

    if (prompt) {
      slides.push({ slideNumber, title, prompt });
    }
  }

  // Fallback: if no matches found, try alternative patterns
  if (slides.length === 0) {
    // Try simpler pattern without code blocks
    const simplePattern = /\*\*Slide\s+(\d+):\s*([^*]+)\*\*\s*\n+([\s\S]*?)(?=\*\*Slide|\n\n\*\*|$)/gi;

    while ((match = simplePattern.exec(rawOutput)) !== null) {
      const slideNumber = parseInt(match[1], 10);
      const title = match[2].trim();
      let prompt = match[3].trim();

      // Remove code block markers if present
      prompt = prompt.replace(/^```\w*\n?/, '').replace(/\n?```$/, '').trim();

      if (prompt) {
        slides.push({ slideNumber, title, prompt });
      }
    }
  }

  return slides.sort((a, b) => a.slideNumber - b.slideNumber);
}

export interface ExtractUrlRequest {
  url: string;
}

export interface ExtractUrlResponse {
  success: boolean;
  data?: {
    title: string;
    content: string;
    description?: string;
    url: string;
  };
  error?: string;
}
