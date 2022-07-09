import Head from "next/head";

export default function Logged() {
    return (
        <div>
            <Head>
                <meta
                    httpEquiv="refresh"
                    content="2; URL=/"
                />
            </Head>
            <p>You are logged in, you&apos;re being redirected.</p>
        </div>
    );
}
