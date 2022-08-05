import { supabase, getArticles } from "../../supabase";
import { useState, useEffect } from "react";
import Image from "next/image";
import Loading from "../../components/Loading";
import Article from "../../components/Article";
import { NextSeo } from "next-seo";
import { SocialProfileJsonLd } from "next-seo";

export default function User({ user, isEditor }) {
    const [loaded, setLoaded] = useState(false);
    const [articles, setArticles] = useState(null);

    const joined = new Date(user.created_at);

    useEffect(() => {
        const ga = async () => {
            const articles_ = await getArticles(null, user.id);
            setArticles(articles_);
        };

        if (isEditor) ga();
        setLoaded(true);
    }, [loaded, user]);

    return (
        <div className="user-page">
            <NextSeo
                title={user.name}
                description={user.name + " profile on the Toast Energy Blog"}
                canonical={`https://toastenergy.com/users/${user.username}`}
                additionalMetaTags={[
                    {
                        name: "keywords",
                        content: `${user.name}, ${user.username}, @${user.username}`,
                    },
                ]}
                openGraph={{
                    url: "https://blog.toastenergy.xyz/users/" + user.username,
                    title: user.name,
                    description:
                        user.name + " profile on the Toast Energy Blog",
                    type: "profile",
                    locale: "en_US",
                    profile: {
                        firstName: user.name,
                        username: user.username,
                    },
                }}
            />
            <SocialProfileJsonLd
                type="Person"
                name={user.name}
                url={`https://toastenergy.com/users/${user.username}`}
            />
            <div className="info">
                <div className="avatar">
                    <Image
                        src={user.avatar}
                        alt="Profile Picture"
                        width={100}
                        height={100}
                    />
                </div>
                <div className="name">
                    <h1>{user.name}</h1>{" "}
                    {isEditor ? (
                        <span className="editor">editor</span>
                    ) : (
                        <span className="reader">reader</span>
                    )}
                </div>
                <div className="option">
                    <span>username</span>
                    <p>@{user.username}</p>
                </div>
                <div className="option">
                    <span>joined</span>
                    <p>
                        {joined.toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                        })}
                    </p>
                </div>
                {isEditor ? (
                    <div className="option">
                        <span>articles</span>
                        {articles ? (
                            <div className="articles not-latest">
                                {articles.map((article, index) => {
                                    return (
                                        <Article
                                            key={index}
                                            article={article}
                                            preview={true}
                                        />
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="articles">
                                <Loading />
                            </div>
                        )}
                    </div>
                ) : null}
            </div>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .eq("username", params.username);

    const { data: editors, error: error2 } = await supabase.from('editors').select('*').eq('id', users[0].id);

    return {
        props: {
            user: users[0],
            isEditor: editors.length > 0,
        },
    };
}

export async function getStaticPaths() {
    const { data, error } = await supabase.from("users").select("username");

    const paths = data.map((user) => ({
        params: { username: user.username },
    }));

    return { paths, fallback: false };
}
