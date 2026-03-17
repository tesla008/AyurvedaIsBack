import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://ayurvedaattips.com';
  const routes = [
    '/',
    '/about',
    '/mission',
    '/careers',
    '/quiz',
    '/activities',
    '/contact',
    '/faq',
    '/privacy-policy',
    '/doctor-onboarding',
    '/yoga-teacher-onboarding',
    '/shop',
    '/sampoorna-checkout',
    '/vata-pitta-kapha-explained',
    '/ayurvedic-routine-busy-professionals',
  ];

  return routes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: route === '/' ? 1 : 0.8,
  }));
}
