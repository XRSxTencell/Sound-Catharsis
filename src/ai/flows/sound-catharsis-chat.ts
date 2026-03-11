'use server';
/**
 * @fileOverview A Genkit flow for a Sound Catharsis AI assistant.
 *
 * - chatSoundCatharsis - A function that handles the chat process.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The return type for the chat function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ChatInputSchema = z.object({
  message: z.string().describe('The user message to the AI.'),
  history: z.array(z.object({
    role: z.enum(['user', 'model']),
    text: z.string()
  })).optional().describe('Chat history for context.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  text: z.string().describe('The AI response text.'),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chatSoundCatharsis(input: ChatInput): Promise<ChatOutput> {
  return soundCatharsisChatFlow(input);
}

const chatPrompt = ai.definePrompt({
  name: 'soundCatharsisChatPrompt',
  input: { schema: ChatInputSchema },
  output: { schema: ChatOutputSchema },
  prompt: `You are the Sound Catharsis Expert. Your goal is to help users understand how sound, screaming, loud music, and acoustic expression can be used for emotional release and therapy.

Be supportive, slightly edgy (fitting the "Sound Catharsis" brand), and informative. Use terms like "acoustic relief," "vocal release," and "sonic intensity."

User Message: {{{message}}}

{{#if history}}
Previous Context:
{{#each history}}
- {{role}}: {{text}}
{{/each}}
{{/if}}`,
});

const soundCatharsisChatFlow = ai.defineFlow(
  {
    name: 'soundCatharsisChatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async (input) => {
    const { output } = await chatPrompt(input);
    return output!;
  }
);
