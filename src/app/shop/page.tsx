import ComingSoon from '@/components/landing/ComingSoon';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Our shop with curated Ayurvedic products is coming soon. Stay tuned for dosha tea blends, herbal capsules, Ayurvedic oils, and more.',
  alternates: {
    canonical: '/shop',
  },
};

export default function ShopPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <ComingSoon />
    </div>
  );
}
