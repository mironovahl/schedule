import fileDownload from 'js-file-download';
import { IEvent } from '../interfaces/backend-interfaces';

const ObjectsToCsv = require('objects-to-csv');

const saveFile = (data: string, extension: string) => {
  fileDownload(data, `data.${extension}`);
};

const saveToCSV = async (data: IEvent[]) => {
  const csv = await new ObjectsToCsv(data).toString();
  saveFile(csv, 'csv');
};

export default saveToCSV;
