import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users, BookOpen, Video, Shield, MessageSquare, Star } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: '1:1 Wellness Coaching',
    description: 'Consult with our team of 35+ expert Ayurvedic doctors across India. Your first consultation is on us!',
  },
  {
    icon: BookOpen,
    title: 'Daily Dosha Tips',
    description: 'Receive personalized recommendations every day, tailored to your unique body constitution.',
  },
  {
    icon: Video,
    title: 'Live Webinars',
    description: 'Join live wellness sessions hosted by Ayurvedic experts on a variety of health topics.',
  },
  {
    icon: MessageSquare,
    title: 'Community (Coming Soon)',
    description: 'Connect with like-minded individuals and share your Ayurvedic journey and experiences.',
  },
];

export default function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            A New Era of Digital Ayurveda
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We combine ancient wisdom with modern technology to make Ayurvedic wellness accessible, personal, and effective.
          </p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="flex flex-col items-center text-center">
              <div className="bg-primary/10 p-4 rounded-full mb-4">
                <feature.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-headline text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
