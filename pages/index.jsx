import Article from "../components/Article";
import Loading from "../components/Loading";
import Meta from "../components/Meta";
import { supabase, getArticles } from "../supabase";
import { useState, useEffect } from "react";
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
            <Meta rawDescription={'Toast Energy is a blog about the programming world'} />
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
    };
}