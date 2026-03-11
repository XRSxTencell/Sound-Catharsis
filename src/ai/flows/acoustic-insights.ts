'use server';
/**
 * @fileOverview A Genkit flow for generating Sound Catharsis insights based on dB levels.
 *
 * - generateAcousticInsight - A function that generates a therapeutic insight.
 * - AcousticInsightInput - The input type for the function.
 * - AcousticInsightOutput - The return type for the function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AcousticInsightInputSchema = z.object({
  dbLevel: z.number().describe('The peak decibel level recorded in the session.'),
});
export type AcousticInsightInput = z.infer<typeof AcousticInsightInputSchema>;

const AcousticInsightOutputSchema = z.object({
  title: z.string().describe('A catchy, edgy title for the insight.'),
  fact: z.string().describe('A scientific or therapeutic fact about sound catharsis related to this intensity.'),
  recommendation: z.string().describe('A short tip for the user based on their intensity.'),
});
export type AcousticInsightOutput = z.infer<typeof AcousticInsightOutputSchema>;

export async function generateAcousticInsight(
  input: AcousticInsightInput
): Promise<AcousticInsightOutput> {
  return generateAcousticInsightFlow(input);
}

const insightPrompt = ai.definePrompt({
  name: 'acousticInsightPrompt',
  input: { schema: AcousticInsightInputSchema },
  output: { schema: AcousticInsightOutputSchema },
  prompt: `You are the Sound Catharsis Analyst. The user just hit a peak of {{{dbLevel}}} decibels.

Generate a unique, scientifically-grounded yet "edgy" therapeutic insight about this level of sound. 

Consider these ranges:
- 0-40dB: The power of silence and micro-vocalizations.
- 40-70dB: Harmonious expression and conversational release.
- 70-100dB: Significant emotional discharge, endorphin triggers.
- 100-130dB: Primal scream therapy, extreme catharsis, cortisol flushing.

Make it supportive and informative.`,
});

const generateAcousticInsightFlow = ai.defineFlow(
  {
    name: 'generateAcousticInsightFlow',
    inputSchema: AcousticInsightInputSchema,
    outputSchema: AcousticInsightOutputSchema,
  },
  async (input) => {
    const { output } = await insightPrompt(input);
    return output!;
  }
);
