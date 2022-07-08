import { supabase, getArticles } from "../supabase";
import Article from "../components/Article";

export default function Home({ articles }) {
    return (
        <div>
            <div className="articles">
                {articles.map((article) => {
                    return (
                        <Article key={article.id} article={article} />
                    );
                })}
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const articles = await getArticles();

    return {
        props: {
            articles: articles,
        },
    };
}