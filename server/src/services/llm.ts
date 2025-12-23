import OpenAI from 'openai';

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: process.env.OPENAI_API_BASE || 'https://api.openai.com/v1',
});

const model = process.env.OPENAI_MODEL || 'gpt-4o';
const maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS || '16384', 10);
const temperature = parseFloat(process.env.OPENAI_TEMPERATURE || '0.7');

export async function generateWithLLM(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const response = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature,
    max_tokens: maxTokens,
  });

  return response.choices[0]?.message?.content || '';
}

/**
 * Streaming version of generateWithLLM.
 * Yields text chunks as they arrive from the LLM.
 */
export async function* generateWithLLMStream(
  systemPrompt: string,
  userPrompt: string
): AsyncGenerator<string> {
  const stream = await client.chat.completions.create({
    model,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ],
    temperature,
    max_tokens: maxTokens,
    stream: true,
  });

  for await (const chunk of stream) {
    const content = chunk.choices[0]?.delta?.content;
    if (content) {
      yield content;
    }
  }
}
