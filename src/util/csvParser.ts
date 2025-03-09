import { promises as fs } from 'fs';
import {parse as csvParse} from 'csv-parse';
import {stringify as csvStringify} from 'csv-stringify';

/**
 * Reads a CSV file and returns its content as a 2D array of strings
 * @param filePath - Path to the CSV file
 * @param includeHeader - Whether to include the header row in the output
 * @returns Promise<string[][]> - 2D array containing the CSV data
 */
export async function readCSVFile(filePath: string,includeHeader: boolean = false): Promise<string[][]> {
    try {
        const fileContent = await
        fs.readFile(filePath, 'utf-8');
        return new Promise((resolve, reject) => {
            csvParse(fileContent,{
                trim: true,
                skip_empty_lines: true
            }, (err, records: string[][]) => {
                if (err) reject(err);
                if (!includeHeader) records.shift();  
                resolve(records);
                
            });
        });

    }catch (error) {
        throw new Error(`Error reading CSV file: ${error}`);
    }
}

