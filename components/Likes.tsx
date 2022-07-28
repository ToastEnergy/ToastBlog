import { supabase, UserType } from "../supabase";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

export default function Likes({ articleID }: { articleID: number }) {
    const user = useSelector(
        (state: {
            slice: {
                user: UserType | null;
            };
        }) => state.slice.user
    );
    const guest = useSelector(
        (state: {
            slice: {
                guest: boolean;
            };
        }) => state.slice.guest
    );

    interface Like {
        id: number;
        user: string;
        article: number;
        created_at: string;
    }

    const [loaded, setLoaded] = useState<boolean>(false);
    const [loadingLike, setLoadingLike] = useState<boolean>(false);
    const [likes, setLikes] = useState<number>(0);
    const [liked, setLiked] = useState<boolean>(false);
    const [likesData, setLikesData] = useState<Like[] | null>(null);

    useEffect(() => {
        async function getLikes() {
            if (!likesData) {
                const { data, error } = await supabase
                    .from("likes")
                    .select("*")
                    .eq("article", articleID);
                if (data) setLikes(data.length);
                setLikesData(data);
            }

            if (!user) {
                if (guest) {
                    setLiked(false);
                    setLoaded(true);
                } else {
                    if (liked) setLiked(false);
                    else setLiked(true);
                }
            } else {
                if (likesData && likesData.filter((x) => x.user === user.id).length > 0) {
                    setLiked(true);
                } else {
                    setLiked(false);
                }
                setLoaded(true);
            }
        }
        if (!loaded) getLikes();
    }, [
        loaded,
        setLoaded,
        user,
        guest,
        liked,
        setLiked,
        articleID,
        supabase,
        likesData,
        setLikesData,
    ]);

    async function like() {
        if (user) {
            setLoadingLike(true);
            if (liked) {
                setLikes(likes - 1);
                setLiked(false);
                await supabase
                    .from("likes")
                    .delete()
                    .match({ user: user.id, article: articleID });
            } else {
                setLikes(likes + 1);
                setLiked(true);
                const { data, error } = await supabase.from("likes").insert({
                    article: articleID,
                    user: user.id,
                });
            }
            setLoadingLike(false);
        } else {
            alert("you must be logged in to like");
        }
    }

    return (
        <div className="like-section">
            {!loaded ? null : (
                <div
                    className="like"
                    onClick={() => {
                        if (loadingLike) return;
                        like();
                    }}
                >
                    <span>{likes}</span>
                    {liked ? (
                        <div className="heart liked">
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                    ) : (
                        <div className="heart not-liked">
                            <FontAwesomeIcon icon={faHeart} />
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
