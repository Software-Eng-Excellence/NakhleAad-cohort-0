import { readCSVFile } from '../src/util/csvParser';
import { promises as fs } from 'fs';

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn()
    }
}));

describe('CSV Parser', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should parse CSV file without header', async () => {
        const mockCSV = 'header1,header2\nvalue1,value2\nvalue3,value4';
        (fs.readFile as jest.Mock).mockResolvedValue(mockCSV);

        const result = await readCSVFile('dummy.csv');
        expect(result).toEqual([
            ['value1', 'value2'],
            ['value3', 'value4']
        ]);
    });

    it('should parse CSV file with header', async () => {
        const mockCSV = 'header1,header2\nvalue1,value2\nvalue3,value4';
        (fs.readFile as jest.Mock).mockResolvedValue(mockCSV);

        const result = await readCSVFile('dummy.csv', true);
        expect(result).toEqual([
            ['header1', 'header2'],
            ['value1', 'value2'],
            ['value3', 'value4']
        ]);
    });

    it('should handle empty lines', async () => {
        const mockCSV = 'header1,header2\n\nvalue1,value2\n\nvalue3,value4';
        (fs.readFile as jest.Mock).mockResolvedValue(mockCSV);

        const result = await readCSVFile('dummy.csv');
        expect(result).toEqual([
            ['value1', 'value2'],
            ['value3', 'value4']
        ]);
    });

    it('should throw error when file reading fails', async () => {
        (fs.readFile as jest.Mock).mockRejectedValue(new Error('File not found'));

        await expect(readCSVFile('nonexistent.csv')).rejects.toThrow('Error reading CSV file');
    });
});