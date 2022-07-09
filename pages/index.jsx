import Article from "../components/Article";
import Loading from "../components/Loading";
import { supabase, getArticles } from "../supabase";
import { useState, useEffect } from "react";

export default function Home() {
    const [loaded, setLoaded] = useState(false);
    const [articles, setArticles] = useState(null);

    const ga = async () => {
        const articles = await getArticles();
        setArticles(articles);
    };

    useEffect(() => {
        ga();
        setLoaded(true);
    }, [loaded]);

    return (
        <div className="articles">
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
