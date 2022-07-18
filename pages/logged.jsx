import Head from "next/head";
import { useState, useEffect } from "react";

export default function Logged() {
    const [loaded, setLoaded] = useState(false);
    const [redirect, setRedirect] = useState(null);

    useEffect(() => {
        const redirect = localStorage.getItem("redirect");
        if (redirect) {
            setRedirect(redirect);
        } else {
            setRedirect("/");
        }
        setLoaded(true);
    }, [loaded]);

    return (
        <div>
            {redirect ? (
                <Head>
                    <meta httpEquiv="refresh" content={"2; URL=" + redirect} />
                </Head>
            ) : null}
            <p>You are logged in, you&apos;re being redirected.</p>
        </div>
    );
}
