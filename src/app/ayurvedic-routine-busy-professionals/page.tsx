
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Ayurvedic Routine for Busy Professionals India | Ayurveda At Tips',
  description: 'Follow a simple Ayurvedic daily routine for busy professionals. Improve energy, digestion and focus with easy lifestyle habits.',
  keywords: ['Ayurvedic daily routine', 'dinacharya for professionals', 'ayurveda for busy people', 'ayurveda work life balance', 'morning routine india', 'reduce stress naturally ayurveda'],
  alternates: {
    canonical: '/ayurvedic-routine-busy-professionals',
  },
};

const faqs = [
    {
        question: "What is Dinacharya?",
        answer: "Dinacharya is the Ayurvedic practice of a daily routine that helps maintain balance in the body and mind by aligning with the natural rhythms of the day."
    },
    {
        question: "Can I follow Ayurveda with a busy job?",
        answer: "Absolutely. The key is consistency, not intensity. Even small habits like tongue scraping, drinking warm water, and taking short breaks can make a big difference."
    },
    {
        question: "What is the best morning routine for professionals in India?",
        answer: "A simple and effective morning routine includes waking up early, drinking a glass of warm water, scraping your tongue, and doing a few minutes of light stretching or yoga."
    },
    {
        question: "What should I eat at night according to Ayurveda?",
        answer: "Ayurveda recommends having a light, warm, and easily digestible dinner at least 2-3 hours before bedtime to ensure proper digestion and restful sleep."
    },
    {
        question: "How can I reduce stress naturally?",
        answer: "Simple techniques like deep breathing (pranayama), short meditation breaks, and disconnecting from screens in the evening can significantly reduce stress levels."
    }
];

export default function AyurvedicRoutinePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Ayurvedic Daily Routine for Busy Professionals",
    "author": {
        "@type": "Organization",
        "name": "Ayurveda At Tips"
    },
    "publisher": {
        "@type": "Organization",
        "name": "Ayurveda At Tips",
        "logo": {
            "@type": "ImageObject",
            "url": "https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/LogoN.png"
        }
    },
    "datePublished": new Date().toISOString(),
    "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": "https://ayurvedaattips.com/ayurvedic-routine-busy-professionals"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
        }
    }))
  };

  return (
     <>
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <div className="bg-background w-full py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <article className="prose prose-lg mx-auto max-w-3xl dark:prose-invert prose-h1:font-headline prose-h2:font-headline prose-h1:text-4xl prose-h1:sm:text-5xl prose-h2:text-2xl prose-h2:sm:text-3xl prose-a:text-primary hover:prose-a:text-primary/80">
            <h1>Ayurvedic Daily Routine for Busy Professionals</h1>
            <p>
              Modern life in India is hectic, often involving long commutes, irregular meals, and screen-heavy work. Ayurveda offers a simple yet profound solution: <strong>Dinacharya</strong> (a daily routine).
            </p>

            <h2>Morning Routine (Before 8 AM)</h2>
            <p>How you start your day sets the tone for everything that follows. These small habits improve digestion and boost energy.</p>
            <ul>
                <li><strong>Wake Up Early:</strong> Aim to wake up before sunrise when the atmosphere is calm and pure.</li>
                <li><strong>Warm Water:</strong> Start with a glass of warm water to cleanse the system.</li>
                <li><strong>Tongue Scraping:</strong> Use a tongue scraper to remove toxins (ama) that accumulate overnight.</li>
                <li><strong>Light Stretching:</strong> A few minutes of gentle yoga or stretching can awaken the body.</li>
            </ul>

            <h2>Workday Balance (9 AM - 5 PM)</h2>
            <p>Maintaining balance during a busy workday is crucial for preventing burnout and digestive issues.</p>
            <ul>
                <li><strong>Mindful Meals:</strong> Avoid skipping meals. Eat a balanced lunch away from your desk if possible.</li>
                <li><strong>Short Breaks:</strong> Take 5-minute breaks every hour to stretch, walk, or rest your eyes.</li>
                <li><strong>Stay Hydrated:</strong> Sip on warm water or herbal tea throughout the day instead of cold drinks.</li>
                <li><strong>Breathing:</strong> Even 5 minutes of deep, conscious breathing can significantly reduce stress and improve focus.</li>
            </ul>

            <h2>Evening Routine (After 6 PM)</h2>
            <p>Your evening routine should focus on winding down to prepare for a restful night's sleep.</p>
            <ul>
                <li><strong>Light Dinner:</strong> Have a light and warm dinner at least 2-3 hours before bed.</li>
                <li><strong>Reduce Screen Time:</strong> Disconnect from laptops and phones an hour before sleeping to calm your mind.</li>
                <li><strong>Relaxation:</strong> Read a book, listen to calming music, or practice a short meditation to relax.</li>
            </ul>

            <h2>Why Routine Matters</h2>
            <p>
              An irregular lifestyle is one of the biggest causes of dosha imbalance. Ayurveda emphasizes <strong>consistency over intensity</strong>. You don't need a perfect routine from day one. Start small, and build habits that last.
            </p>

            <div className="not-prose text-center my-8">
              <Button asChild size="lg">
                <Link href="/quiz">👉 Discover your body type with our free dosha test</Link>
              </Button>
              <p className="mt-2 text-sm text-muted-foreground">Get personalized recommendations based on your unique constitution.</p>
            </div>
            
            <div className="mt-16 not-prose">
              <h2 className="font-headline text-3xl font-bold tracking-tight text-center mb-8">Frequently Asked Questions</h2>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                    <AccordionItem value={`item-${index}`} key={index}>
                        <AccordionTrigger className="text-lg text-left">{faq.question}</AccordionTrigger>
                        <AccordionContent className="text-base text-foreground/80">
                          {faq.answer}
                        </AccordionContent>
                    </AccordionItem>
                ))}
              </Accordion>
            </div>
          </article>
        </div>
      </div>
    </>
  );
}
