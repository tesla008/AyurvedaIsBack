import Hero from '@/components/landing/Hero';
import Slideshow from '@/components/landing/Slideshow';
import Features from '@/components/landing/Features';
import Pricing from '@/components/landing/Pricing';
import ComingSoon from '@/components/landing/ComingSoon';
import Activities from '@/components/landing/Activities';
import DoshaInfo from '@/components/landing/DoshaInfo';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Slideshow />
      <DoshaInfo />
      <Activities />
      <Features />
      <Pricing />
      <ComingSoon />
    </div>
  );
}
