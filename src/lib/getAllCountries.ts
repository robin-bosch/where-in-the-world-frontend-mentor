


import fs from 'fs';
import path from 'path';

export default function getAllCountries() {
    return JSON.parse(fs.readFileSync(path.join(process.cwd(), '/src/data/countriesV3.1.json'), 'utf-8'))  
}