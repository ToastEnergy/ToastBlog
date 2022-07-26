import { useSelector } from "react-redux";
import { supabase } from "../supabase";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

interface Props {
    articleID: number;
}

export default function Comments({ articleID }: Props) {
    const [comments, setComments] = useState<Array<any>>([]);
    const [loaded, setLoaded] = useState<boolean>(false);

    const user = useSelector(
        (state: { slice: { user: any } }) => state.slice.user
    );

    async function sendComment(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const target = e.target as HTMLFormElement;
        const commentBody: string = target.body.value;
        target.body.value = "";
        let { data, error } = await supabase.from("comments").insert({
            article: articleID,
            author: user.id,
            body: commentBody,
        });

        if (data) {
            data[0].users = user;
            setComments([data[0], ...comments]);
        }
    }

    useEffect(() => {
        async function getComments() {
            let { data, error } = await supabase
                .from("comments")
                .select("*, users ( * )")
                .eq("article", articleID)
                .order("created_at", { ascending: false });
            !data ? (data = []) : data;
            setComments(data);
        }
        getComments();
        setLoaded(true);
    }, [loaded]);

    async function deleteComment(id: number) {
        await supabase.from("comments").delete().match({ id: id });
        setComments(comments.filter((comment) => comment.id != id));
    }

    return (
        <div className="comments-section">
            <div className="comments-child">
                {user ? (
                    <div className="add-comment">
                        <form onSubmit={sendComment}>
                            <textarea
                                placeholder="Comment..."
                                name="body"
                                required
                            />
                            <button type="submit">Add comment</button>
                        </form>
                    </div>
                ) : (
                    <div className="not-logged">
                        <p>Login to comment</p>
                    </div>
                )}
                <div className="comments">
                    {comments.map((comment, index) => {
                        return (
                            <div key={index}>
                                <div className="comment">
                                    <div className="left">
                                        <Link
                                            href={
                                                "/users/" +
                                                comment.users.username
                                            }
                                        >
                                            <a>
                                                <Image
                                                    src={comment.users.avatar}
                                                    width="45"
                                                    height="45"
                                                    alt="Avatar"
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="right">
                                        <div className="top-right">
                                            <div className="top-right-left">
                                                <p className="date">
                                                    {new Date(
                                                        comment.created_at
                                                    ).toLocaleString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric",
                                                        hour: "numeric",
                                                        minute: "numeric",
                                                    })}
                                                </p>

                                                <p className="username">
                                                <Link href={"/users/"+ comment.users.username }>
                                                <a>
                                                    @{comment.users.username}
                                                </a>
                                                </Link>
                                                </p>
                                            </div>
                                            {comment.users.id === user?.id ? (
                                                <div className="top-right-rigth">
                                                    <button
                                                        onClick={() => {
                                                            deleteComment(
                                                                comment.id
                                                            );
                                                        }}
                                                    >
                                                        ❌
                                                    </button>
                                                </div>
                                            ) : null}
                                        </div>
                                        <p className="body">{comment.body}</p>
                                    </div>
                                </div>
                                {index !== comments.length - 1 ? <hr /> : null}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
