import Article from "../components/Article";
import Loading from "../components/Loading";
import { getArticles } from "../supabase";
import Head from "next/head";

export default function Home({ articles }) {
    
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
                        return <Article key={article.id} article={article} preview={true} />;
                    })}
                </>
            ) : (
                <Loading />
            )}
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