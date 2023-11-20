"use client";

import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import React from "react";

const  changeTheme = (event: React.MouseEvent<HTMLDivElement>) => {
    let toggletheme = document.querySelector("#toggletheme");
    let html = document.querySelector("html");
    if (html && toggletheme) {
        let dataMode = html.getAttribute("data-mode");
        if (dataMode == "light") dataMode = "dark";
        else dataMode = "light";
        html.setAttribute("data-mode", dataMode);
        document.cookie = `theme=${dataMode};`;
        toggletheme.setAttribute("src", ((dataMode == "dark") ? "/sun.svg" : "/moon.svg"));
    }
}

export default function ToggleTheme({theme}: {theme: string}) {

    return (
        <div onClick={changeTheme} className="ml-4 w-8 h-8 rounded-md flex justify-center items-center dark:hover:bg-black hover:bg-gray-100 cursor-pointer">
            <img id="toggletheme" className="w-4 h-4 dark:invert" src={((theme == "light") ? "/moon.svg" : "/sun.svg")}></img>
        </div>
    )
}