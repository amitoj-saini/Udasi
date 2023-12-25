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

    return (
        <div className="w-full h-full flex p-4 lg:p-16 rounded overflow-hidden">
            <div className="h-full w-full columns-2 rounded flex">
                <div className="w-full h-full rounded flex justify-center items-center relative">
                    <div style={{height: data.container.height, width: data.container.width}} className="absolute" ref={containerRef}>
                        {data.maps.map((map, mapIndex) => (
                            <div className="map" style={{zoom: map.display.zoom, position: "absolute", top: map.display.y, left: map.display.x, transform: `rotate(${map.display.rotation}deg)`}} key={mapIndex} dangerouslySetInnerHTML={{__html: map.svg || ""}}></div>
                        ))}
                    </div>
                </div>
                <div className="w-full h-full max-w-sm rounded-e hidden lg:block"></div>
            </div>
        </div>
    );
}