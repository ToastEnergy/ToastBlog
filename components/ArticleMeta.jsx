import Head from "next/head";

export default function Meta({ article }) {
    let description, keywords;
    if (article.body.length > 150) {
        description = article.body.substring(0, 150) + "...";
    } else {
        description = article.body;
    }

    if (!article.keywords) keywords="";
    else keywords = article.keywords + ", "

    return (
        <Head>
            <title>{article.title}</title>
            <meta name="robots" content="index, follow" />
            <meta name="description" content={description} />
            <meta name="author" content={"@" + article.users.username} />
            <meta name="keywords" content={keywords + "toast, energy, blog, programming, programming world, toast energy, toastenergy, toast energy blog, tech blog, toast energy tech blog, programming blog, coding"} />
            <meta property="og:locale" content="en_US" />
            <meta property="og:type" content="article" />
            <meta property="og:title" content={article.title} />
            <meta property="og:description" content={description} />
            <meta
                property="article:author"
                content={"@" + article.users.username}
            />
            <meta
                property="article:publisher"
                content="https://twitter.com/toast_energy"
            />
            <meta
                property="og:url"
                content={
                    "https://blog.toast.energy.xyz/articles/" + article.url
                }
            />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={article.title} />
            <meta name="twitter:description" content={description} />
            <script type="application/ld+json">
                {'{"@context": "https://schema.org", "@type": "Article", "headline": "' +
                    article.title +
                    '", "datePublished": "' +
                    article.created_at +
                    '", "dateCreated": "' +
                    article.created_at +
                    '"}'}
            </script>
        </Head>
    );
}
