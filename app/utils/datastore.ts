import path from "path";
import fs from "fs";

// static
let mapFile = "datastore/mapping.json";
let datastore = "datastore";

interface sikhMapping {type: string, title: string, timeline: string}


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

export const getFormattedMapping = () => {
    let returnData = { guru: [], gursikh: [] } as sikhFormattedMapping
    let data = getMapping();
    if (Array.isArray(data)) {
        for (let i=0; i<data.length; i++) {
            let typeKey = data[i]["type"].toLowerCase() as "guru" | "gursikh";
            returnData[typeKey].push(data[i])
        }    
    }
    return returnData
}