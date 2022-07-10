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
            .select("*, users ( * )")
            .eq("url", url);
        articles = data;
    } else {
        const { data, error } = await supabase.from("articles").select("*, users (*)").order("created_at",  { ascending: false });
        articles = data;
    }
    return articles;
}
