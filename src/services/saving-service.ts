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

const saveToTXT = async (data: IEvent[]) => {
  const text = data.map((event) => (
    `${event.type}: ${event.name}
${event.date.toLocaleString()}
${event.url}
Место проведения: ${event.place}
Описание: ${event.description}
Комментарий: ${event.comment}

`));
  const txt = text.join('');
  saveFile(txt, 'txt');
};

export { saveToCSV, saveToTXT };
