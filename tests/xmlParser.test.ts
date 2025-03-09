import { readXMLFile } from '../src/util/xmlParser';
import { promises as fs } from 'fs';

jest.mock('fs', () => ({
    promises: {
        readFile: jest.fn()
    }
}));

describe('readXMLFile', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully parse XML file', async () => {
        const mockXML = '<root><item>test</item></root>';
        const expectedResult = {
            root: {
                item: 'test'
            }
        };

        (fs.readFile as jest.Mock).mockResolvedValue(mockXML);

        const result = await readXMLFile<typeof expectedResult>('test.xml');
        expect(result).toEqual(expectedResult);
        expect(fs.readFile).toHaveBeenCalledWith('test.xml', 'utf-8');
    });

    it('should throw error when file reading fails', async () => {
        const errorMessage = 'File not found';
        (fs.readFile as jest.Mock).mockRejectedValue(new Error(errorMessage));

        await expect(readXMLFile('nonexistent.xml'))
            .rejects
            .toThrow(`Error reading XML file: Error: ${errorMessage}`);
    });

    it('should throw error when XML parsing fails', async () => {
        const invalidXML = '<root><item>test</item';
        (fs.readFile as jest.Mock).mockResolvedValue(invalidXML);

        await expect(readXMLFile('invalid.xml'))
            .rejects
            .toThrow('Error reading XML file:');
    });
});