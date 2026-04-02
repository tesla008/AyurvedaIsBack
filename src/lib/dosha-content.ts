export type Dosha = 'Vata' | 'Pitta' | 'Kapha';

type DincharyaItem = {
    title: string;
    description: string;
};

type RemedyItem = {
    issue: string;
    remedy: string;
};

export const dincharya: Record<Dosha, DincharyaItem[]> = {
    Vata: [
        { title: 'Wake Up Early', description: 'Aim to wake up by 6 AM to align with natural rhythms.' },
        { title: 'Warm, Nourishing Meals', description: 'Favor cooked, warm foods like soups and stews. Avoid raw or cold foods.' },
        { title: 'Consistent Routine', description: 'Maintain regular times for eating, sleeping, and working to ground your energy.' },
        { title: 'Self-Massage (Abhyanga)', description: 'Use warm sesame oil for a daily self-massage to calm the nervous system.' },
        { title: 'Gentle Exercise', description: 'Practice grounding yoga, tai chi, or walking instead of intense workouts.' },
    ],
    Pitta: [
        { title: 'Wake Up Before Sunrise', description: 'Start your day in the cool, calm hours of the morning.' },
        { title: 'Cooling Foods', description: 'Incorporate sweet, bitter, and astringent foods like salads, cucumbers, and melons.' },
        { title: 'Avoid Midday Sun', description: 'Schedule intense activities for cooler parts of the day.' },
        { title: 'Practice Moderation', description: 'Balance your work and leisure time to avoid burnout and intensity.' },
        { title: 'Cooling Pranayama', description: 'Practice Sheetali (cooling breath) to release excess heat and frustration.' },
    ],
    Kapha: [
        { title: 'Wake Up Before 6 AM', description: 'Rise early to counter the heavy, sluggish nature of Kapha.' },
        { title: 'Vigorous Exercise', description: 'Engage in dynamic activities like running, dancing, or cycling to stimulate metabolism.' },
        { title: 'Light, Dry Foods', description: 'Favor warm, light, and spicy foods. Reduce heavy, oily, and cold items.' },
        { title: 'Stimulate Your Senses', description: 'Use uplifting aromatherapy, bright colors, and dynamic music.' },
        { title: 'Avoid Daytime Naps', description: 'Keep your energy flowing and avoid sleeping during the day.' },
    ],
};

export const remedies: Record<Dosha, RemedyItem[]> = {
    Vata: [
        { issue: 'Anxiety & Worry', remedy: 'Sip on calming chamomile or ashwagandha tea. Practice grounding meditation.' },
        { issue: 'Dry Skin & Hair', remedy: 'Perform a daily self-massage (Abhyanga) with warm sesame oil before bathing.' },
        { issue: 'Bloating & Gas', remedy: 'Chew on fennel seeds after meals and drink warm ginger tea to aid digestion.' },
    ],
    Pitta: [
        { issue: 'Acidity & Heartburn', remedy: 'Drink cool (not iced) water, coconut water, or aloe vera juice. Avoid spicy and fried foods.' },
        { issue: 'Irritability & Anger', remedy: 'Practice Sheetali (cooling breath) and spend time in nature, especially near water.' },
        { issue: 'Skin Rashes & Inflammation', remedy: 'Apply pure aloe vera gel or rose water to the affected area. Drink neem tea.' },
    ],
    Kapha: [
        { issue: 'Congestion & Sinus Issues', remedy: 'Use a neti pot with saline water. Inhale steam with a few drops of eucalyptus oil.' },
        { issue: 'Lethargy & Lack of Motivation', remedy: 'Perform dry brushing (Garshana) before your morning shower to boost circulation.' },
        { issue: 'Slow Digestion & Weight Gain', remedy: 'Sip on warm lemon water with a pinch of ginger in the morning to kindle your digestive fire.' },
    ],
};
