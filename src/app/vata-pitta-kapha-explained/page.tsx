
import Image from 'next/image';
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
  title: 'Vata Pitta Kapha Explained | Ayurveda At Tips',
  description: 'Understand Vata, Pitta, Kapha in Ayurveda. Learn your dosha, traits, diet and lifestyle. Take a free dosha test and get personalized tips.',
  keywords: ['Vata Pitta Kapha', 'Ayurvedic dosha types', 'Vata Pitta Kapha meaning', 'Ayurveda body types India', 'Dosha characteristics', 'Ayurvedic lifestyle', 'what is vata pitta kapha in simple terms', 'how to find my dosha type India', 'vata pitta kapha diet Indian foods', 'ayurvedic body type test free', 'difference between vata pitta kapha'],
  alternates: {
    canonical: '/vata-pitta-kapha-explained',
  },
};

const faqs = [
    {
        question: "What is the most common dosha?",
        answer: "Most people have a mix of all three doshas, but one is typically dominant, which defines their primary constitution. It's also common to have a dual-dosha type where two doshas are prominent."
    },
    {
        question: "Can dosha change over time?",
        answer: "Your fundamental constitution, or Prakriti, is determined at birth and does not change. However, your current state of balance, or Vikriti, can fluctuate due to lifestyle, diet, and environment."
    },
    {
        question: "Is Ayurveda scientific?",
        answer: "Ayurveda is a traditional system of medicine from India that has been practiced for thousands of years. It is based on principles of balance and observation. While it's considered a form of complementary and alternative medicine, many of its principles around diet and lifestyle are being explored by modern science."
    },
    {
        question: "Can I have two doshas?",
        answer: "Yes, many people are dual-dosha types, such as Vata-Pitta or Pitta-Kapha. This means they share characteristics of two dominant doshas and should aim to balance both."
    },
    {
        question: "How accurate are dosha tests?",
        answer: "A well-structured dosha test can provide a strong indication of your dominant dosha and current imbalances. It serves as a great starting point for self-discovery and should be followed by observation of your own body and mind."
    }
];

export default function VataPittaKaphaPage() {
    const articleSchema = {
        "@context": "https://schema.org",
        "@type": "Article",
        "headline": "What is Vata, Pitta, Kapha? A Simple Beginner Guide",
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
            "@id": "https://ayurvedaattips.com/vata-pitta-kapha-explained"
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
            <h1>What is Vata, Pitta, Kapha? A Simple Beginner Guide</h1>
            <p>
              If you’ve ever searched about Ayurveda, you’ve probably come across terms like Vata, Pitta, and Kapha. These are not just abstract concepts—they are the foundation of how your body works according to Ayurveda.
            </p>
            <p>
              In simple terms, these three are your doshas, or your body’s natural constitution.
            </p>
            <p>
              Understanding your dosha can help you improve:
            </p>
            <ul>
                <li>digestion</li>
                <li>energy levels</li>
                <li>sleep</li>
                <li>stress management</li>
            </ul>

            <h2>What Are Doshas in Ayurveda?</h2>
            <p>
              In Ayurveda, every person is made up of three energies:
            </p>
            <ul>
              <li><strong>Vata</strong> → movement</li>
              <li><strong>Pitta</strong> → digestion & metabolism</li>
              <li><strong>Kapha</strong> → structure & stability</li>
            </ul>
            <p>
              Everyone has all three—but in different proportions. That unique combination is called your <strong>prakriti</strong> (natural body type).
            </p>

            <div className="my-12 grid grid-cols-1 md:grid-cols-3 gap-8 not-prose">
                <div className="text-center p-4 border rounded-lg shadow-sm">
                    <h3 className="font-headline text-xl font-bold">Vata Dosha</h3>
                    <p className="text-muted-foreground">The Energy of Movement</p>
                    <ul className="text-left text-sm space-y-1 mt-4 list-disc pl-5">
                        <li>Lean body</li>
                        <li>Fast thinker</li>
                        <li>Creative and energetic</li>
                        <li>Gets tired easily</li>
                        <li>Common Issues: anxiety, dry skin, irregular digestion</li>
                        <li><strong>Ideal Lifestyle:</strong> follow a routine, eat warm, cooked foods, get enough rest</li>
                    </ul>
                </div>
                <div className="text-center p-4 border rounded-lg shadow-sm">
                    <h3 className="font-headline text-xl font-bold">Pitta Dosha</h3>
                    <p className="text-muted-foreground">The Energy of Transformation</p>
                     <ul className="text-left text-sm space-y-1 mt-4 list-disc pl-5">
                        <li>Medium build</li>
                        <li>Sharp focus</li>
                        <li>Strong digestion</li>
                        <li>Leadership qualities</li>
                        <li>Common Issues: acidity, irritability, overheating</li>
                        <li><strong>Ideal Lifestyle:</strong> avoid spicy foods, stay cool, balance work and rest</li>
                    </ul>
                </div>
                <div className="text-center p-4 border rounded-lg shadow-sm">
                    <h3 className="font-headline text-xl font-bold">Kapha Dosha</h3>
                    <p className="text-muted-foreground">The Energy of Stability</p>
                    <ul className="text-left text-sm space-y-1 mt-4 list-disc pl-5">
                        <li>Strong build</li>
                        <li>Calm nature</li>
                        <li>Steady energy</li>
                        <li>Emotionally grounded</li>
                        <li>Common Issues: weight gain, laziness, slow digestion</li>
                        <li><strong>Ideal Lifestyle:</strong> stay active, eat light foods, avoid oversleeping</li>
                    </ul>
                </div>
            </div>

            <h2>Why Knowing Your Dosha Matters</h2>
            <p>
              Here’s where most people go wrong. They follow random diet plans, generic fitness advice, or trending wellness hacks.
            </p>
            <p>
              But Ayurveda says: what works for one person may harm another. Your dosha determines what you should eat, how you should exercise, and how you handle stress.
            </p>

            <h2>How to Find Your Dosha</h2>
            <p>
              The easiest way is through a structured assessment.
            </p>
            <div className="not-prose text-center my-8">
              <Button asChild size="lg">
                <Link href="/quiz">👉 Take the free dosha test on Ayurveda At Tips</Link>
              </Button>
               <p className="mt-2 text-sm text-muted-foreground">Discover your body type and get personalized wellness recommendations.</p>
            </div>

            <h2>Real-Life Example (Indian Context)</h2>
            <p>
              Let’s say you feel bloated after eating curd at night, but your friend feels perfectly fine. Why? Different doshas. Ayurveda explains these everyday differences scientifically.
            </p>

            <h2>The Modern Relevance of Ayurveda</h2>
            <p>
              In today’s lifestyle with long work hours, irregular meals, and constant screen exposure, your natural balance gets disturbed. Understanding your dosha helps you stay balanced, prevent lifestyle diseases, and improve long-term health. For a start, you can follow a <Link href="/activities">daily routine</Link> and consider a <Link href="/#sampoorna-plan">personalized plan</Link>.
            </p>

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
