import fs from 'fs';
import path from 'path';

/**
 * Returns the json list of all countries
 * @returns list of countries
 */
export default function getAllCountries() {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), '/src/data/countriesV3.1.json'), 'utf-8'))  
}