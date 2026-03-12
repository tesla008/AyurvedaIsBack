import Link from 'next/link';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2 text-foreground ${className}`}>
      <Image
        src="https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/logo.png"
        alt="Ayurveda at Tips Logo"
        width={36}
        height={36}
      />
      <span className="font-headline text-xl font-bold md:text-2xl">
        Ayurveda at Tips
      </span>
    </Link>
  );
}
