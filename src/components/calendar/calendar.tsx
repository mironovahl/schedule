import React, { useState, useContext } from 'react';
import {
  Calendar as AntDCalendar,
  Empty,
  Row,
  Col,
  Select,
  Divider,
} from 'antd';
import * as moment from 'moment-timezone';
import CalendarDate from './calendar-date';
import CalendarMonth from './calendar-month';
import { IEvent } from '../../interfaces/backend-interfaces';
import SettingsContext from '../../context/settings-context';
import { Timezone } from '../../interfaces/settings-interfaces';

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

const setTimezoneToEvents = (events: IEvent[], timezone: Timezone): IEvent[] => events
  .map((e: IEvent) => ({ ...e, date: moment(e.date).tz(timezone) }));

const CalendarNoData: React.FC = () => <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;

const Calendar: React.FC<CalendarProps> = ({ dataSource }: CalendarProps) => {
  if (!dataSource) return <CalendarNoData />;
  if (!dataSource.length) return <CalendarNoData />;

  const { timezone } = useContext(SettingsContext);
  const parsedDataSource = setTimezoneToEvents(dataSource, timezone);
  console.log(dataSource[0].date, dataSource[1].date, dataSource[2].date, dataSource[3].date);

  const currentDate: moment.Moment = moment().tz(timezone);
  const dates: moment.Moment[] = [...parsedDataSource.map(({ date }) => date), currentDate];

  const getDayData = (date: moment.Moment): IEvent[] => parsedDataSource
    .filter((event) => moment(event.date).isSame(date, 'day'));

  const getMonthData = (date: moment.Moment): IEvent[] => parsedDataSource
    .filter((event) => moment(event.date).isSame(date, 'month'));

  const dateMonthRender = (date: moment.Moment): React.ReactNode => {
    const data = eventsSortByDate(getMonthData(date));
    return data.length
      ? <CalendarMonth data={data} />
      : null;
  };

  const [value, changeValue] = useState<moment.Moment>(currentDate);
  const [selectedValue, changeSelectedValue] = useState<moment.Moment>(moment(new Date()));

  const onSelect = (newValue: moment.Moment): void => {
    changeValue(newValue);
    changeSelectedValue(newValue);
  };

  const onPanelChange = (newValue: moment.Moment): void => {
    changeValue(newValue);
  };

  type gutterSettings = {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    xxl: number;
  };

  const rowGutterSettings: [gutterSettings, gutterSettings] = [
    {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 20,
    },
    {
      xs: 10,
      sm: 12,
      md: 14,
      lg: 16,
      xl: 18,
      xxl: 20,
    },
  ];

  return (
    <div className="calendar">
      <Row gutter={rowGutterSettings}>
        <Col xs={24} sm={24} md={11} lg={9} xl={7} xxl={5}>
          <div className="calendar__date-picker">
            <AntDCalendar
              validRange={[getBeginDate(dates), getEndDate(dates)]}
              fullscreen={false}
              value={value}
              onSelect={onSelect}
              onPanelChange={onPanelChange}
              monthCellRender={dateMonthRender}
              defaultValue={currentDate}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={13} lg={15} xl={17} xxl={19}>
          <Row gutter={rowGutterSettings}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Row justify="end">
                <Col>
                  <Select defaultValue="1" style={{ width: '100%' }}>
                    <Select.Option value="1">Day</Select.Option>
                    <Select.Option value="3">3 Days</Select.Option>
                    <Select.Option value="7">Week</Select.Option>
                  </Select>
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
                  <Divider>
                    {selectedValue && selectedValue.format('MMMM Do YYYY')}
                  </Divider>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <CalendarDate data={eventsSortByDate(getDayData(value))} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

Calendar.defaultProps = {
  dataSource: [],
};

export default Calendar;
