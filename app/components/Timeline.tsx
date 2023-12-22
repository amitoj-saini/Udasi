"use client";

import { useRef, useState, useEffect } from "react";
import { sikhTimeline } from "../utils/datastore";

interface CustomCSSStyleDeclaration extends CSSStyleDeclaration {
    zoom?: string;
}

const drawTimeline = (container: HTMLDivElement, timeline: sikhTimeline) => {
    let box = container.parentElement;
    if (!box) return;
    let boxStyle = getComputedStyle(box);
    let boxWidth = parseInt(boxStyle.width);
    
    container.style.height = `${timeline.container.height}px`;
    container.style.width = `${timeline.container.width}px`;

    if (boxWidth < timeline.container.width) {
        (container.style as any).zoom = (boxWidth/timeline.container.width).toFixed(3);
    }

    // empty container
    container.innerHTML = "";

    timeline.maps.forEach(map => {
        let img = document.createElement("img");
        img.src = `/maps/${map.src}`;
        img.style.left = `${map.display.x}px`;
        img.style.top = `${map.display.y}px`;
        img.style.position = "absolute";
        img.height = map.display.height;
        img.width = map.display.width;
        img.style.transform = `rotate(${map.display.rotation}deg)`;
        container.appendChild(img);
    })
}

export default function Timeline ({ data } : { data: sikhTimeline }) {
    const containerRef = useRef(null as HTMLDivElement | null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const container = containerRef.current;
        if (container) {
            drawTimeline(container, data);
            window.addEventListener("resize", () => drawTimeline(container, data));
        }  
    })

    return (
        <div className="w-full h-full flex p-4 lg:p-16 rounded overflow-hidden">
            <div className="h-full w-full columns-2 rounded flex border dark:border-zinc-800 border-zinc-200">
                <div className="w-full h-full rounded-s flex justify-center items-center relative">
                    <div className="absolute" ref={containerRef}></div>
                </div>
                <div className="w-full h-full max-w-sm dark:bg-zinc-900 bg-zinc rounded-e hidden lg:block"></div>
            </div>
        </div>
    );
}