import { useContext } from 'react';
import * as moment from 'moment-timezone';
import SettingsContext from '../context/settings-context';
import { IEvent } from '../interfaces/backend-interfaces';

const getFullDate = (date: moment.Moment) => {
  const { timezone } = useContext(SettingsContext);
  return date.tz(timezone).format('MMMM Do YYYY');
};
const getDate = (date: moment.Moment) => {
  const { timezone } = useContext(SettingsContext);
  return date.tz(timezone).format('DD-MM-YYYY');
};

const getTime = (date: moment.Moment) => {
  const { timezone } = useContext(SettingsContext);
  return date.tz(timezone).format('H:mm');
};

const getDeadline = (date: moment.Moment) => moment(date, 'YYYYMMDD').fromNow();

const eventsSortByDate = (events: IEvent[]): IEvent[] => events
  .sort((a: IEvent, b: IEvent): number => {
    const dateA = moment(a.startDate);
    const dateB = moment(b.startDate);

    if (dateA.isBefore(dateB)) return -1;
    if (dateA.isSame(dateB)) return 0;
    return 1;
  });

export {
  getFullDate, getDate, getTime, eventsSortByDate, getDeadline,
};
