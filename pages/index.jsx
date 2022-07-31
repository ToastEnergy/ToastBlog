import Article from "../components/Article";
import Loading from "../components/Loading";
import { getArticles } from "../supabase";

export default function Home({ articles }) {
    return (
        <div className="articles-parent">
            <div className="articles">
                {articles ? (
                    <>
                        {articles.map((article, index) => {
                            return (
                                <Article
                                    key={article.id}
                                    article={article}
                                    preview={true}
                                    latest={index === 0}
                                />
                            );
                        })}
                    </>
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    );
}

export async function getStaticProps() {
    const articles = await getArticles();
    return {
        props: {
            articles,
        },
        revalidate: 180,
    };
}
