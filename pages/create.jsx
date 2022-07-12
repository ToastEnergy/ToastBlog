import { supabase } from "../supabase";
import { useState, useEffect } from "react";
import Auth from "../components/Auth";

export default function Create() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const canEdit = async () => {
            const _user = supabase.auth.user();
            if (_user) {
                const { data, error } = await supabase
                    .from("users")
                    .select("editor")
                    .eq("id", _user.id);
                if (data.length >= 1 && data[0].editor === true) setUser(_user);
            }
        };
        canEdit();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url =
            e.target.url.value.trim().replaceAll(" ", "-") +
            "-" +
            Date.now().toString();

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
            },
            body: JSON.stringify({
                article: data,
            }),
        });
        location.href = "/articles/" + url;
    };

    return (
        <div>
            {user ? (
                <div>
                    <form onSubmit={handleSubmit}>
                        <div className="form-inputs">
                            <input
                                type="text"
                                name="title"
                                placeholder="Article Title"
                            />
                            <input
                                type="text"
                                name="url"
                                placeholder="Article Url"
                            />
                            <textarea name="body" placeholder="Article Body" />
                            <button type="submit">submit</button>
                        </div>
                    </form>
                </div>
            ) : (
                <p>nope</p>
            )}
        </div>
    );
}
