import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="Toast Energy Blog" />
                <meta name="theme-color" content="#121212" />
                <meta name="keywords" content="toast, energy, blog, programming, programming world, toast energy, toastenergy, toast energy blog, tech blog, toast energy tech blog, programming blog, coding" />
                <link rel="icon" href="/favicon.png" type="image/png" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
