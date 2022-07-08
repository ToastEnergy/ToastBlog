import { supabase } from "../../supabase";
import Image from "next/image";
import Link from "next/link";

export default function User({ user, articles }) {
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
            </div>
        </div>
    );
}

export async function getStaticProps({ params }) {
    const { data: users, error: error1 } = await supabase
        .from("users")
        .select("*")
        .eq("username", params.username);

    const { data: articles, error: error2 } = await supabase
        .from("articles")
        .select("title, url")
        .eq("author", users[0].id)
        .order("created_at", {ascending: false});

    return {
        props: {
            user: users[0],
            articles: articles,
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
