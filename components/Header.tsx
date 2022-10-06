import React from 'react';
import Image from "next/image";
import Link from "next/link";
import {signIn, signOut, useSession} from "next-auth/react";

import {BeakerIcon, ChevronDownIcon, HomeIcon} from "@heroicons/react/24/solid";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {StarIcon, BellIcon, ChatBubbleOvalLeftIcon, GlobeAltIcon, PlusIcon, SparklesIcon, SpeakerWaveIcon, VideoCameraIcon} from "@heroicons/react/24/outline";
import {Bars3Icon} from "@heroicons/react/24/outline";

const Header = () => {
    const {data: session} = useSession();

    return (
        <div className="flex items-center justify-between bg-white px-4 py-2 shadow-sm sticky top-0 z-50">
            <div className="relative h-5 w-10 flex-shrink-0 cursor-pointer md:w-20 md:h-10 mr-2">
                <Link href="/">
                    <Image
                        src="https://cdn.worldvectorlogo.com/logos/reddit-logo-new.svg"
                        layout="fill" objectFit="contain"
                    />
                </Link>
            </div>

            {session && (
                <div className="flex items-center mx-7 xl:min-w-[100px] hidden md:inline-flex">
                    <HomeIcon className="h-5 w-5" />
                    <p className="flex-1 ml-2 hidden lg:inline">Home</p>
                    <ChevronDownIcon className="h-5 w-5" />
                </div>
            )}

            {session && (
                <form className="flex flex-1 items-center w-[155px] md:max-w-full space-x-2 rounded-sm md:border border-gray-200 bg-gray-100 md:px-3 p-1">
                    <MagnifyingGlassIcon className="h-4 w-4 text-gray-400 md:h-6 md:w-6" />
                    <input className="flex-1 bg-transparent outline-none" type="text" placeholder="Search" />
                    <button type="submit" hidden />
                </form>
            )}

            <div className="text-gray-500 space-x-2 items-center mx-5 hidden lg:inline-flex">
                <SparklesIcon className="icon" />
                <GlobeAltIcon className="icon" />
                <VideoCameraIcon className="icon" />
                <hr className="h-10 border border-gray-100" />
                <ChatBubbleOvalLeftIcon className="icon" />
                <BellIcon className="icon" />
                <PlusIcon className="icon" />
                <SpeakerWaveIcon className="icon" />
            </div>

            {session && (
                <div className="ml-1 md:ml-5 flex items-center lg:hidden">
                    <Bars3Icon className="icon" />
                </div>
            )}

            {session ? (
                <div
                    className="flex items-center  space-x-2 cursor-pointer border border-gray-100 p-2"
                    onClick={() => signOut()}
                >
                    <div className="relative w-5 h-5 flex-shrink-0">
                        <Image
                            src="https://cdn.worldvectorlogo.com/logos/reddit-2.svg" alt="sign"
                            layout="fill" objectFit="contain"
                        />
                    </div>
                    <div className="flex-1 text-xs">
                        <p className="truncate">{session?.user?.name}</p>
                        <p className="text-gray-400">Go Out</p>
                    </div>

                    <ChevronDownIcon className="h-5 flex-shrink-0 text-gray-400" />
                </div>
            ) : (
                <div
                    className="flex items-center  space-x-2 cursor-pointer border border-gray-100 p-2"
                    onClick={() => signIn()}
                >
                    <div className="relative w-5 h-5 flex-shrink-0">
                        <Image
                            src="https://cdn.worldvectorlogo.com/logos/reddit-2.svg" alt="sign"
                            width={5} height={5} layout="fill" objectFit="contain"
                        />
                    </div>
                    <p className="text-gray-400">Sign In</p>
                </div>
            )}
        </div>
    );
}

export default Header;