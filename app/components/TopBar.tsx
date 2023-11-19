import { cookies } from "next/headers"
import ToggleTheme from "./ToggleTheme"

export default function TopBar() {
    return (
        <div className="dark:border-zinc-800 border-zinc-200 border-b h-14 w-full">
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
                        <button className="dark:border-zinc-800 border-zinc-200 inline-flex items-center whitespace-nowrap rounded-md font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm dark:hover:bg-zinc-800 hover:bg-gray-100 dark:hover:text-white hover:text-black h-9 px-4 py-2 relative w-full justify-start text-sm text-gray-400 sm:pr-12 md:w-40 lg:w-64">
                            <span className="text-xs hidden lg:inline-flex">Search the jeevan of...</span>
                            <span className="text-xs inline-flex lg:hidden">Search...</span>
                            <kbd className="bg-gray-100 dark:bg-zinc-800 dark:border-zinc-800 border-zinc-200 pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                                <span className="text-xs">⌘</span>K
                            </kbd>
                        </button>
                    </div>
                    
                    <ToggleTheme theme={cookies().get("theme")?.value || "light"}/>
                    
                </div>
            </div>
        </div>
    )
}   