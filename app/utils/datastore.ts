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

const readJson = (filename: string, fallBack: object | [] = {}) => {
    try {
        return JSON.parse(fs.readFileSync(filename, "utf8"));
    } catch {
        return fallBack;
    }
}

export const getMapping = () => 
    readJson(mapFile, []);