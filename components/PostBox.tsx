import React from 'react';
import {useSession} from "next-auth/react";
import Avatar from "./Avatar";

const PostBox = () => {
    const {data: session} = useSession();

    return (
        <form className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2">
            <div className="flex items-center space-x-3">
                <Avatar />

                <input
                    type="text" disabled={!session}
                    className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
                    placeholder={session ? 'Create a post by entering a title..' : 'Sign in to Post!'}
                />
            </div>
        </form>
    );
}

export default PostBox;