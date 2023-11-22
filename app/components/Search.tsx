"use client";

import { useEffect, useState, useRef } from "react";

export default function Search() {
    const [searchModal, setShowSearchModal] = useState(false);
    const search = useRef<HTMLInputElement>(null);
    const toggleModal = async () => {
        await setShowSearchModal(!searchModal);
        if (!searchModal && search.current) 
            search.current.focus();
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if ((event.metaKey || event.ctrlKey) && event.key == "k") 
                toggleModal();
        }
        document.addEventListener("keydown", handleKeyDown);

        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [searchModal]);
    return (
        <>
            <button onClick={toggleModal} className="dark:border-zinc-800 border-zinc-200 inline-flex items-center whitespace-nowrap rounded-md font-normal transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-transparent shadow-sm dark:hover:bg-black hover:bg-gray-100 dark:hover:text-white hover:text-black h-9 px-4 py-2 relative w-full justify-start text-sm text-gray-400 sm:pr-12 md:w-40 lg:w-64">
                <span className="text-xs hidden lg:inline-flex">Search the jeevan of...</span>
                <span className="text-xs inline-flex lg:hidden">Search...</span>
                <kbd className="bg-gray-100 dark:bg-black dark:border-zinc-800 border-zinc-200 pointer-events-none absolute right-1.5 top-1.5 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </button>

            {searchModal ? <>
            <div onClick={toggleModal} className="absolute top-0 left-0 w-full h-full dark:bg-white-900/60 dark:bg-black-900/60 fixed inset-0 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 z-10"></div>
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-full h-[20rem] max-w-lg rounded-lg border dark:border-zinc-800 dark:bg-black border-zinc-200 bg-white">
                <div className="flex items-center px-3 border-b dark:border-zinc-800 border-zinc-200">
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 h-4 w-4 shrink-0 opacity-50"><path d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                    <input ref={search} className="flex h-12 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50" placeholder="Search Guru or Gursikh..."></input>
                    <svg onClick={toggleModal} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer h-4 w-4 ml-2 opacity-50 hover:opacity-100"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd"></path></svg>
                </div>
            </div>
            
            </> : null}
        </>
    )
}