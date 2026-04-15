import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { translateText } from './translate';

// Schema types
export interface Product {
    id: string;
    name: string;
    price?: string;
    description: string;
    image: string;
    details: {
        material: string;
        finish: string;
        dimensions: string;
        authenticity: string;
    };
}

export interface NewsArticle {
    slug: string;
    title: string;
    date: string;
    image?: string;
    body: string;
}

const productsDirectory = path.join(process.cwd(), 'src/content/products');
const newsDirectory = path.join(process.cwd(), 'src/content/novedades');

export function getProducts(): Product[] {
    if (!fs.existsSync(productsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(productsDirectory);
    const allProductsData = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .flatMap(fileName => {
            try {
                const fullPath = path.join(productsDirectory, fileName);
                const fileContents = fs.readFileSync(fullPath, 'utf8');
                const matterResult = matter(fileContents);

                return [{
                    id: matterResult.data.id,
                    name: matterResult.data.name,
                    price: matterResult.data.price,
                    image: matterResult.data.image,
                    details: matterResult.data.details,
                    description: matterResult.content,
                } as Product];
            } catch {
                return [];
            }
        });

    return allProductsData;
}

export function getProductById(id: string): Product | undefined {
    const products = getProducts();
    return products.find(p => p.id === id);
}

export function getNews(): NewsArticle[] {
    if (!fs.existsSync(newsDirectory)) {
        return [];
    }

    const fileNames = fs.readdirSync(newsDirectory);
    const allNewsData = fileNames
        .filter(fileName => fileName.endsWith('.md'))
        .flatMap(fileName => {
            try {
                const slug = fileName.replace(/\.md$/, '');
                const fullPath = path.join(newsDirectory, fileName);
                const fileContents = fs.readFileSync(fullPath, 'utf8');

                const matterResult = matter(fileContents);

                const rawDate = matterResult.data.date;
                const date =
                    rawDate instanceof Date
                        ? rawDate.toISOString()
                        : typeof rawDate === 'string'
                        ? rawDate
                        : String(rawDate ?? '');

                return [{
                    slug,
                    title: matterResult.data.title,
                    date,
                    image: matterResult.data.image,
                    body: matterResult.content,
                } as NewsArticle];
            } catch {
                return [];
            }
        });

    // Sort news by date
    return allNewsData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
    const news = getNews();
    return news.find(n => n.slug === slug);
}

// ─── Localized (translated) variants ────────────────────────────────────────

async function translateProduct(product: Product): Promise<Product> {
    const [name, description, material, finish, authenticity] = await Promise.all([
        product.name,
        translateText(product.description),
        translateText(product.details.material),
        translateText(product.details.finish),
        translateText(product.details.authenticity),
    ]);

    return {
        ...product,
        name,
        description,
        details: {
            ...product.details,
            material,
            finish,
            authenticity,
        },
    };
}

async function translateNews(article: NewsArticle): Promise<NewsArticle> {
    const body = await translateText(article.body);
    return { ...article, body };
}

export async function getProductsLocalized(locale: string): Promise<Product[]> {
    const products = getProducts();
    if (locale === 'es') return products;
    return Promise.all(products.map(translateProduct));
}

export async function getProductByIdLocalized(
    id: string,
    locale: string
): Promise<Product | undefined> {
    const product = getProductById(id);
    if (!product) return undefined;
    if (locale === 'es') return product;
    return translateProduct(product);
}

export async function getNewsLocalized(locale: string): Promise<NewsArticle[]> {
    const news = getNews();
    if (locale === 'es') return news;
    return Promise.all(news.map(translateNews));
}
