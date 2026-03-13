import Link from 'next/link';
import Image from 'next/image';

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-2.5 text-foreground ${className}`}>
      <Image
        src="https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/LogoN.png"
        alt="Ayurveda At Tips Logo"
        width={42}
        height={42}
        className="h-8 w-8 object-contain md:h-[42px] md:w-[42px]"
      />
      <span className="font-headline text-xl font-bold md:text-2xl">
        Ayurveda At Tips
      </span>
    </Link>
  );
}
