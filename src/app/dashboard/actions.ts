'use server';

import {
  generateDailyAyurvedicTip,
  GenerateDailyAyurvedicTipInput,
  GenerateDailyAyurvedicTipOutput,
} from '@/ai/flows/generate-daily-ayurvedic-tip';

export async function getDailyTip(
  dosha: GenerateDailyAyurvedicTipInput['dosha']
): Promise<GenerateDailyAyurvedicTipOutput> {
  try {
    const result = await generateDailyAyurvedicTip({ dosha });
    if (!result || !result.tip) {
      // Provide a fallback tip
      return { tip: 'Remember to stay hydrated and listen to your body today. A moment of quiet breathing can bring great peace.' };
    }
    return result;
  } catch (error) {
    console.error('Error generating daily Ayurvedic tip:', error);
    // Provide a fallback tip in case of error
    return { tip: 'Embrace the day with a calm mind and a grateful heart. Your wellness journey is a path of self-discovery.' };
  }
}
