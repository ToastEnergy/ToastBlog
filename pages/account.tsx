import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../slice";
import { supabase, UserType } from "../supabase";
import { useState } from "react";
import Loading from "../components/Loading";
import Link from "next/link";
import Image from "next/image";

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

    async function purgeAvatar() {
        let oldAvatar = user!.avatar.split("/").pop();
        /* @ts-ignore */
        await supabase.storage.from("avatars").remove([oldAvatar]);
    }

    async function handleForm(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        const target = e.target as HTMLFormElement;

        let edited: boolean = false;
        let errored: boolean = false;
        let avatar: string = user!.avatar;

        for (const key in defaultValues) {
            if (defaultValues[key] != target[key].value) {
                edited = true;
            }
        }

        if (target.resetAvatar.checked) {
            await purgeAvatar();
            avatar = supabase.auth.user()?.user_metadata?.avatar_url;
            edited = true;
        } else {
            if (target.avatar.files[0]) {
                console.log(target.avatar.files[0])
                if (
                    ["image/png", "image/jpeg", "image/gif", "image/webp"].includes(
                        target.avatar.files[0].type
                    )
                ) {
                    if (target.avatar.files[0].size <= 5242880) {
                    edited = true;
                    const filename = `${user!.id}`;
                    const { data, error } = await supabase.storage
                        .from("avatars")
                        .upload(filename, target.avatar.files[0], {
                            cacheControl: "3600",
                            upsert: true,
                        });

                    const { data: avatarData, error: avatarError } =
                        await supabase.storage
                            .from("avatars")
                            .getPublicUrl(filename);
                    avatar = avatarData!.publicURL;
                    } else {
                        alert("Avatar is too big (Max 5MB)");
                        errored = true;
                    }
                } else {
                    alert("Invalid file type, only PNG, JPG, JPEG, GIF, and WEBP");
                    errored = true;
                }
            }
        }

        if (edited) {
            const { data: userCheck, error: userCheckError } = await supabase
                .from("users")
                .select("*")
                .eq("username", target.username.value);
            if (userCheck!.length > 0 && userCheck![0].id != user!.id) {
                alert("Username already exists");
                setIsLoading(false);
                return;
            }

            const { data, error } = await supabase
                .from("users")
                .update({
                    name: target.name_.value,
                    username: target.username.value,
                    avatar: avatar,
                })
                .match({
                    id: user!.id,
                });
            dispatch(setUser(data![0]));
            setIsLoading(false);
            await fetch('/api/revalidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": supabase.auth.session()!.access_token
                },
                body: JSON.stringify({
                   username: user!.username,
                }),
            })
        } else {
            setIsLoading(false);
            if (!errored) alert("No changes made");
        }
    }

    return (
        <div className="account">
            {user ? (
                <div>
                    <form onSubmit={handleForm} encType="multipart/form-data">
                        <div className="options">
                            <div className="option">
                                <div className="avatar">
                                    <Image
                                        src={user.avatar}
                                        alt="Avatar"
                                        width={50}
                                        height={50}
                                    />
                                </div>
                                <label htmlFor="avatar">Avatar</label>
                                <input
                                    id="avatar"
                                    type="file"
                                    name="avatar"
                                    accept="image/*"
                                    className="avatar-input"
                                />
                            </div>
                            <div className="option">
                                <div>
                                    <label htmlFor="resetAvatar">
                                        Reset to GitHub Avatar
                                    </label>
                                    <input
                                        id="resetAvatar"
                                        name="resetAvatar"
                                        type="checkbox"
                                    />
                                </div>
                            </div>
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
