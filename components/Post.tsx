import React from 'react';

import {ArrowDownIcon, ArrowUpIcon, BookmarkIcon, ChartBarIcon, GiftIcon, ShareIcon} from "@heroicons/react/24/outline";
import Avatar from "./Avatar";

import TimeAgo from 'react-timeago';

type Props = {
    post: Post
}

const Post = ({post}: Props) => {
    return (
        <div className="rounded-md flex cursor-pointer border border-gray-300 bg-white shadow-md hover:border hover:border-gray-500
            hover:shadow-lg"
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

                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}

export default Post;
