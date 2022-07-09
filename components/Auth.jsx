import { useState, useEffect } from "react";
import { supabase } from "../supabase";
import { useRouter } from "next/router";

export default function Auth() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    async function addUserToDB(user) {
        try {
            const { data, error } = await supabase
                .from("users")
                .select("*")
                .eq("id", user.id);
            if (error) alert(error.message);
            if (!data || data.length === 0) {
                await supabase.from("users").insert({
                    editor: false,
                    id: user.id,
                    email: user.email,
                    username: user.user_metadata.user_name,
                    name: user.user_metadata.name,
                    avatar: user.user_metadata.avatar_url,
                });
            }
        } catch (error) {
            console.log(user);
            console.log(error);
        }
    }

    useEffect(() => {
        const user = supabase.auth.user();
        if (user) {
            setUser(user);
            addUserToDB(user);
        }
    }, []);

    async function signInWithGithub() {
        const { user, session, error } = await supabase.auth.signIn(
            {
                provider: "github",
            },
            { redirectTo: location.protocol + '//' + location.host + '/logged' }
        );
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
