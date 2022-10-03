import React from 'react';
import {useSession} from "next-auth/react";

const PostBox = () => {
    const {data: session} = useSession();

    return (
        <form>
            <div className="flex items-center space-x-3">
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