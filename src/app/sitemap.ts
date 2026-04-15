import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { getProducts } from '@/lib/api';

const BASE_URL = 'https://www.pipolart.com';

const staticRoutes = ['', '/about', '/gallery', '/news', '/contact'];

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = routing.locales;
  const products = getProducts();

  const staticEntries: MetadataRoute.Sitemap = staticRoutes.flatMap((route) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}${route}`,
      lastModified: new Date(),
      changeFrequency: route === '' ? 'weekly' : 'monthly',
      priority: route === '' ? 1.0 : route === '/gallery' ? 0.9 : 0.7,
    }))
  );

  const productEntries: MetadataRoute.Sitemap = products.flatMap((product) =>
    locales.map((locale) => ({
      url: `${BASE_URL}/${locale}/product/${product.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  );

  return [...staticEntries, ...productEntries];
}
