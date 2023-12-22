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

interface sikhHistory {

}

interface sikhMap {
    src: string,
    display: {
        width: number,
        height: number,
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
                    return readJson(path.join(datastore, "timelines", mapping[i].timeline));
                }
            }
        }
    } catch {}
    return false;
}