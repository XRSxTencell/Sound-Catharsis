'use server';
/**
 * @fileOverview A Genkit flow for generating Sound Catharsis insights based on recorded peak dB levels.
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
  title: z.string().describe('A catchy, edgy, uppercase title for the insight.'),
  fact: z.string().describe('A scientific or therapeutic fact about sound catharsis related specifically to this recorded peak.'),
  recommendation: z.string().describe('A short, actionable therapeutic tip based on this intensity level.'),
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
  prompt: `You are the Sound Catharsis Analyst. A user has reached a peak intensity of {{{dbLevel}}} decibels during their session.

Analyze this specific peak achievement and provide a "Catharsis Report". 

Guidelines:
- 0-40dB: Focus on "The Power of the Whisper" and subtle emotional release.
- 41-70dB: Discuss "Harmonious Dialogue" and conversational venting.
- 71-100dB: Highlight "Vocal Liberation" and the release of endorphins.
- 101-130dB: Address "Primal Scream" territory, intense cortisol flushing, and absolute catharsis.

Provide a unique, edgy, and scientifically supportive response. Use terms like "frequency alignment," "vocal discharge," or "sonic equilibrium."`,
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
