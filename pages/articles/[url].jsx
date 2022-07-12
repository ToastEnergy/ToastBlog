import { supabase, getArticles } from "../../supabase";
import Article from "../../components/Article";
import ArticleMeta from "../../components/ArticleMeta";

export default function ArticlePage({ article, error }) {

    if (error) {
        return (
            <div className="error">
                <p>404 | Not Found</p>
            </div>
        )
    }

    return (
        <>
            <ArticleMeta article={article} />
            <div className="articles">
                <Article article={article} />
            </div>
        </>
    );
}

export async function getStaticProps({ params }) {
    const articles = await getArticles(params.url);

    if (articles.length === 0) {
        return {
            props: {
                error: true
            }
        }
    }

    return {
        props: {
            article: articles[0],
            error: false,
        },
    };
}

export async function getStaticPaths() {
    const { data, error } = await supabase.from("articles").select("url");

    const paths = data.map((article) => ({
        params: { url: article.url },
    }));

    return { paths, fallback: 'blocking' };
}
