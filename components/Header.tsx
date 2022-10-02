import React from 'react';
import Image from "next/image";

import {BeakerIcon, ChevronDownIcon, HomeIcon} from "@heroicons/react/24/solid";
import {MagnifyingGlassIcon} from "@heroicons/react/24/solid";
import {StarIcon, BellIcon, ChatBubbleOvalLeftIcon, GlobeAltIcon, PlusIcon, SparklesIcon, SpeakerWaveIcon, VideoCameraIcon} from "@heroicons/react/24/outline";
import {Bars3Icon} from "@heroicons/react/24/outline";

const Header = () => {
    return (
        <div className="flex bg-white px-4 py-2 shadow-sm sticky top-0 z-50">
            <div className="relative h-10 w-20 flex-shrink-0 cursor-pointer">
                <Image
                    src="https://cdn.worldvectorlogo.com/logos/reddit-logo-new.svg"
                    layout="fill" objectFit="contain"
                />
            </div>

            <div className="flex items-center mx-7 xl:min-w-[300px]">
                <HomeIcon className="h-5 w-5" />
                <p className="flex-1 ml-2 hidden lg:inline">Home</p>
                <ChevronDownIcon className="h-5 w-5" />
            </div>

            <form className="flex flex-1 items-center space-x-2 rounded-sm border border-gray-200 bg-gray-100 px-3 py-1">
                <MagnifyingGlassIcon className="h-6 w-6 text-gray-400" />
                <input className="flex-1 bg-transparent outline-none" type="text" placeholder="Search Reddit" />
                <button type="submit" hidden />
            </form>

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

            <div className="ml-5 flex items-center lg:hidden">
                <Bars3Icon className="icon" />
            </div>
        </div>
    );
}

export default Header;