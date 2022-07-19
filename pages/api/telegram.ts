import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from '../../supabase'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { user, error } = await supabase.auth.api.getUser(
            req.headers.authorization!,
        )
        if(error){
            return res.status(401).json({error: error.message})
        }
        const { data } = await supabase.from("users").select("editor").eq("id", user!.id)
        if(!data || !data[0].editor){
            return res.status(403).json({error: "You are not an editor"})
        }
        await fetch(
            `https://api.telegram.org/bot${process.env.TELEGRAM_TOKEN}/sendMessage`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    chat_id: process.env.TELEGRAM_CHAT_ID,
                    text: `*[${req.body.article.title}](https://blog.toastenergy.xyz/articles/${req.body.article.url})*\n\n_by [@${req.body.author}](https://blog.toastenergy.xyz/users/${req.body.author})_`,
                    parse_mode: "MarkdownV2",
                }),
            }
        );
        await res.revalidate("/articles/" + req.body.article.url);
        await res.revalidate("/");
        return res.status(200).send(JSON.stringify({ message: "ok" }));
    } else {
        return res.status(405).send(`${req.method} method not allowed`);
    }
}
