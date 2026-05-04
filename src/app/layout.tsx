import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Ayurveda at Tips | Personalized Ayurveda & Digital Wellness',
  description: 'Discover personalized Ayurveda, digital wellness, and natural treatments based on your dosha. Improve your lifestyle with Ayurveda at Tips.',
  keywords: 'Ayurveda, digital wellness, personalized treatment, dosha quiz, ayurvedic lifestyle, natural healing India',
  authors: [{ name: 'Ayurveda at Tips' }],
  metadataBase: new URL('https://ayurvedaattips.com'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Ayurveda at Tips',
    description: 'Personalized Ayurveda and digital wellness platform for better health.',
    url: 'https://ayurvedaattips.com',
    siteName: 'Ayurveda at Tips',
    images: [
      {
        url: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/LogoN.png',
        width: 1200,
        height: 630,
        alt: 'Ayurveda at Tips - Personalized Wellness',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayurveda at Tips',
    description: 'Personalized Ayurveda and digital wellness platform for better health.',
    images: ['https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/LogoN.png'],
  },
  icons: {
    icon: 'https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/LogoN.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Ayurveda at Tips",
    "url": "https://ayurvedaattips.com",
    "logo": "https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/LogoN.png",
    "description": "Personalized Ayurveda and digital wellness solutions"
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ayurveda at Tips",
    "url": "https://ayurvedaattips.com",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ayurvedaattips.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Montserrat:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="font-body antialiased">
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
      </body>
    </html>
  );
}
