"use client";

import { useRef, useState, useEffect } from "react";
import { sikhTimeline } from "../utils/datastore";

const drawTimeline = (canvas: HTMLCanvasElement, timeline: sikhTimeline) => {
    const ctx = canvas.getContext("2d");
    if (!ctx || !canvas.parentElement) return;

    // set width and height of canvas
    let canvasStyle = getComputedStyle(canvas.parentElement);
    let canvasWidth = parseInt(canvasStyle.width);
    let canvasHeight = parseInt(canvasStyle.height);
    let zoomSize = 1;
    let canvasPadding = ((canvasWidth < 700) ? 1 : 0.8); // num% of screen
    let height = canvasPadding*canvasHeight;
    let width = canvasPadding*canvasWidth;


    
    if (width > timeline.canvas.width) {
        width = timeline.canvas.width;
    } else {
        zoomSize = width/timeline.canvas.width;
    }
    
    if (height > timeline.canvas.height)
        height = timeline.canvas.height;
    
    canvas.height = height;
    canvas.width = width;

    timeline.maps.forEach((map) => {
        let mapImg = new Image();
        mapImg.src = `/maps/${map.src}`;
        mapImg.onload = () => {
            let imgWidth = zoomSize*map.display.width;
            console.log(imgWidth/map.display.width, zoomSize);
            ctx.drawImage(mapImg, zoomSize*map.display.x, zoomSize*map.display.y, zoomSize*map.display.width, zoomSize*map.display.height);
       };
    });
    //console.log(JSON.stringify(timeline, null, 4))
}

export default function Timeline ({ data } : { data: sikhTimeline }) {
    const canvasRef = useRef(null as HTMLCanvasElement | null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            drawTimeline(canvas, data);
            window.addEventListener("resize", () => drawTimeline(canvas, data));
        }  
    })

    return (
        <div className="w-full h-full flex p-4 lg:p-16 rounded overflow-hidden">
            <div className="h-full w-full columns-2 rounded flex border dark:border-zinc-800 border-zinc-200">
                <div className="w-full h-full rounded-s flex justify-center items-center">
                    <canvas ref={canvasRef}></canvas>
                </div>
                <div className="w-full h-full max-w-sm dark:bg-zinc-900 bg-zinc rounded-e hidden lg:block"></div>
            </div>
        </div>
    );
}