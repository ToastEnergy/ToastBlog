import { createClient } from "@supabase/supabase-js";

const supabaseUrl: string = process.env.SUPABASE_URL
    ? process.env.SUPABASE_URL
    : "";
const supabaseKey: string = process.env.SUPABASE_ANON_KEY
    ? process.env.SUPABASE_ANON_KEY
    : "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export interface UserType {
    id: string;
    name: string;
    avatar: string;
    username: string;
    editor: boolean;
}

export interface ArticleProps {
    title: string;
    body: string;
    url: string;
    id: number;
    keywords: string;
    users: UserType;
}

export async function getArticles(
    url: string | null | undefined,
    user: string | null | undefined
) {
    if (user) {
        const { data, error } = await supabase
            .from("articles")
            .select("*, users ( * )")
            .eq("author", user)
            .order("created_at", { ascending: false });
        const articles: Array<ArticleProps> = data ? data : [];
        return articles;
    } else if (url) {
        const { data, error } = await supabase
            .from("articles")
            .select("*, users ( * )")
            .eq("url", url);
        const articles: Array<ArticleProps> = data ? data : [];
        return articles;
    } else {
        const { data, error } = await supabase
            .from("articles")
            .select("*, users (*)")
            .order("created_at", { ascending: false });
        const articles: Array<ArticleProps> = data ? data : [];
        return articles;
    }
}
