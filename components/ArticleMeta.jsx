import { NextSeo, ArticleJsonLd } from "next-seo";

export default function ArticleMeta({ article }) {
    let description, keywords;
    if (article.body.length > 150) {
        description = article.body.substring(0, 150) + "...";
    } else {
        description = article.body;
    }

    const defaultKeywords = "toast, energy, blog, programming, programming world, toast energy, toastenergy, toast energy blog, tech blog, toast energy tech blog, programming blog, coding"
    if (!article.keywords) keywords = defaultKeywords;
    else keywords = article.keywords + ", " + defaultKeywords;

    return (
        <>
            <NextSeo
                title={article.title}
                description={description}
                nofollow={false}
                noindex={false}
                canonical={
                    "https://blog.toastenergy.xyz/articles/" + article.url
                }
                additionalMetaTags={
                    [
                        {
                            name: "keywords",
                            content: keywords
                        }
                    ]
                }
                openGraph={{
                    url: "https://blog.toastenergy.xyz/articles/" + article.url,
                    title: article.title,
                    description: description,
                    type: "article",
                    locale: "en_US",
                    images: [
                        {
                            url: "https://blog.toastenergy.xyz/icon/Toaster.png",
                            width: 1191,
                            height: 1191,
                            alt: "Toaster",
                            type: "image/png",
                        },
                    ],
                    article: {
                        publishedTime: article.created_at,
                        modifiedTime: article.updated_at,
                        authors: ['@' + article.users.username],
                        tags: keywords.split(", "),
                    },
                    site_name: "Toast Energy Blog",
                }}
                twitter={{
                    handle: "@" + article.users.username,
                    site: "@toast_energy",
                }}
            />
            <ArticleJsonLd
                url={"https://blog.toastenergy.xyz/articles/" + article.url}
                title={article.title}
                datePublished={article.created_at}
                dateModified={article.created_at}
                authorName={[
                    {
                        name: article.users.name,
                        url:
                            "https://blog.toastenergy.xyz/users/" +
                            article.users.username,
                    },
                ]}
                publisherName="Toast Energy"
                publisherLogo="https://blog.toastenergy.xyz/icon/Toaster.png"
                description={article.description}
            />
        </>
    );
}