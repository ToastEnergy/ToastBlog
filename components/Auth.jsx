import { useEffect } from "react";
import { supabase } from "../supabase";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../slice";
import Image from "next/image";
import Link from "next/link";

export default function Auth() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.slice.user);

    async function getUser(user) {
        const { data, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", user.id);
        if (error) console.error(error);

        if (!data || data.length === 0) {
            const { data, error } = await supabase.from("users").insert({
                editor: false,
                id: user.id,
                username: user.user_metadata.user_name,
                name: user.user_metadata.name,
                avatar: user.user_metadata.avatar_url,
            });
            if (error) console.error(error);
            return data[0];
        }
        return data[0];
    }

    useEffect(() => {
        async function loadUser() {
            const userData = supabase.auth.user();
            if (!user && userData) {
                const u = await getUser(userData);
                dispatch(setUser(u));
            }
        }
        if (location.pathname != "/logout") {
            loadUser();
        }
    }, []);

    async function signInWithGithub() {
        localStorage.setItem("redirect", location.pathname);

        const { user, session, error } = await supabase.auth.signIn(
            {
                provider: "github",
            },
            { redirectTo: location.protocol + "//" + location.host + "/logged" }
        );
        setUser(user);
    }

    if (user) {
        return (
            <div className="auth">
                <Link href="/account">
                    <a>
                        <Image
                            alt="Avatar"
                            src={user.avatar}
                            width={40}
                            height={40}
                        />
                    </a>
                </Link>
            </div>
        );
    }
    return (
        <div>
            <button onClick={signInWithGithub}>login</button>
        </div>
    );
}
