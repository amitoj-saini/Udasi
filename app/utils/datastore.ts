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

export interface SikhTimeline {
    
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
            mapping.forEach((sikh : sikhMapping) => {
                if (sikhId == sikh.id) {
                    return readJson(path.join(datastore, "timelines", sikh.timeline));
                }
            });
        }
    } catch {}
    return false;
}