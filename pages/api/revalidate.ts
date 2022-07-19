import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const { data, error } = await supabase.auth.api.getUser(
            req.headers.authorization!,
        );
        
        if (!data) {
            return res.status(400).json({error: 'Bad Request'});
        }

        const { data: user, error: userError } = await supabase.from("users").select("username").eq("id", data!.id);

        if (user![0].username !== req.body.username) {
            console.log(user![0].username );
            console.log(req.body.username);
            return res.status(403).json({ error: "You are not the author" });
        }
        await res.revalidate('/users/' + req.body.username);
        return res.status(200).send({ message: "ok" });
    } else {
        return res.status(405).send(`${req.method} method not allowed`);
    }
}
