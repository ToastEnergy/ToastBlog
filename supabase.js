import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(
    process.env.SUPABASE_URL,
    process.env.SUPABASE_ANON_KEY
);

export async function getArticles(url = null) {
    let articles;
    if (url) {
        const { data, error } = await supabase
            .from("articles")
            .select("*")
            .eq("url", url);
        articles = data;
    } else {
        const { data, error } = await supabase.from("articles").select("*").order("created_at",  { ascending: false });
        articles = data;
    }

    for (const article of articles) {
        const { data, error } = await supabase
            .from("users")
            .select("name, username, id, avatar")
            .eq("id", article.author);
        if (!data || data.length === 0) {
            article.author = {
                name: "Unknown",
                username: "unknown",
                id: null,
                avatar: "./default_avatar.png",
            };
        } else {
            article.author = data[0];
        }
    }

    return articles;
}
