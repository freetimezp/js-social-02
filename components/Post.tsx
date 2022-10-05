import React from 'react';

import {ArrowDownIcon, ArrowUpIcon, BookmarkIcon, ChatBubbleOvalLeftIcon, GiftIcon, ShareIcon, EllipsisHorizontalIcon} from "@heroicons/react/24/outline";
import Avatar from "./Avatar";

import TimeAgo from 'react-timeago';

type Props = {
    post: Post
}

const Post = ({post}: Props) => {
    return (
        <div className="rounded-md flex cursor-pointer border border-gray-300 bg-white shadow-md hover:shadow-blue-200 hover:border
            hover:shadow-lg mb-4 hover:border-blue-500"
        >
            <div className="flex flex-col items-center justify-start space-y-1 rounded-l-md bg-gray-100 p-4 text-gray-400">
                <ArrowUpIcon className="voteButtons hover:text-green-500" />
                <p className="text-xs font-bold text-black">0</p>
                <ArrowDownIcon className="voteButtons hover:text-red-500" />
            </div>

            <div className="p-3 pb-1">
                <div className="flex items-center space-x-2">
                    <Avatar seed={post.subreddit[0]?.topic} />

                    <p className="text-xs text-gray-400">
                        <span className="font-bold text-black hover:underline hover:text-blue-400">r/{post.subreddit[0]?.topic} </span>
                        &#169; Posted By u/{post.username} <TimeAgo date={post.created_at} />
                    </p>
                </div>

                <div className="py-4">
                    <h2 className="text-xl font-semibold">{post.title}</h2>
                    <p className="mt-2 text-sm font-light">{post.body}</p>
                </div>

                {post.image.length > 0 && (
                    <img className="w-full" src={post.image} alt="" />
                )}

                <div className="flex space-x-4 text-gray-400">
                    <div className="postButtons">
                        <ChatBubbleOvalLeftIcon className="h-6 w-6" />
                        <p className="">{post.comments.length} Comments</p>
                    </div>
                    <div className="postButtons">
                        <GiftIcon className="h-6 w-6" />
                        <p className="hidden sm:inline"> Award</p>
                    </div>
                    <div className="postButtons">
                        <ShareIcon className="h-6 w-6" />
                        <p className="hidden sm:inline"> Share</p>
                    </div>
                    <div className="postButtons">
                        <BookmarkIcon className="h-6 w-6" />
                        <p className="hidden sm:inline"> Save</p>
                    </div>
                    <div className="postButtons">
                        <EllipsisHorizontalIcon className="h-6 w-6" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Post;
