import Article from "../components/Article";
import Loading from "../components/Loading";
import { supabase, getArticles } from "../supabase";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function Home() {
    const [loaded, setLoaded] = useState(false);
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        const ga = async () => {
            const articles = await getArticles();
            setArticles(articles);
        };
        ga();
        setLoaded(true);
    }, [loaded]);

    return (
        <div className="articles">
            <Head>
                <meta
                    name="google-site-verification"
                    content="dqCd8gJq3lC4TSQN6c9LX8t7EUwwBIwVZl9hBDF5nsg"
                />
            </Head>
            {articles ? (
                <>
                    {articles.map((article) => {
                        return <Article key={article.id} article={article} />;
                    })}
                </>
            ) : (
                <Loading />
            )}
        </div>
    );
}
