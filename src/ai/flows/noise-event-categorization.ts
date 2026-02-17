'use server';
/**
 * @fileOverview A Genkit flow for categorizing loud noise events from audio data.
 *
 * - categorizeNoiseEvent - A function that categorizes a loud noise event.
 * - NoiseEventCategorizationInput - The input type for the categorizeNoiseEvent function.
 * - NoiseEventCategorizationOutput - The return type for the categorizeNoiseEvent function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const NoiseEventCategorizationInputSchema = z.object({
  audioDataUri: z
    .string()
    .describe(
      "An audio recording of a loud noise event, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
  timestamp: z
    .string()
    .optional()
    .describe('The timestamp when the noise event occurred, if available.'),
});
export type NoiseEventCategorizationInput = z.infer<
  typeof NoiseEventCategorizationInputSchema
>;

const NoiseEventCategorizationOutputSchema = z.object({
  category: z
    .string()
    .describe(
      'A concise category for the loud noise event (e.g., "loud music", "construction noise", "siren", "crowd cheering").'
    ),
  description: z
    .string()
    .describe('A detailed description of the identified noise event.'),
});
export type NoiseEventCategorizationOutput = z.infer<
  typeof NoiseEventCategorizationOutputSchema
>;

export async function categorizeNoiseEvent(
  input: NoiseEventCategorizationInput
): Promise<NoiseEventCategorizationOutput> {
  return noiseEventCategorizationFlow(input);
}

const noiseCategorizationPrompt = ai.definePrompt({
  name: 'noiseCategorizationPrompt',
  input: { schema: NoiseEventCategorizationInputSchema },
  output: { schema: NoiseEventCategorizationOutputSchema },
  prompt: `You are an AI assistant specialized in analyzing audio recordings to categorize and describe loud noise events.

Analyze the provided audio recording and identify the type of loud noise event. Provide a concise category and a more detailed description.

Audio Recording: {{media url=audioDataUri}}

If a timestamp is provided, take it into consideration for context:
Timestamp: {{{timestamp}}}`,
});

const noiseEventCategorizationFlow = ai.defineFlow(
  {
    name: 'noiseEventCategorizationFlow',
    inputSchema: NoiseEventCategorizationInputSchema,
    outputSchema: NoiseEventCategorizationOutputSchema,
  },
  async (input) => {
    const { output } = await noiseCategorizationPrompt(input);
    return output!;
  }
);
