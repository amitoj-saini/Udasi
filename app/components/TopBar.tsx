import { getMapping } from "../utils/datastore";
import React, { useEffect } from 'react';
import { cookies } from "next/headers";
import ToggleTheme from "./ToggleTheme";
import Search from "./Search";


export default function TopBar({ additionalClasses }: { additionalClasses?: string }) {
    let data = getMapping();
    return (
        <div className={`${additionalClasses} dark:border-zinc-800 border-zinc-200 border-b h-14 w-full`}>
            <div className="w-full flex items-center h-full px-4 md:px-8 lg:px-14">
                <div>
                    <a className="flex" href="/">
                        <img style={{marginTop: "-2px"}} className="w-6 h-6 dark:invert" src="/logo.svg"></img>
                        <h1 className="sm:block hidden mx-4 text-base font-bold">Udasi</h1>
                    </a>
                </div>
                <div className="dark:text-gray-400 text-gray-700 mx-6 text-xs">
                    <nav className="md:block hidden">
                        <a className="dark:hover:text-white hover:text-black mx-2" href="/">Home</a>
                        <a className="dark:hover:text-white hover:text-black mx-2" href="#">Source Code</a>
                        <a className="dark:hover:text-white hover:text-black mx-2" href="/">Documentation</a>
                        <a className="dark:hover:text-white hover:text-black mx-2" href="/">Socials</a>
                        <a className="dark:hover:text-white hover:text-black mx-2" href="/">Blog</a>
                    </nav>
                </div>
                <div className="flex h-full grow items-center">
                    <div className="ml-auto w-full flex-1 md:w-auto md:flex-none">
                        <Search data={data}/>
                    </div>
                    
                    <ToggleTheme theme={cookies().get("theme")?.value || "light"}/>
                    
                </div>
            </div>
        </div>
    )
}   