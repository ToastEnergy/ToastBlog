import Head from "next/head";

export default function Meta({ article }) {
    let description;
    if (article.body.length > 150) {
        description = article.body.substring(0, 150) + "...";
    } else {
        description = article.body;
    }

    return (
        <Head>
            <title>{article.title}</title>
            <meta name="robots" content="index, follow"></meta>
            <meta name="description" content={description} />
            <meta name="author" content={"@" + article.users.username} />
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
            <meta property="og:site_name" content="Toast Energy Blog" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={article.title} />
            <meta name="twitter:description" content={description} />
            <meta name="theme-color" content="#121212" />
            <script type="application/ld+json">
                &#123; &quot;@context&quot;: &quot;https://schema.org&quot;, &quot;@type&quot;: &quot;Article&quot;,
                &quot;headline&quot;: &quot;{article.title}&quot;, &quot;datePublished&quot;: &quot;
                {article.created_at}&quot;: &quot;{article.created_at}&quot; &#125;
            </script>
        </Head>
    );
}
