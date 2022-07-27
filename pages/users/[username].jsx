import { supabase, getArticles } from "../../supabase";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "../../components/Loading";
import Meta from "../../components/Meta";
import Article from "../../components/Article";

export default function User({ user }) {
    const [loaded, setLoaded] = useState(false);
    const [articles, setArticles] = useState(null);

    const joined = new Date(user.created_at);

    const ga = async () => {
        const articles_ = await getArticles(null, user.id);
        setArticles(articles_);
    };

    useEffect(() => {
        if (user.editor) ga();
        setLoaded(true);
    }, [loaded]);

    return (
        <div className="user-page">
            <Meta
                title={user.name}
                rawDescription={user.name + " profile on the Toast Energy Blog"}
                keywords={`${user.name}, ${user.username}, @${user.username}`}
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
                    {user.editor ? (
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
                {user.editor ? (
                    <div className="option">
                        <span>articles</span>
                        {articles ? (
                            <div className="articles">
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

    return {
        props: {
            user: users[0],
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
