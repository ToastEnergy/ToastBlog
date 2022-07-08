import Link from 'next/link';

export default function Article({ article }) {
    return (
        <div>
            <h1>
                <Link href={'/articles/' + article.url}>
                    <a>{article.title}</a>
                </Link>
            </h1>
            <Link href={'/users/' + article.author.username}>
                <a>@{article.author.username}</a>
            </Link>
            <p>{article.body}</p>
        </div>
    );
}