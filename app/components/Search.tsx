"use client";

import { useEffect, useState } from "react";

function SearchModal() {
    return (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center dark:bg-white-900/60 dark:bg-black-900/60 fixed inset-0 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-10">
            <div className="w-full h-[20rem] max-w-lg rounded-lg border dark:border-zinc-800 dark:bg-black border-zinc-200 bg-white">
            
            </div>        
        </div>
    )
}

export default function Search() {
    const [searchModal, setShowSearchModal] = useState(false);
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key == "k") {
                setShowSearchModal(!searchModal)
            }
        }
        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [searchModal]);
    return (
        <>
            <button onClick={() => setShowSearchModal(!searchModal)} className="dark:border-zinc-800 border-zinc-200 inline-flex items-center whitespace-nowrap rounded-md font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm dark:hover:bg-black hover:bg-gray-100 dark:hover:text-white hover:text-black h-9 px-4 py-2 relative w-full justify-start text-sm text-gray-400 sm:pr-12 md:w-40 lg:w-64">
                <span className="text-xs hidden lg:inline-flex">Search the jeevan of...</span>
                <span className="text-xs inline-flex lg:hidden">Search...</span>
                <kbd className="bg-gray-100 dark:bg-black dark:border-zinc-800 border-zinc-200 pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            {searchModal ? <SearchModal /> : null}
        </>
    )
}