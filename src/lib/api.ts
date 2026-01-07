import type { ContentInput, SlideStyle, PresentationSettings, ParsedSlide } from '@/types/slidePrompt';

const API_BASE = import.meta.env.VITE_API_BASE || '';

export interface LLMConfig { apiKey: string; baseURL: string; model: string; }
export interface GeneratePromptRequest { content: ContentInput; style: SlideStyle; settings: PresentationSettings; llmConfig?: LLMConfig; }
export interface GeneratePromptResponse { success: boolean; prompts?: string; slides?: ParsedSlide[]; error?: string; metadata?: { style: SlideStyle; slideCount: number; aspectRatio: string; }; }
export interface ExtractUrlResponse { success: boolean; data?: { title: string; content: string; description?: string; url: string; }; error?: string; }
export interface StreamEvent { type: 'slide' | 'done' | 'error'; data: ParsedSlide | { totalSlides: number; style: string; aspectRatio: string } | { error: string }; }

export async function generatePrompt(request: GeneratePromptRequest): Promise<GeneratePromptResponse> {
  const response = await fetch(`${API_BASE}/api/generate-prompt`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `HTTP error: ${response.status}`);
  }
  return response.json();
}

export async function* generatePromptStream(request: GeneratePromptRequest, signal?: AbortSignal): AsyncGenerator<StreamEvent> {
  const response = await fetch(`${API_BASE}/api/generate-prompt-stream`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    signal,
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `HTTP error: ${response.status}`);
  }
  const reader = response.body?.getReader();
  if (!reader) throw new Error('No response body');

  const decoder = new TextDecoder();
  let buffer = '';
  let currentEvent = '';
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() || '';
      for (const line of lines) {
        if (line.startsWith('event:')) currentEvent = line.slice(6).trim();
        else if (line.startsWith('data:') && currentEvent) {
          const data = line.slice(5).trim();
          try { yield { type: currentEvent as 'slide' | 'done' | 'error', data: JSON.parse(data) }; currentEvent = ''; } catch { /* ignore */ }
        }
      }
    }
  } finally { reader.releaseLock(); }
}

export async function extractUrl(url: string): Promise<ExtractUrlResponse> {
  const response = await fetch(`${API_BASE}/api/extract-url`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url }),
  });
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.error || `HTTP error: ${response.status}`);
  }
  return response.json();
}
