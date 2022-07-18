import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../slice";
import { supabase, UserType } from "../supabase";
import { useState } from "react";
import Loading from "../components/Loading";
import Link from "next/link";

export default function Account() {
    const user = useSelector(
        (state: { slice: { user: UserType | null } }) => state.slice.user
    );
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    let defaultValues: any = {};

    if (user) {
        defaultValues = {
            name_: user.name,
            username: user.username,
        };
    }

    async function handleForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const target = e.target as HTMLFormElement;

        let edited = false;

        for (const key in defaultValues) {
            if (defaultValues[key] != target[key].value) {
                edited = true;
            }
        }

        if (edited) {
            const { data: userCheck, error: userCheckError } = await supabase
                .from("users")
                .select("*")
                .eq("username", target.username.value);
            if (userCheck!.length > 0) {
                alert("Username already exists");
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("users")
                .update({
                    name: target.name_.value,
                    username: target.username.value,
                })
                .match({
                    id: user!.id,
                });
            dispatch(setUser(data![0]));
            setIsLoading(false);
        } else {
            setIsLoading(false);
            alert("No changes made");
        }
    }

    return (
        <div className="account">
            {user ? (
                <div>
                    <form onSubmit={handleForm}>
                        <div className="options">
                            <div className="option">
                                <label htmlFor="name">Name</label>
                                <input
                                    id="name"
                                    type="text"
                                    name="name_"
                                    defaultValue={user.name}
                                    placeholder="Name"
                                    required
                                />
                            </div>
                            <div className="option">
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    defaultValue={user.username}
                                    placeholder="Username"
                                    required
                                />
                            </div>
                            {isLoading ? (
                                <Loading />
                            ) : (
                                <button type="submit">Save</button>
                            )}
                        </div>
                    </form>
                    <div>
                        <Link href="/logout">
                            <a className="logout">Logout</a>
                        </Link>
                    </div>
                    <br />
                    <div className="public-profile">
                        <Link href={"/users/" + user.username}>
                            <a className="public-profile">Public Profile</a>
                        </Link>
                    </div>
                </div>
            ) : (
                <p>you must be logged in to access this page</p>
            )}
        </div>
    );
}
