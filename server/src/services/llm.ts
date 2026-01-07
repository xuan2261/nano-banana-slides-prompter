import OpenAI from 'openai';
import type { ChatCompletionContentPart } from 'openai/resources/chat/completions';

interface LLMConfig { apiKey: string; baseURL: string; model: string; }

function normalizeBaseURL(url: string): string {
  const parsed = new URL(url.trim());
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') throw new Error('Base URL must use http or https');
  return parsed.origin + parsed.pathname.replace(/\/+$/, '').replace(/\/+/g, '/').replace(/(?:\/v1)?\/*$/, '') + '/v1';
}

const defaultConfig: LLMConfig = {
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: normalizeBaseURL(process.env.OPENAI_API_BASE || 'https://api.openai.com'),
  model: process.env.OPENAI_MODEL || 'gpt-4o',
};

export function getDefaultConfig() {
  return { baseURL: defaultConfig.baseURL.replace(/\/v1$/, ''), model: defaultConfig.model };
}

function createClient(config?: Partial<LLMConfig>) {
  const baseURL = config?.baseURL ? normalizeBaseURL(config.baseURL) : defaultConfig.baseURL;
  return { client: new OpenAI({ apiKey: config?.apiKey || defaultConfig.apiKey, baseURL }), model: config?.model || defaultConfig.model };
}

type MessageContent = string | ChatCompletionContentPart[];
const buildUserContent = (userPrompt: string, pdfDataUrl?: string): MessageContent =>
  pdfDataUrl ? [{ type: 'text', text: userPrompt }, { type: 'image_url', image_url: { url: pdfDataUrl } }] : userPrompt;

export async function generateWithLLM(systemPrompt: string, userPrompt: string, pdfDataUrl?: string, config?: Partial<LLMConfig>): Promise<string> {
  const { client, model } = createClient(config);
  const response = await client.chat.completions.create({
    model,
    messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: buildUserContent(userPrompt, pdfDataUrl) }],
  });
  return response.choices[0]?.message?.content || '';
}

export async function* generateWithLLMStream(systemPrompt: string, userPrompt: string, pdfDataUrl?: string, config?: Partial<LLMConfig>): AsyncGenerator<string> {
  const { client, model } = createClient(config);
  const stream = await client.chat.completions.create({
    model,
    messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: buildUserContent(userPrompt, pdfDataUrl) }],
    stream: true,
  });
  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) yield content;
  }
}
