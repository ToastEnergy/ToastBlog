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
        console.log(comments);
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
                .order("created_at", { ascending: false });
            !data ? (data = []) : data;
            setComments(data);
        }
        getComments();
        setLoaded(true);
    }, [loaded]);

    return (
        <div className="comments-section">
            <div className="comments-child">
                {user ? (
                    <div className="add-comment">
                        <form onSubmit={sendComment}>
                            <textarea placeholder="Comment..." name="body" required />
                            <button type="submit">Add comment</button>
                        </form>
                    </div>
                ) : null}
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
                                                />
                                            </a>
                                        </Link>
                                    </div>
                                    <div className="right">
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
                                        <Link
                                            href={
                                                "/users/" +
                                                comment.users.username
                                            }
                                        >
                                            <p className="username">
                                                <a>@{comment.users.username}</a>
                                            </p>
                                        </Link>
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
