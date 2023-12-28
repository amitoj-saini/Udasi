import path from "path";
import fs from "fs";

// static
let mapFile = "datastore/mapping.json";
let datastore = "datastore";

interface sikhMapping {type: string, title: string, timeline: string, id: number}
export interface sikhsMapping extends Array<sikhMapping> {}

export interface sikhFormattedMapping { 
    guru: sikhMapping[], 
    gursikh: sikhMapping[] 
}

interface SikhiKeywords {
    id: number,
    name: string,
    classname: string
}

interface sikhHistory {
    id: number,
    title: string,
    date: string,
    keywords: SikhiKeywords[]
    position: {
        x: number,
        y: number
    }
}

interface sikhMap {
    id: number,
    src: string,
    svg: string | null,
    display: {
        zoom: number,
        x: number,
        y: number,
        rotation: number
    },
    history: sikhHistory[]
}

export interface sikhTimeline {
    container: {
        width: number,
        height: number
    },
    maps: sikhMap[]
}

const readJson = (filename: string, fallBack: object | [] = {}) => {
    try {
        return JSON.parse(fs.readFileSync(filename, "utf8"));
    } catch {
        return fallBack;
    }
}

export const getMapping = () => 
    readJson(mapFile, []);

export const getSikh = (id: string) => {
    try {
        let sikhId = parseInt(id);
        if (!isNaN(sikhId)) {
            let mapping = getMapping();
            for (let i=0; i<mapping.length; i++) {
                if (sikhId == mapping[i].id) {
                    let data = readJson(path.join(datastore, "timelines", mapping[i].timeline)) as sikhTimeline;
                    for (let i=0; i<data.maps.length; i++) {
                        try {
                            data.maps[i].svg = fs.readFileSync(path.join(datastore, "maps", data.maps[i].src), "utf8");
                        } catch {
                            continue;
                        }
                    }
                    
                    return data;
                }
            }
        }
    } catch {}
    return false;
}