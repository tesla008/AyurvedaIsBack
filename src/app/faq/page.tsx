
import Image from 'next/image';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
    {
        question: "What is Ayurveda at Tips?",
        answer: "Ayurveda at Tips is a digital wellness platform designed to make Ayurveda easy to understand and practice in daily life."
    },
    {
        question: "What is a Dosha?",
        answer: "In Ayurveda, doshas represent different body constitutions that influence how our body functions. The three doshas are Vata, Pitta, and Kapha."
    },
    {
        question: "How does the Dosha Test work?",
        answer: "The Dosha Test helps identify your dominant body constitution based on lifestyle, physical traits, and behavioral patterns."
    },
    {
        question: "Is the Dosha Test free?",
        answer: "Yes. The basic dosha test is free for all users."
    },
    {
        question: "What is the Sampoorna Plan?",
        answer: "The Sampoorna Plan provides access to personalized wellness guidance, expert consultations, and deeper Ayurvedic insights."
    },
    {
        question: "Do I need prior knowledge of Ayurveda?",
        answer: "No. The platform is designed for beginners as well as people already familiar with Ayurvedic practices."
    }
]

export default function FaqPage() {
  return (
    <div className="bg-background w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Image
                src="https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/LogoN.png"
                alt="Ayurveda at Tips Logo"
                width={120}
                height={120}
                className="mx-auto mb-8 h-auto w-[120px] object-contain"
            />
            <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
                Frequently Asked Questions
            </h1>
          </div>
          <Accordion type="single" collapsible className="w-full mt-12">
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
      </div>
    </div>
  );
}
