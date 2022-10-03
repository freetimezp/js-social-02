import React, {useState} from 'react';
import {useSession} from "next-auth/react";
import Avatar from "./Avatar";
import {useForm} from 'react-hook-form';

import {LinkIcon, PhotoIcon} from '@heroicons/react/24/outline';
import {mockSession} from "next-auth/client/__tests__/helpers/mocks";
import image = mockSession.user.image;

type FormData = {
    postTitle: string;
    postBody: string;
    postImage: string;
    subreddit: string;
}

const PostBox = () => {
    const {data: session} = useSession();
    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
    const {register, setValue, handleSubmit, watch, formState: {errors}} = useForm<FormData>();

    const onSubmit = handleSubmit(async (formData) => {
        console.log(formData);
    });

    return (
        <form className="sticky top-16 z-50 bg-white border rounded-md border-gray-300 p-2" onSubmit={onSubmit}>
            <div className="flex items-center space-x-3">
                <Avatar />

                <input
                    {...register('postTitle', {required: true})}
                    type="text" disabled={!session}
                    className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
                    placeholder={session ? 'Create a post by entering a title..' : 'Sign in to Post!'}
                />

                <PhotoIcon
                    onClick={() => setImageBoxOpen(!imageBoxOpen)}
                    className={`h-6 text-gray-300 cursor-pointer ${imageBoxOpen && 'text-orange-400'}`}
                />

                <LinkIcon className="h-6 text-gray-300" />
            </div>

            {!!watch('postTitle') && (
                <div className="flex flex-col py-2">
                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Body:</p>
                        <input
                            {...register('postBody')}
                            type="text" placeholder="Text (optional)"
                            className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                        />
                    </div>

                    <div className="flex items-center px-2">
                        <p className="min-w-[90px]">Subreddit:</p>
                        <input
                            {...register('subreddit', {required: true})}
                            type="text" placeholder="i.e. React-js"
                            className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                        />
                    </div>

                    {imageBoxOpen && (
                        <div className="flex items-center px-2">
                            <p className="min-w-[90px]">Image URL:</p>
                            <input
                                {...register('postImage')}
                                type="text" placeholder="(optional)"
                                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                            />
                        </div>
                    )}

                    {Object.keys(errors).length > 0 && (
                        <div className="space-y-2 p-2 text-red-500 text-center">
                            {errors.postTitle?.type === 'required' && (
                                <p>- A Post Title is required</p>
                            )}
                            {errors.subreddit?.type === 'required' && (
                                <p>- A Subreddit is required</p>
                            )}
                        </div>
                    )}

                    {!!watch('postTitle') && (
                        <button className="w-full rounded-full bg-blue-400 p-2 text-white" type="submit">
                            Create Post
                        </button>
                    )}
                </div>
            )}
        </form>
    );
}

export default PostBox;