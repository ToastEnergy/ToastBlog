import { supabase, getArticles, ArticleProps } from "../../supabase";
import DefaultErrorPage from "next/error";
import Article from "../../components/Article";
import ArticleMeta from "../../components/ArticleMeta";

interface Props {
    article: string;
    error: boolean;
}

export default function ArticlePage({ article, error }: Props) {
    if (error) {
        return <DefaultErrorPage statusCode={404} />;
    }

    return (
        <>
            <ArticleMeta article={article} />
            <Article article={article} />
        </>
    );
}

export async function getStaticProps({ params }: { params: { url: string } }) {
    const articles: Array<ArticleProps> = await getArticles(params.url);
    if (articles.length === 0) {
        return { notFound: true };
    }

    return {
        props: {
            article: articles[0],
            error: false,
        },
    };
}

export async function getStaticPaths() {
    let { data, error } = await supabase.from("articles").select("url");
    !data ? (data = []) : data;

    const paths = data.map((article) => ({
        params: { url: article.url },
    }));

    return { paths, fallback: "blocking" };
}