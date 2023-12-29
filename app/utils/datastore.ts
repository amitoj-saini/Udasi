import markdownit from 'markdown-it'
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
    src: string,
    html: string | null,
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
    const md = markdownit();
    try {
        let sikhId = parseInt(id);
        if (!isNaN(sikhId)) {
            let mapping = getMapping();
            for (let i=0; i<mapping.length; i++) {
                if (sikhId == mapping[i].id) {
                    let data = readJson(path.join(datastore, "timelines", mapping[i].timeline)) as sikhTimeline;
                    for (let x=0; x<data.maps.length; x++) {
                        try {
                            data.maps[x].svg = fs.readFileSync(path.join(datastore, "maps", data.maps[x].src), "utf8");
                            for (let y=0; y<data.maps[x].history.length; y++) {
                                try {
                                    data.maps[x].history[y].html = md.render(fs.readFileSync(path.join(datastore, "markdown", data.maps[x].history[y].src), "utf8"));
                                } catch {
                                    continue;
                                }
                            }
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