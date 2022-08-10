import { useEffect } from "react";
import { supabase } from "../supabase";
import { useSelector, useDispatch } from "react-redux";
import { setUser, setGuest, setEditor } from "../slice";
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

    async function isEditor(user) {
        const { data, error } = await supabase.from("editors").select("*");
        if (error) console.error(error);
        return data.length > 0;
    }

    useEffect(() => {
        async function loadUser() {
            const userData = supabase.auth.user();
            if (!user && userData) {
                const u = await getUser(userData);

                if (u.theme) {
                    const theme = u.theme.split("-");
                    document.documentElement.style.setProperty(
                        "--color1",
                        theme[0]
                    );
                    document.documentElement.style.setProperty(
                        "--color2",
                        theme[1]
                    );
                    document.documentElement.style.setProperty(
                        "--color3",
                        theme[2]
                    );
                }

                dispatch(setUser(u));
                const editor = await isEditor(userData);
                dispatch(setEditor(editor));
            } else if (!userData) {
                dispatch(setGuest(true));
            }
        }
        if (location.pathname != "/logout") {
            loadUser();
        }
    }, [dispatch, user]);

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
                            className="avatar"
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
