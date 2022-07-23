import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Article from "../components/Article";

export default function Create() {
    const user = useSelector((state) => state.slice.user);
    const [article, setArticle] = useState(null);

    useEffect(() => {
        if (user) {
            setArticle({
                title: "",
                body: "",
                url: "",
                users: user,
            });
        }
    }, [user]);

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
        const { data, error } = await supabase.from("articles").insert({
            title: e.target.title.value,
            body: e.target.body.value,
            author: supabase.auth.user().id,
            url: url,
            id: Date.now(),
        });

        if (error) alert("There was an error creating the article");
        e.target.body.value = "";
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
        location.href = "/articles/" + url;
    };

    const updatePreview = (option, value) => {
        let a = article;
        a[option] = value;
        setArticle(a);
    }

    return (
        <div className="create-article">
            {user && user.editor ? (
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-inputs">
                            <input
                                type="text"
                                name="title"
                                placeholder="Title"
                                required
                            />
                            <input
                                type="text"
                                name="url"
                                placeholder="Url"
                                required
                            />
                            <textarea
                                name="body"
                                placeholder="Content, supports markdown"
                                required
                            />
                            <button type="submit">Publish</button>
                        </div>
                    </form>
                    <div style={{height: 50}}></div>
                    {article ? <Article article={article} preview={true} /> : null}
                </div>
            ) : (
                <p>nope</p>
            )}
        </div>
    );
}
