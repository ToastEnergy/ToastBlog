import Link from 'next/link';

export default function Article({ article }) {
    return (
        <div className="article">
            <Link href={'/users/' + article.author.username}>
                <a class="author">@{article.author.username}</a>
            </Link>
            <h1 class="title">
                <Link href={'/articles/' + article.url}>
                    <a>{article.title}</a>
                </Link>
            </h1>
            <hr />
            <p class="body">{article.body}</p>
        </div>
    );
}