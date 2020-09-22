import fileDownload from 'js-file-download';
import SettingsService from './settings-service';
import { IEvent } from '../interfaces/backend-interfaces';

const ObjectsToCsv = require('objects-to-csv');

const filterEvents = (events: IEvent[]) => {
  const { hiddenRows, hiddenCols } = SettingsService.getAllSettings();
  const filterRows = events.filter((item) => !hiddenRows.includes(item.id));
  const deletedCols: string[] = [];
  Object.keys(hiddenCols).forEach((key) => {
    if (!hiddenCols[key]) deletedCols.push(key);
  });
  filterRows.forEach((item, i) => {
    deletedCols.forEach((item2) => delete filterRows[i][item2]);
  });
  return filterRows;
};

const saveFile = (data: string, extension: string) => {
  fileDownload(data, `schedule.${extension}`);
};

const saveToCSV = async (data: IEvent[]) => {
  const filtered = filterEvents(data);
  const csv = await new ObjectsToCsv(filtered).toString();
  saveFile(csv, 'csv');
};

const saveToTXT = async (data: IEvent[]) => {
  const filtered = filterEvents(data);
  const text = filtered.map((event) => (
    `${event.type ? event.type : ''}: ${event.name ? event.name : ''}
Начало события: ${event.startDate ? event.startDate.format('MMMM Do YYYY') : ''}
Конец события: ${event.endDate ? event.endDate.format('MMMM Do YYYY') : ''}
${event.url ? event.url : ''}
Место проведения: ${event.place ? event.place : ''}
Описание: ${event.description ? event.description : ''}
Комментарий: ${event.comment ? event.comment : ''}

`));
  const txt = text.join('');
  saveFile(txt, 'txt');
};

export { saveToCSV, saveToTXT };
