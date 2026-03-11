import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { PlaceHolderImages } from "@/lib/placeholder-images"
import Image from "next/image"

const slides = [
  { id: "dosha-detection", title: "Personalized Dosha Detection" },
  { id: "daily-tips", title: "Daily Ayurvedic Tips" },
  { id: "expert-consultations", title: "Expert Consultations with Ayurvedic Doctors" },
  { id: "wellness-webinars", title: "Live Wellness Webinars" },
  { id: "lifestyle-activities", title: "Ayurvedic Lifestyle Activities" },
  { id: "product-marketplace", title: "Ayurvedic Product Marketplace (coming soon)" },
];

export default function Slideshow() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-center font-headline text-3xl font-bold tracking-tight sm:text-4xl">
          A Personalized Wellness Ecosystem
        </h2>
        <p className="mx-auto mt-4 max-w-3xl text-center text-lg text-muted-foreground">
          Discover how Ayurveda at Tips can transform your daily life with ancient wisdom and modern technology.
        </p>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full max-w-5xl mx-auto mt-12"
        >
          <CarouselContent>
            {slides.map((slide) => {
              const image = PlaceHolderImages.find(p => p.id === slide.id);
              return (
                <CarouselItem key={slide.id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-1">
                    <Card className="overflow-hidden shadow-lg transition-shadow hover:shadow-xl">
                      <CardContent className="flex aspect-video items-center justify-center p-0 relative">
                        {image && (
                          <Image
                            src={image.imageUrl}
                            alt={image.description}
                            width={600}
                            height={400}
                            className="object-cover w-full h-full"
                            data-ai-hint={image.imageHint}
                          />
                        )}
                        <div className="absolute inset-0 bg-black/40" />
                         <h3 className="relative z-10 text-center font-headline text-2xl font-semibold text-white p-4">
                          {slide.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </div>
    </section>
  );
}
