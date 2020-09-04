import React from 'react';
import {
  Calendar as AntDCalendar, Empty, List,
} from 'antd';
import * as moment from 'moment';
import CalendarDate from './calendar-date';
import { IEvent } from '../../interfaces/backend-interfaces';

import './calendar.scss';

type CalendarProps = {
  dataSource?: IEvent[];
};

const getBeginDate = (dates: moment.Moment[]): moment.Moment => dates
  .reduce((acc, date) => (acc.isBefore(date) ? acc : date))
  .startOf('month');

const getEndDate = (dates: moment.Moment[]): moment.Moment => dates
  .reduce((acc, date) => (acc.isAfter(date) ? acc : date))
  .endOf('month');

const eventsSortByDate = (events: IEvent[]): IEvent[] => events
  .sort((a: IEvent, b: IEvent): number => {
    const dateA = moment(a.date);
    const dateB = moment(b.date);

    if (dateA.isBefore(dateB)) return -1;
    if (dateA.isSame(dateB)) return 0;
    return 1;
  });

const CalendarNoData: React.FC = () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

const Calendar: React.FC<CalendarProps> = ({ dataSource }: CalendarProps) => {
  if (!dataSource) return <CalendarNoData />;
  if (!dataSource.length) return <CalendarNoData />;

  const currentDate: moment.Moment = moment();
  const dates: moment.Moment[] = [...dataSource.map(({ date }) => moment(date)), currentDate];

  const getDayData = (date: moment.Moment): IEvent[] => dataSource
    .filter((event) => moment(event.date).isSame(date, 'day'));

  const getMonthData = (date: moment.Moment): IEvent[] => dataSource
    .filter((event) => moment(event.date).isSame(date, 'month'));

  const dateCellRender = (date: moment.Moment): React.ReactNode => {
    const data = eventsSortByDate(getDayData(date));
    return data.length
      ? <CalendarDate data={data} />
      : null;
  };

  const dateMonthRender = (date: moment.Moment): React.ReactNode => {
    const data = eventsSortByDate(getMonthData(date));
    return data.length
      ? (
        <List
          size="small"
          bordered
          dataSource={data}
          renderItem={(item) => (
            <List.Item>
              {`${item.name} ${item.type}`}
            </List.Item>
          )}
        />
      )
      : null;
  };

  return (
    <div className="calendar">
      <AntDCalendar
        validRange={[getBeginDate(dates), getEndDate(dates)]}
        dateCellRender={dateCellRender}
        monthCellRender={dateMonthRender}
      />
    </div>
  );
};

Calendar.defaultProps = {
  dataSource: [],
};

export default Calendar;
