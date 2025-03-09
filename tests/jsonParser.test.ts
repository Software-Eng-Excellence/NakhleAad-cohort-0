import { readJSONFile } from '../src/util/jsonParser';
import { promises as fs } from 'fs';

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn()
    }
}));

describe('readJSONFile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully read and parse JSON file', async () => {
        const mockData = { name: 'test', value: 123 };
        (fs.readFile as jest.Mock).mockResolvedValue(JSON.stringify(mockData));

        const result = await readJSONFile<typeof mockData>('test.json');
        
        expect(result).toEqual(mockData);
        expect(fs.readFile).toHaveBeenCalledWith('test.json', 'utf-8');
    });

    it('should throw error when file read fails', async () => {
        const error = new Error('File not found');
        (fs.readFile as jest.Mock).mockRejectedValue(error);

        await expect(readJSONFile('invalid.json'))
            .rejects
            .toThrow('Error reading JSON file: Error: File not found');
    });

    it('should throw error when JSON parsing fails', async () => {
        (fs.readFile as jest.Mock).mockResolvedValue('invalid json');

        await expect(readJSONFile('invalid.json'))
            .rejects
            .toThrow('Error reading JSON file: SyntaxError: Unexpected token');
    });
});