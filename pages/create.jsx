import { supabase } from "../supabase";
import { useState } from "react";
import { useSelector } from "react-redux";
import Article from "../components/Article";
import Loading from "../components/Loading";

export default function Create() {
    const user = useSelector((state) => state.slice.user);
    const editor = useSelector((state) => state.slice.editor);
    const [articleTitle, setArticleTitle] = useState("");
    const [articleBody, setArticleBody] = useState("");
    const [articleUrl, setArticleUrl] = useState("");
    const [loadingMessage, setLoadingMessage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = encodeURIComponent(
            e.target.url.value
                .toLowerCase()
                .replace(/[^a-zA-Z ]/g, "")
                .replace(/\s\s+/g, " ")
                .trim()
                .replaceAll(" ", "-") +
                "-" +
                Date.now().toString()
        );

        setLoadingMessage("Updating article to database...");
        const { data, error } = await supabase.from("articles").insert({
            title: e.target.title.value,
            body: e.target.body.value,
            author: supabase.auth.user().id,
            url: url,
            keywords: e.target.keywords.value,
            id: Date.now(),
        });

        if (error) alert("There was an error creating the article");

        setLoadingMessage("Sending article to Telegram...");
        await fetch("/api/telegram", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: supabase.auth.session().access_token,
            },
            body: JSON.stringify({
                article: {
                    title: e.target.title.value,
                    url: url,
                },
                author: supabase.auth.user().user_metadata.user_name,
            }),
        });
        setLoadingMessage("Redirecting you to the article...");
        location.href = "/articles/" + url;
    };

    return (
        <div className="create-article">
            {user && editor ? (
                <>
                    {loadingMessage ? (
                        <div className="uploading-article">
                            <p>{loadingMessage}</p>
                            <Loading />
                        </div>
                    ) : (
                        <div>
                            <form onSubmit={handleSubmit}>
                                <div className="parent-form-inputs">
                                    <div className="form-inputs">
                                        <label htmlFor="title">
                                            <b>Title</b>
                                        </label>
                                        <input
                                            id="title"
                                            type="text"
                                            name="title"
                                            placeholder="Type here..."
                                            onChange={(e) =>
                                                setArticleTitle(e.target.value)
                                            }
                                            required
                                        />
                                        <label htmlFor="url">
                                            <b>URL</b>
                                        </label>
                                        <input
                                            id="url"
                                            type="text"
                                            name="url"
                                            placeholder="Type here..."
                                            onChange={(e) =>
                                                setArticleUrl(e.target.value)
                                            }
                                            required
                                        />
                                        <label htmlFor="keywords">
                                            <b>Tags</b>
                                        </label>
                                        <input
                                            id="keywords"
                                            type="text"
                                            name="keywords"
                                            placeholder="Type here..."
                                            required
                                        />
                                        <label htmlFor="body">
                                            <b>Body</b>
                                        </label>
                                        <textarea
                                            id="body"
                                            name="Type here..."
                                            placeholder="Type here, supports markdown..."
                                            onChange={(e) =>
                                                setArticleBody(e.target.value)
                                            }
                                            required
                                        />
                                        <button type="submit">Publish</button>
                                    </div>
                                </div>
                            </form>
                            <div style={{ height: 50 }}></div>
                            <Article
                                article={{
                                    title: articleTitle,
                                    body: articleBody,
                                    url: articleUrl,
                                    users: user,
                                    created_at: Date.now(),
                                }}
                                preview={true}
                            />
                        </div>
                    )}
                </>
            ) : (
                <>
                    <p>{editor}</p>
                    <p>nope</p>
                </>
            )}
        </div>
    );
}
