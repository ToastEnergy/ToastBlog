import { ArticleProps, getArticles } from "../supabase";
import { useState } from "react";
import Article from "../components/Article";

export default function Search({ articles }: { articles: ArticleProps[] }) {
    const [results, setResults] = useState<ArticleProps[]>(articles);

    function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const query = e.target.value;
        const results = articles.filter((article: ArticleProps) =>
            article.title.toLowerCase().includes(query.toLowerCase())
        );
        setResults(results);
    }

    return (
        <div className="search">
            <div className="search-box">
                <input
                    type="text"
                    name="search"
                    placeholder="Search..."
                    onChange={handleSearch}
                />
            </div>
            {results.length > 0 ? <div className="articles not-latest">
                {results.map((article) => (
                    <Article article={article} preview={true} />
                ))}
            </div> : <p>No articles found :(</p>}
        </div>
    );
}

export async function getStaticProps() {
    const articles = await getArticles();

    return {
        props: {
            articles,
        },
    };
}
