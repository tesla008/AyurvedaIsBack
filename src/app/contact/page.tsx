
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Ayurveda at Tips',
  description: 'Get in touch with Ayurveda at Tips for general inquiries, doctor partnerships, or yoga teacher collaborations. We would love to hear from you.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  return (
    <div className="bg-background w-full py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Image
            src="https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/LogoN.png"
            alt="Ayurveda at Tips Logo"
            width={120}
            height={120}
            className="mx-auto mb-8 h-auto w-[120px] object-contain"
          />
          <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl">
            Contact Us
          </h1>
          <p className="mt-6 text-lg text-foreground/80">
            We would love to hear from you.
          </p>
          <p className="mt-4 text-lg text-foreground/80">
            Whether you are interested in Ayurveda, have questions about our platform, or would like to collaborate with us, feel free to reach out.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl gap-12 md:grid-cols-2">
            <div className="space-y-6 text-lg">
                <div>
                    <h3 className="font-headline text-xl font-semibold">General Inquiries</h3>
                    <p className="text-foreground/80">For any general questions about our platform.</p>
                    <a href="mailto:support@ayurvedaattips.com" className="text-primary hover:underline">support@ayurvedaattips.com</a>
                </div>
                <div>
                    <h3 className="font-headline text-xl font-semibold">Doctor Partnerships</h3>
                    <p className="text-foreground/80">Join our network of esteemed Ayurvedic doctors.</p>
                    <a href="mailto:doctors@ayurvedaattips.com" className="text-primary hover:underline">doctors@ayurvedaattips.com</a>
                </div>
                 <div>
                    <h3 className="font-headline text-xl font-semibold">Yoga Teacher Collaborations</h3>
                    <p className="text-foreground/80">Partner with us to share the wisdom of yoga.</p>
                    <a href="mailto:yoga@ayurvedaattips.com" className="text-primary hover:underline">yoga@ayurvedaattips.com</a>
                </div>
                 <div>
                    <h3 className="font-headline text-xl font-semibold">Location</h3>
                    <p className="text-foreground/80">India</p>
                </div>
                <p className="text-foreground/80 pt-4">We aim to respond to all inquiries as soon as possible.</p>
            </div>
            <div className="rounded-lg border bg-card p-6 shadow-sm">
                 <form className="space-y-4">
                     <div>
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" type="text" placeholder="Your Name" />
                     </div>
                     <div>
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Your Email" />
                     </div>
                     <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea id="message" placeholder="Your Message" rows={5}/>
                     </div>
                     <div className="text-center">
                        <Button type="submit" size="lg">Submit Message</Button>
                     </div>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
}
