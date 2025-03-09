import logger from './util/logger';
import config from './config';
import { readCSVFile } from './util/parser';


const { cakeOrdersPath } = config;
async function processCSV() {
  const data = await readCSVFile(cakeOrdersPath, true);
  data.forEach((row) => {
    logger.info(row);
  });
}

processCSV();
