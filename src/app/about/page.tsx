
import Image from 'next/image';

export default function AboutUsPage() {
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
            About Ayurveda at Tips
          </h1>
          <p className="mt-6 text-lg text-foreground/80">
            Ayurveda at Tips is a digital wellness platform designed to make Ayurveda practical for modern living.
          </p>
          <p className="mt-4 text-lg text-foreground/80">
            The platform helps users discover their Ayurvedic dosha and receive personalized lifestyle guidance based on their body constitution. From daily rituals and wellness practices to expert consultations, Ayurveda at Tips aims to simplify holistic health.
          </p>
          <p className="mt-4 text-lg text-foreground/80">
            Our goal is to create a global movement where Ayurveda becomes a natural part of everyday life.
          </p>
        </div>
      </div>
    </div>
  );
}
