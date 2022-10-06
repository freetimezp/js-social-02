import React, {useEffect, useState} from 'react';

import {ArrowDownIcon, ArrowUpIcon, BookmarkIcon, ChatBubbleOvalLeftIcon, GiftIcon, ShareIcon, EllipsisHorizontalIcon} from "@heroicons/react/24/outline";
import Avatar from "./Avatar";
import Link from "next/link";

import TimeAgo from 'react-timeago';
import {Jelly} from "@uiball/loaders";
import {useSession} from "next-auth/react";
import {toast} from "react-hot-toast";
import {useMutation, useQuery} from "@apollo/client";
import {GET_ALL_VOTES_BY_POST_ID} from "../graphql/queries";
import {ADD_VOTE} from "../graphql/mutations";

type Props = {
    post: Post
}

const Post = ({post}: Props) => {
    const [vote, setVote] = useState<boolean>();
    const {data: session} = useSession();

    const {data, loading} = useQuery(GET_ALL_VOTES_BY_POST_ID, {
        variables: {
            post_id: post?.id
        }
    });

    const [addVote] = useMutation(ADD_VOTE, {
        refetchQueries: [GET_ALL_VOTES_BY_POST_ID, 'getVotesByPostId']

    });

    const upVote = async (isUpvote: boolean) => {
        if(!session) {
            toast("You'll need to SignUp to Voke!");
            return;
        }
        if(vote && isUpvote) {
            return;
        }
        if(vote === false && !isUpvote) {
            return;
        }

        await addVote({
            variables: {
                post_id: post.id,
                username: session?.user?.name,
                upvote: isUpvote,
            }
        });
    }

    useEffect(() => {
        const votes: Vote[] = data?.getVotesByPostId;

        const vote = votes?.find((vote) => vote.username == session?.user?.name)?.upvote;
        setVote(vote);
    },[data]);

    const displayVotes = (data: any) => {
        const votes: Vote[] = data?.getVotesByPostId;
        const displayNumber = votes?.reduce(
            (total, vote) => vote.upvote ? (total += 1) : (total -= 1), 0);
        if(votes?.length === 0) {
            return 0;
        }

        if(displayNumber === 0) {
            return votes[0]?.upvote ? 1 : -1;
        }

        return displayNumber;
    }


    if(!post) {
        return (
            <div className="flex items-center w-fuul justify-center p-10 text-xl">
                <Jelly size={50} color="#FF4501" />
            </div>
        )
    }

    return (
        <Link href={`/post/${post.id}`}>
            <div className="rounded-md flex cursor-pointer border border-gray-300 bg-white shadow-md hover:shadow-blue-200 hover:border
                hover:shadow-lg m-2 mb-4 hover:border-blue-500 max-w-full"
            >
                <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-100 p-1 text-gray-400
                    md:p-4"
                >
                    <ArrowUpIcon
                        onClick={() => upVote(true)}
                        className={`voteButtons hover:text-green-500 ${vote && 'text-green-500'}`}
                    />

                    <p className="text-xs font-bold text-black">{displayVotes(data)}</p>

                    <ArrowDownIcon
                        onClick={() => upVote(false)}
                        className={`voteButtons hover:text-red-500 ${vote === false && 'text-red-500'}`}
                    />
                </div>

                <div className="p-1 md:p-3">
                    <div className="flex items-center space-x-2">
                        <Avatar seed={post.subreddit[0]?.topic} />

                        <p className="text-xs text-gray-400">
                            <Link href={`/subreddit/${post.subreddit[0]?.topic}`}>
                                <span className="font-bold text-black hover:underline hover:text-blue-400">
                                    r/{post.subreddit[0]?.topic}
                                </span>
                            </Link> {' '}
                            &#169; Posted By u/{post.username} <TimeAgo date={post.created_at} />
                        </p>
                    </div>

                    <div className="py-4">
                        <h2 className="text-xl font-semibold">{post.title}</h2>
                        <p className="mt-2 text-sm font-light">{post.body}</p>
                    </div>

                    <div className="p-1 w-full">
                        {post.image.length > 0 && (
                            <img className="w-full" src={post.image} alt="" />
                        )}
                    </div>

                    <div className="flex space-x-4 text-gray-400">
                        <div className="postButtons">
                            <ChatBubbleOvalLeftIcon className="h-4 w-4 md:w-6 md:h-6" />
                            <p className="">{post.comments.length} Comments</p>
                        </div>
                        <div className="postButtons">
                            <GiftIcon className="h-4 w-4 md:w-6 md:h-6" />
                            <p className="hidden sm:inline"> Award</p>
                        </div>
                        <div className="postButtons">
                            <ShareIcon className="h-4 w-4 md:w-6 md:h-6" />
                            <p className="hidden sm:inline"> Share</p>
                        </div>
                        <div className="postButtons">
                            <BookmarkIcon className="h-4 w-4 md:w-6 md:h-6" />
                            <p className="hidden sm:inline"> Save</p>
                        </div>
                        <div className="postButtons">
                            <EllipsisHorizontalIcon className="h-4 w-4 md:w-6 md:h-6" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default Post;
