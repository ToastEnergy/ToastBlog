import Link from "next/link";
import ReactMarkdown from "react-markdown";
import React from "react";
import Likes from "./Likes";

const MarkdownComponents = {
    p: (paragraph) => {
        const { node } = paragraph;

        if (node.children[0].tagName === "img") {
            const image = node.children[0];

            return (
                <div className="article-image">
                    <img
                        src={
                            "/api/proxy?url=" +
                            encodeURIComponent(image.properties.src)
                        }
                        alt={image.properties.alt}
                    />
                </div>
            );
        }
        return <p>{paragraph.children}</p>;
    },
};

export default function Article({ article, preview = false, latest = false }) {
    let body = article.body;
    let button = false;
    const maxLength = latest? 1110 : 500;

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
        <>
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
                            {latest ? (
                                <p className="latest-article">Latest Article</p>
                            ) : null}
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
                        <ReactMarkdown components={MarkdownComponents}>
                            {body}
                        </ReactMarkdown>
                    </div>
                </div>
            </article>
            {latest ? <hr className="divider" /> : null}
        </>
    );
}
