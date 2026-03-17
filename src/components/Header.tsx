'use client';

import Link from 'next/link';
import { Logo } from './Logo';
import { Button } from './ui/button';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled
        ? "border-b bg-[rgba(232,213,175,0.95)] shadow-[0_4px_12px_rgba(0,0,0,0.08)] backdrop-blur-[6px]"
        : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link href="/#features" className="transition-colors hover:text-primary">Features</Link>
          <Link href="/#sampoorna-plan" className="transition-colors hover:text-primary">Sampoorna Plan</Link>
          <Link href="/activities" className="transition-colors hover:text-primary">Activities</Link>
          <Link href="/shop" className="transition-colors hover:text-primary">Shop</Link>
        </nav>
        <div className="flex items-center gap-4">
          <Button onClick={() => router.push('/quiz')}>Start Your Journey</Button>
        </div>
      </div>
    </header>
  );
}
