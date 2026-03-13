import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: {
    default: 'Discover Your Dosha | Ayurveda at Tips',
    template: '%s | Ayurveda at Tips',
  },
  description: 'Take the free Ayurvedic dosha test and discover personalized wellness insights, Ayurvedic lifestyle practices, expert consultations, and daily wellness tips.',
  keywords: ['Ayurveda', 'dosha test', 'Vata Pitta Kapha', 'Ayurvedic lifestyle', 'Ayurvedic wellness', 'Ayurvedic diet', 'Ayurveda routine', 'Sampoorna plan'],
  authors: [{ name: 'Ayurveda at Tips' }],
  metadataBase: new URL('https://ayurvedaattips.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Discover Your Dosha | Ayurveda at Tips',
    description: 'Take a free Ayurvedic dosha test and unlock personalized wellness insights.',
    url: 'https://ayurvedaattips.com',
    siteName: 'Ayurveda at Tips',
    images: [
      {
        url: 'https://ayurvedaattips.com/preview.png',
        width: 1200,
        height: 630,
        alt: 'Ayurveda at Tips - Discover Your Dosha',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Discover Your Dosha | Ayurveda at Tips',
    description: 'Take a free Ayurvedic dosha test and unlock personalized wellness insights.',
    images: ['https://ayurvedaattips.com/preview.png'],
  },
  icons: {
    icon: '/favicon.ico',
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
    "logo": "https://exlaucgslmfiakllbtnq.supabase.co/storage/v1/object/public/AyurvedaIsBack/LogoN.png"
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
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
