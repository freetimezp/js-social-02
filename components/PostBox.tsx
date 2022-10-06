import React, {useState} from 'react';
import {useSession} from "next-auth/react";
import Avatar from "./Avatar";
import {useForm} from 'react-hook-form';

import {LinkIcon, PhotoIcon} from '@heroicons/react/24/outline';

import client from "../apollo-client";

import {useMutation} from "@apollo/client";
import {ADD_POST, ADD_SUBREDDIT} from "../graphql/mutations";
import {GET_ALL_POSTS, GET_SUBREDDIT_BY_TOPIC} from "../graphql/queries";
import {toast} from "react-hot-toast";


type FormData = {
    postTitle: string;
    postBody: string;
    postImage: string;
    subreddit: string;
}

type Props = {
    subreddit?: string;
}

const PostBox = ({subreddit}: Props) => {
    const {data: session} = useSession();
    const [imageBoxOpen, setImageBoxOpen] = useState<boolean>(false);
    const {register, setValue, handleSubmit, watch, formState: {errors}} = useForm<FormData>();

    const [addPost] = useMutation(ADD_POST, {
        refetchQueries: [GET_ALL_POSTS,'getPostList'],
    });
    const [addSubreddit] = useMutation(ADD_SUBREDDIT);

    //console.log(client);

    const onSubmit = handleSubmit(async (formData) => {
        //console.log(formData);

        const notification = toast.loading('Creating new Post...');

        try {
            //query for subreddit topic
            const {data: {getSubredditListByTopic}} = await client.query({
                query: GET_SUBREDDIT_BY_TOPIC,
                variables: {
                    topic: subreddit || formData.subreddit,
                }
            })

            const subredditExists = getSubredditListByTopic.length > 0;

            if(!subredditExists) {
                //create subreddit...
                const {data: {insertSubreddit: newSubreddit}} = await addSubreddit({
                    variables: {
                        topic: formData.subreddit,
                    }
                })

                const image = formData.postImage || '';

                const {data: {insertPost: newPost}} = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: newSubreddit.id,
                        title: formData.postTitle,
                        username: session?.user?.name
                    }
                })

                //console.log('New Post added', newPost);
            }else{
                //use existing subreddit
                //console.log(getSubredditListByTopic);
                const image = formData.postImage || '';

                const {data: {insertPost: newPost}} = await addPost({
                    variables: {
                        body: formData.postBody,
                        image: image,
                        subreddit_id: getSubredditListByTopic[0].id,
                        title: formData.postTitle,
                        username: session?.user?.name
                    }
                })

                console.log('by else step.. New Post added', newPost);
            }

            //after Post added
            setValue('postBody', '');
            setValue('postImage', '');
            setValue('postTitle', '');
            setValue('subreddit', '');

            toast.success('New Post created!', {
                id: notification
            });

        } catch(error) {
            toast.error('Whoops something went wrong...', {
                id: notification
            });
        }
    });

    return (
        <form
            className="sticky top-16 md:top-20 z-50 bg-white border rounded-md border-gray-300 p-2 mb-4 shadow-md shadow-blue-400"
            onSubmit={onSubmit}
        >
            <div className="flex items-center space-x-3">
                <Avatar />

                <input
                    {...register('postTitle', {required: true})}
                    type="text" disabled={!session}
                    className="bg-gray-50 p-2 pl-5 outline-none rounded-md flex-1"
                    placeholder={session ? subreddit ? `Create a Post in r/${subreddit}` : 'Create a post by entering a title..' : 'Sign in to Post!'}
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

                    {!subreddit && (
                        <div className="flex items-center px-2">
                            <p className="min-w-[90px]">Subreddit:</p>
                            <input
                                {...register('subreddit', {required: true})}
                                type="text" placeholder="i.e. React-js"
                                className="m-2 flex-1 bg-blue-50 p-2 outline-none"
                            />
                        </div>
                    )}

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