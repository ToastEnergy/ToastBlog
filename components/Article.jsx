import Link from 'next/link';

export default function Article({ article }) {
    return (
        <div className="article">
            <Link href={'/users/' + article.author.username}>
                <a className="author">@{article.author.username}</a>
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