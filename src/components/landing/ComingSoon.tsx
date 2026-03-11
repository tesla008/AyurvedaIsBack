import { ShoppingBag } from "lucide-react";

const products = [
  "Dosha Tea Blends",
  "Herbal Capsules",
  "Ayurvedic Oils",
  "Digestive Churna",
];

export default function ComingSoon() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center">
          <ShoppingBag className="h-16 w-16 text-primary mb-6" />
          <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
            Our Shop is Coming at Your Tips Very Soon
          </h2>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            We are carefully curating a selection of authentic Ayurvedic products to support your wellness journey. Stay tuned for our Shopify-powered store.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2">
            {products.map(product => (
              <span key={product} className="text-base font-medium">{product}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
