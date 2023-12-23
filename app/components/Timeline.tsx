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
                svg.classList.add("map");
                //svg.classList.add("dark:fill-darkmap", "fill-lightmap");
                (svg.style as any).zoom = map.display.zoom;
                svg.style.left = `${map.display.x}px`;
                svg.style.top = `${map.display.y}px`;
                svg.style.position = "absolute";
                svg.style.transform = `rotate(${map.display.rotation}deg)`;
                let points = "";
                map.history.forEach(history => {
                    // every piece of history
                    // for some odd reason circles are not being appended when using svg.appendChild so instead use innerHTML
                    //points += `<circle class="stroke-13 dark:stroke-white stroke-black" r="8" cx="${history.position.x}" cy="${history.position.y}"></circle>`;
                    points +=  `
                    <g style="transform: translate(${history.position.x}px, ${history.position.y}px)">
                        <rect class="stroke-23 dark:stroke-white stroke-black" width="20" height="20"></rect>
                    </g>`;
                    //points += `< class="stroke-13 dark:stroke-white stroke-black" r="8" cx="${history.position.x}" cy="${history.position.y}"></circle>`;
                });
                //svg.innerHTML += points;
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
            <div className="h-full w-full columns-2 rounded flex">
                <div className="dark:bg-slate-800 bg-sky-200 w-full h-full rounded flex justify-center items-center relative">
                    <div className="absolute" ref={containerRef}></div>
                </div>
                <div className="w-full h-full max-w-sm rounded-e hidden lg:block"></div>
            </div>
        </div>
    );
}