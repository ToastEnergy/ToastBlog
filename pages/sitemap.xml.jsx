const Sitemap = () => {}
import { getArticles } from '../supabase'

// inspired from https://cheatcode.co/tutorials/how-to-generate-a-dynamic-sitemap-with-next-js

export async function getServerSideProps({res}) {
    res.setHeader("Content-Type", "text/xml");
    const articles = await getArticles()
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset
          xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
          xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
          xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
                http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
    <url>
    <loc>https://blog.toastenergy.xyz/</loc>
    <priority>1.0</priority>
    </url>
    ${articles.map((article)=>{return `<url>
        <loc>https://blog.toastenergy.xyz/articles/${article.url}</loc>
        <lastmod>${article.created_at}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.8</priority>
    </url>
    `}).join('')}
    </urlset>
    `            
    res.write(sitemap);
    res.end();

    return {
        props: {}
    }
}

export default Sitemap