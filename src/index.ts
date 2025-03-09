import logger from './util/logger';
import config from './config';
import { readCSVFile } from './util/csvParser';
import { readJSONFile } from './util/jsonParser';
import { readXMLFile } from './util/xmlParser';

const { cakeOrdersPath ,petOrdersPath,toyOrdersPath} = config;
async function processCSV() {
  const data = await readCSVFile(cakeOrdersPath, true);
  data.forEach((row) => {
    logger.info(row);
  });
}
async function processJSON() {
  const pets = await readJSONFile<any[]>(petOrdersPath);
  pets.forEach((pet) => {
      logger.info(JSON.stringify(pet, null, 2));  // Pretty print the JSON with indentation
  });
}
async function processXML() {
  const xmlData = await readXMLFile<any>(toyOrdersPath);
  logger.info(JSON.stringify(xmlData, null, 2));
}

processCSV();
processJSON();
processXML();