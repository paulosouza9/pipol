import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
        .map(fileName => {
            const fullPath = path.join(productsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            const matterResult = matter(fileContents);

            return {
                id: matterResult.data.id,
                name: matterResult.data.name,
                price: matterResult.data.price,
                image: matterResult.data.image,
                details: matterResult.data.details,
                description: matterResult.content, // Using the markdown body as the description
            } as Product;
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
        .map(fileName => {
            const slug = fileName.replace(/\.md$/, '');
            const fullPath = path.join(newsDirectory, fileName);
            const fileContents = fs.readFileSync(fullPath, 'utf8');

            const matterResult = matter(fileContents);

            return {
                slug,
                title: matterResult.data.title,
                date: matterResult.data.date,
                image: matterResult.data.image,
                body: matterResult.content,
            } as NewsArticle;
        });

    // Sort news by date
    return allNewsData.sort((a, b) => (new Date(a.date) < new Date(b.date) ? 1 : -1));
}

export function getNewsBySlug(slug: string): NewsArticle | undefined {
    const news = getNews();
    return news.find(n => n.slug === slug);
}
