"use client";

import { useRef, useState, useEffect } from "react";
import { sikhTimeline } from "../utils/datastore";

export default function Timeline ({ data } : { data: sikhTimeline }) {
    const containerRef = useRef(null as HTMLDivElement | null);

    const handleResize = (container: HTMLDivElement) => {
        let box = container.parentElement;
        if (!box) return;
        let boxStyle = getComputedStyle(box);
        let boxWidth = parseInt(boxStyle.width);            
        if (boxWidth < data.container.width) {
            (container.style as any).zoom = (boxWidth/data.container.width).toFixed(3);
        }
    }

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            window.addEventListener("resize", () => handleResize(container));
            return () => {
                window.removeEventListener("resize", () => handleResize(container));
            }
        }
    })
    //<path class="fill-markercolor" d="M12 2C6.48 2 2 6.48 2 12c0 4.22 2.6 9.74 7.73 17.01a1 1 0 0 0 1.54 0C19.4 21.74 22 16.22 22 12 22 6.48 17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
    return (
        <div className="w-full h-full flex p-4 lg:p-16 rounded overflow-hidden">
            <div className="h-full w-full columns-2 rounded flex">
                <div className="w-full h-full rounded flex justify-center items-center relative">
                    <div style={{height: data.container.height, width: data.container.width}} className="absolute" ref={containerRef}>
                        {data.maps.map((map, mapIndex) => (
                            <div className="map" style={{zoom: map.display.zoom, position: "absolute", top: map.display.y, left: map.display.x, transform: `rotate(${map.display.rotation}deg)`}} key={mapIndex} dangerouslySetInnerHTML={{__html: map.svg || ""}}></div>
                        ))}    
                        <svg className="marker-point" style={{height: data.container.height, width: data.container.width, position: "absolute", top: 0, left: 0}}>
                            {data.maps.map((map, mapIndex) => (
                                map.history.map((history, historyIndex) => (
                                    <g style={{transform: `translate(${history.position.x}px, ${history.position.y}px)`}} key={historyIndex}>
                                        <path transform="scale(0.6)" className="fill-markercolor" d="M12 2C6.48 2 2 6.48 2 12c0 4.22 2.6 9.74 7.73 17.01a1 1 0 0 0 1.54 0C19.4 21.74 22 16.22 22 12 22 6.48 17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>
                                    </g>
                                ))
                            ))}            
                        </svg>
                    </div>
                </div>
                <div className="w-full h-full max-w-lg rounded-e hidden lg:block">
                    {data.maps.map((map, mapIndex) => (
                        map.history.map((history, historyIndex) => (
                            <div className="dark:hover:bg-zinc-800 duration-150 cursor-pointer hover:bg-gray-100 dark:border-zinc-800 border-zinc-200 border p-3 rounded" data-id={historyIndex} key={historyIndex}>
                                <div className="flex items-center">
                                    <h1 className="text-sm font-medium">{history.title}</h1>
                                    <div className="flex items-center mx-4">
                                        {history.keywords.map((keyword, keywordIndex) => (
                                            <button className={`text-xss font-semibold mx-0.5 px-1 rounded opacity-80 ${keyword.classname}`} key={keywordIndex}>{keyword.name}</button>
                                        ))}
                                    </div>
                                    <span className="text-xs font-light text-zinc-400 dark:text-zinc-400 ml-auto">{history.date}</span>
                                </div>
                            </div>
                        ))
                    ))}
                </div>
            </div>
        </div>
    );
}