import { supabase, getArticles } from "../../supabase";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Loading from "../../components/Loading";

export default function User({ user }) {
    const [articles, setArticles] = useState(null);

    useEffect(() => {
        const ga = async () => {
            const { data: articles, error } = await supabase.from('articles').select('title, url').eq('author', user.id).order('created_at', {ascending: false});
            setArticles(articles);
        };
        ga();
    });

    return (
        <div>
            <div className="info">
                <Image src={user.avatar} alt="Profile Picture" width={100} height={100} />
                <h1>{user.name}</h1>
                <p>@{user.username}</p>
                {user.editor ? <span>editor</span> : null}
                <p>{user.email}</p>
            </div>
            <div className="articles">
                <h2>articles by {user.name}</h2>
                {articles ? (
                    <ul>
                    {articles.map((article, index) => {
                        return (
                            <li key={index}>
                                <Link
                                    href={"/articles/" + article.url}
                                >
                                    <a>{article.title}</a>
                                </Link>
                            </li>
                        );
                    })}
                </ul>
                ) : (
                    <Loading />
                )}
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
