import Link from 'next/link';

export default function Article({ article }) {
    return (
        <div className="article">
            <Link href={'/users/' + article.users.username}>
                <a className="author">@{article.users.username}</a>
            </Link>
            <h1 className="title">
                <Link href={'/articles/' + article.url}>
                    <a>{article.title}</a>
                </Link>
            </h1>
            <hr />
            <p className="body">{article.body}</p>
        </div>
    );
}