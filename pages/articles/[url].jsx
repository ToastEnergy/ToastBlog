import { supabase, getArticles } from "../../supabase";
import Article from "../../components/Article";
import Meta from "../../components/Meta";

export default function ArticlePage({ article }) {
    return (
        <>
            <Meta article={article} />
            <div className="articles">
                <Article article={article} />
            </div>
        </>
    );
}

export async function getStaticProps({ params }) {
    const articles = await getArticles(params.url);

    return {
        props: {
            article: articles[0],
        },
    };
}

export async function getStaticPaths() {
    const { data, error } = await supabase.from("articles").select("url");

    const paths = data.map((article) => ({
        params: { url: article.url },
    }));

    return { paths, fallback: false };
}
