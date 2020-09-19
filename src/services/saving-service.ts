import fileDownload from 'js-file-download';
import { useContext } from 'react';
import { IEvent } from '../interfaces/backend-interfaces';
import SettingsContext from '../context/settings-context';

const { hiddenCols, hiddenRows } = useContext(SettingsContext);

const ObjectsToCsv = require('objects-to-csv');

const filterEvents = (events: IEvent[]) => {
  const filterRows = events.filter((item) => hiddenRows.includes(item.id));
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
  fileDownload(data, `data.${extension}`);
};

const saveToCSV = async (data: IEvent[]) => {
  const filtered = filterEvents(data);
  const csv = await new ObjectsToCsv(filtered).toString();
  saveFile(csv, 'csv');
};

const saveToTXT = async (data: IEvent[]) => {
  const filtered = filterEvents(data);
  const text = filtered.map((event) => (
    `${event.type ? event.type : null}: ${event.name ? event.name : null}
${event.date ? event.date.toLocaleString() : null}
${event.url ? event.url : null}
Место проведения: ${event.place ? event.place : null}
Описание: ${event.description ? event.description : null}
Комментарий: ${event.comment ? event.comment : null}

`));
  const txt = text.join('');
  saveFile(txt, 'txt');
};

export { saveToCSV, saveToTXT };
