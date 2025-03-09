import { promises as fs } from 'fs';

/**
 * Reads a JSON file and returns its content as a parsed object
 * @param filePath - Path to the JSON file
 * @returns Promise<T> - Parsed JSON data with specified type
 */
export async function readJSONFile<T>(filePath: string): Promise<T> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(fileContent) as T;
    } catch (error) {
        throw new Error(`Error reading JSON file: ${error}`);
    }
}

