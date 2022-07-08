import { useState, useEffect } from "react";
import { supabase } from "../supabase";

export default function Auth() {
    const [user, setUser] = useState(null);

    async function addUserToDB(user) {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id);
        if (error) alert(error.message);
        if (!data || data.length === 0) {
             await supabase
                .from("users")
                .insert({ editor: false, id: user.id, email: user.email, username: user.user_metadata.user_name, name: user.user_metadata.name, avatar: user.user_metadata.avatar_url });
        }
    }

    useEffect(() => {
        const user = supabase.auth.user();
        if (user) setUser(user);
        addUserToDB(user);
    }, []);

    async function signInWithGithub() {
        const { user, session, error } = await supabase.auth.signIn({
            provider: "github",
        });
        setUser(user);
    }

    if (user) {
        return (
            <div>
                <p>{user.user_metadata.user_name}</p>
                <button
                    onClick={async () => {
                        setUser(null);
                        await supabase.auth.signOut();
                    }}
                >
                    logout
                </button>
            </div>
        );
    }
    return (
        <div>
            <button onClick={signInWithGithub}>login</button>
        </div>
    );
}
