'use server';
/**
 * @fileOverview A Genkit flow for generating personalized daily Ayurvedic tips based on a user's Dosha.
 *
 * - generateDailyAyurvedicTip - A function that handles the generation of a daily Ayurvedic tip.
 * - GenerateDailyAyurvedicTipInput - The input type for the generateDailyAyurvedicTip function.
 * - GenerateDailyAyurvedicTipOutput - The return type for the generateDailyAyurvedicTip function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateDailyAyurvedicTipInputSchema = z.object({
  dosha: z.enum(['Vata', 'Pitta', 'Kapha']).describe('The dominant Ayurvedic Dosha of the user.'),
});
export type GenerateDailyAyurvedicTipInput = z.infer<typeof GenerateDailyAyurvedicTipInputSchema>;

const GenerateDailyAyurvedicTipOutputSchema = z.object({
  tip: z.string().describe('A personalized daily Ayurvedic tip.'),
});
export type GenerateDailyAyurvedicTipOutput = z.infer<typeof GenerateDailyAyurvedicTipOutputSchema>;

export async function generateDailyAyurvedicTip(
  input: GenerateDailyAyurvedicTipInput
): Promise<GenerateDailyAyurvedicTipOutput> {
  return generateDailyAyurvedicTipFlow(input);
}

const prompt = ai.definePrompt({
  name: 'dailyAyurvedicTipPrompt',
  input: {schema: GenerateDailyAyurvedicTipInputSchema},
  output: {schema: GenerateDailyAyurvedicTipOutputSchema},
  prompt: `You are an expert Ayurvedic practitioner. Your task is to provide a single, concise, and actionable daily Ayurvedic tip specifically tailored for a person with the dominant Dosha of '{{{dosha}}}'.

The tip should cover areas like diet, yoga, meditation, herbs, or lifestyle habits, and be easy to integrate into a daily routine. Ensure the tip is positive, encouraging, and aligns with Ayurvedic principles for balancing the '{{{dosha}}}' Dosha.

Generate only the tip, enclosed in the 'tip' field of the JSON output.`,
});

const generateDailyAyurvedicTipFlow = ai.defineFlow(
  {
    name: 'generateDailyAyurvedicTipFlow',
    inputSchema: GenerateDailyAyurvedicTipInputSchema,
    outputSchema: GenerateDailyAyurvedicTipOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to generate Ayurvedic tip.');
    }
    return output;
  }
);
