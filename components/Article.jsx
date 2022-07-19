import Link from "next/link";
import ReactMarkdown from "react-markdown";

export default function Article({ article, preview = false }) {
    let body = article.body;
    let button = false;
    const maxLength = 500;

    if (preview && article.body.length > maxLength) {
        body = article.body.substring(0, maxLength) + "...";
        button = true;
    }

    return (
        <div className={"article" + (preview ? " preview" : " full")}>
            {button ? (
                <Link href={`/articles/${article.url}`}>
                    <a>
                        <div className="open-article">
                            <p>Read More</p>
                        </div>
                    </a>
                </Link>
            ) : null}
            <p className="date">{new Date(article.created_at).toDateString() }</p>
            <Link href={"/users/" + article.users.username}>
                <a className="author">@{article.users.username}</a>
            </Link>
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
    );
}
