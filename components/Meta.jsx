import Head from "next/head";

export default function Meta({ title="Toast Energy Blog", rawDescription, index=true, author="Toast Energy", type="website" }) {
    let description;
    if (rawDescription > 150) {
        description = rawDescription.substring(0, 150) + "...";
    } else {
        description = rawDescription;
    }

    return (
        <Head>
            <title>{title}</title>
            {index ? (
                <meta name="robots" content="index, follow" />
            ) : (
                <meta name="robots" content="noindex" />
            )}
            <meta name="description" content={description} />
            <meta name="author" content={author} /> 
            <meta property="og:type" content={type} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
        </Head>
    );
}
