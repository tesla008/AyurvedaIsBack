
import { Logo } from './Logo';
import { Separator } from './ui/separator';
import Link from 'next/link';
import { Github, Twitter, Linkedin } from 'lucide-react';

const socialLinks = [
  { icon: Twitter, href: '#', name: 'Twitter' },
  { icon: Linkedin, href: '#', name: 'LinkedIn' },
  { icon: Github, href: '#', name: 'GitHub' },
];

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12 md:px-6">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo />
            <p className="mt-4 text-base">
              Ayurveda at Tips is more than a business — it is a wellness movement making Ayurveda accessible to every home.
            </p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:col-span-8">
            <div className="grid gap-2">
              <h3 className="font-headline text-lg font-semibold">About</h3>
              <Link href="/mission" className="hover:text-primary">Mission</Link>
              <Link href="/about" className="hover:text-primary">About Us</Link>
              <Link href="/careers" className="hover:text-primary">Careers</Link>
            </div>
            <div className="grid gap-2">
              <h3 className="font-headline text-lg font-semibold">Community</h3>
              <Link href="#" className="hover:text-primary">Doctor Onboarding</Link>
              <Link href="#" className="hover:text-primary">Yoga Teacher Onboarding</Link>
              <Link href="#" className="hover:text-primary">Partners</Link>
            </div>
            <div className="grid gap-2">
              <h3 className="font-headline text-lg font-semibold">Support</h3>
              <Link href="#" className="hover:text-primary">Contact Us</Link>
              <Link href="#" className="hover:text-primary">FAQ</Link>
              <Link href="#" className="hover:text-primary">Privacy Policy</Link>
            </div>
            <div className="grid gap-2">
              <h3 className="font-headline text-lg font-semibold">Contact</h3>
              <p>contact@ayurvedatips.com</p>
              <div className="flex space-x-4 mt-2">
                {socialLinks.map((social) => (
                  <Link key={social.name} href={social.href} className="text-secondary-foreground hover:text-primary">
                    <social.icon className="h-6 w-6" />
                    <span className="sr-only">{social.name}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Separator className="my-8 bg-border/50" />
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} Ayurveda at Tips. All rights reserved.</p>
          <p className="text-sm text-muted-foreground">With Love From India to the Whole World.</p>
        </div>
      </div>
    </footer>
  );
}
