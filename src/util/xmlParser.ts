import { promises as fs } from 'fs';
import { XMLParser } from 'fast-xml-parser';

/**
 * Reads an XML file and returns its content as a parsed object
 * @param filePath - Path to the XML file
 * @returns Promise<T> - Parsed XML data with the specified type
 */
export async function readXMLFile<T>(filePath: string): Promise<T> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const parser = new XMLParser();
        return parser.parse(fileContent) as T;
    } catch (error) {
        throw new Error(`Error reading XML file: ${error}`);
    }
}
