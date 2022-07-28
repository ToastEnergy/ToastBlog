import Link from "next/link";
import ReactMarkdown from "react-markdown";
import React from "react";
import Likes from "./Likes";

export default function Article({ article, preview = false }) {
    let body = article.body;
    let button = false;
    const maxLength = 500;

    if (preview && article.body.length > maxLength) {
        body = article.body.substring(0, maxLength) + "...";
        button = true;
    }

    function formatDate(date) {
        const d = new Date(date);
        let res = d.getFullYear();
        if (d.getMonth() + 1 < 10) {
            res += "-0" + (d.getMonth() + 1);
        } else {
            res += "-" + (d.getMonth() + 1);
        }
        res += "-" + d.getDate();
        return res;
    }

    return (
        <article>
            <div className={"article" + (preview ? " preview" : " full")}>
                {button ? (
                    <Link href={`/articles/${article.url}`}>
                        <a>
                            <div className="open-article">
                                <p>Full Article</p>
                            </div>
                        </a>
                    </Link>
                ) : null}
                <header>
                    <div>
                        <time
                            dateTime={formatDate(article.created_at)}
                            className="date"
                        >
                            {new Date(article.created_at).toDateString()}
                        </time>
                        <p className="author">
                            <Link href={"/users/" + article.users.username}>
                                <a>@{article.users.username}</a>
                            </Link>
                        </p>
                    </div>
                    <div>
                        <Likes articleID={article.id} />
                    </div>
                </header>
                <h1 className="title">
                    <Link href={"/articles/" + article.url}>
                        <a>{article.title}</a>
                    </Link>
                </h1>
                <hr />
                <div className="body">
                    <ReactMarkdown>{body}</ReactMarkdown>
                </div>
            </div>
        </article>
    );
}
