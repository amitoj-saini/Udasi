"use client";

import { useRef, useState, useEffect } from "react";
import { sikhTimeline } from "../utils/datastore";

interface CustomCSSStyleDeclaration extends CSSStyleDeclaration {
    zoom?: string;
}

const renderedMaps: number[] = [];

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

    let parser = new DOMParser();
    timeline.maps.forEach(map => {
        // Don't need to set maps every resize
        if (renderedMaps.includes(map.id)) return;
        renderedMaps.push(map.id);
        fetch(`/maps/${map.src}`)
        .then(res => res.text())
        .then(svgtext => {
            let svg = parser.parseFromString(svgtext, "image/svg+xml").querySelector("svg");
            if (svg) {
                svg.setAttribute("data-id", map.id.toString());
                (svg.style as any).zoom = map.display.zoom;
                svg.style.left = `${map.display.x}px`;
                svg.style.top = `${map.display.y}px`;
                svg.style.position = "absolute";
                svg.style.transform = `rotate(${map.display.rotation}deg)`;
                container.appendChild(svg);
            }
        });
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
            return () => {
                container.innerHTML = "";
                window.removeEventListener("resize", () => drawTimeline(container, data));
            }
        }  
    }, [data]);

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