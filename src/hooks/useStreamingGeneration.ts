import { useState, useCallback, useRef } from 'react';
import { generatePromptStream, type GeneratePromptRequest, type StreamEvent } from '@/lib/api';
import type { ParsedSlide, GeneratedPrompt } from '@/types/slidePrompt';

export interface UseStreamingGenerationState {
    isGenerating: boolean;
    slides: ParsedSlide[];
    error: string | null;
    generatedPrompt: GeneratedPrompt | null;
}

export interface UseStreamingGenerationReturn extends UseStreamingGenerationState {
    generate: (request: GeneratePromptRequest) => Promise<void>;
    cancel: () => void;
    reset: () => void;
}

export function useStreamingGeneration(): UseStreamingGenerationReturn {
    const [isGenerating, setIsGenerating] = useState(false);
    const [slides, setSlides] = useState<ParsedSlide[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [generatedPrompt, setGeneratedPrompt] = useState<GeneratedPrompt | null>(null);

    const abortControllerRef = useRef<AbortController | null>(null);

    const cancel = useCallback(() => {
        abortControllerRef.current?.abort();
        abortControllerRef.current = null;
        setIsGenerating(false);
    }, []);

    const reset = useCallback(() => {
        cancel();
        setSlides([]);
        setError(null);
        setGeneratedPrompt(null);
    }, [cancel]);

    const generate = useCallback(async (request: GeneratePromptRequest) => {
        // Cancel any existing generation
        cancel();

        // Reset state
        setSlides([]);
        setError(null);
        setGeneratedPrompt(null);
        setIsGenerating(true);

        // Create new abort controller
        abortControllerRef.current = new AbortController();

        try {
            const collectedSlides: ParsedSlide[] = [];

            for await (const event of generatePromptStream(request, abortControllerRef.current.signal)) {
                switch (event.type) {
                    case 'slide': {
                        const slide = event.data as ParsedSlide;
                        collectedSlides.push(slide);
                        // Sort slides by number to ensure correct order
                        const sortedSlides = [...collectedSlides].sort((a, b) => a.slideNumber - b.slideNumber);
                        setSlides(sortedSlides);
                        break;
                    }
                    case 'done': {
                        // Build final generated prompt
                        const sortedSlides = [...collectedSlides].sort((a, b) => a.slideNumber - b.slideNumber);
                        const plainText = sortedSlides
                            .map(s => `**Slide ${s.slideNumber}: ${s.title}**\n\`\`\`\n${s.prompt}\n\`\`\``)
                            .join('\n\n');

                        setGeneratedPrompt({
                            plainText,
                            slides: sortedSlides,
                            jsonFormat: {
                                model: 'nano-banana-pro',
                                messages: [
                                    { role: 'system', content: 'Nano Banana Pro optimized prompts' },
                                    { role: 'user', content: plainText },
                                ],
                            },
                        });
                        break;
                    }
                    case 'error': {
                        const errorData = event.data as { error: string };
                        setError(errorData.error);
                        break;
                    }
                }
            }
        } catch (err) {
            if (err instanceof Error && err.name === 'AbortError') {
                // Generation was cancelled, not an error
                return;
            }
            setError(err instanceof Error ? err.message : 'Failed to generate prompts');
        } finally {
            setIsGenerating(false);
            abortControllerRef.current = null;
        }
    }, [cancel]);

    return {
        isGenerating,
        slides,
        error,
        generatedPrompt,
        generate,
        cancel,
        reset,
    };
}
