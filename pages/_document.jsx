import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
    return (
        <Html>
            <Head>
                <meta property="og:locale" content="en_US" />
                <meta property="og:site_name" content="Toast Energy Blog" />
                <meta name="theme-color" content="#121212" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
