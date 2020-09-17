import React, { useState, useContext } from 'react';
import {
  Calendar as AntDCalendar,
  Empty,
  Row,
  Col,
  Divider,
  Tag,
} from 'antd';
import * as moment from 'moment';
import * as momentTz from 'moment-timezone';
import CalendarDate from './calendar-date';
import { IEvent } from '../../interfaces/backend-interfaces';
import SettingsContext from '../../context/settings-context';
import * as DateService from '../../services/date-service';

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

  const { timezone, taskSettings } = useContext(SettingsContext);
  const dataSourceWithTimezone = dataSource
    .map((event: IEvent) => ({
      ...event,
      startDate: momentTz(event.startDate).tz(timezone),
      endDate: momentTz(event.endDate).tz(timezone),
    }));

  const currentDate: moment.Moment = momentTz.tz(timezone);
  const dates: moment.Moment[] = [...dataSourceWithTimezone
    .map(({ startDate }) => startDate), currentDate];
  const [currentType, changeCurrentType] = useState<string>('month');

  const getDayData = (date: moment.Moment): IEvent[] => dataSourceWithTimezone
    .filter((event) => moment(event.startDate).isSame(date, 'day'));
  const getMonthData = (date: moment.Moment): IEvent[] => dataSourceWithTimezone
    .filter((event) => moment(event.startDate).isSame(date, 'month'));

  const [value, changeValue] = useState<moment.Moment>(currentDate);
  const [selectedValue, changeSelectedValue] = useState<moment.Moment>(moment(new Date()));

  const onSelect = (newValue: moment.Moment): void => {
    changeValue(newValue);
    changeSelectedValue(newValue);
  };

  const onPanelChange = (newValue: moment.Moment, type: string): void => {
    changeValue(newValue);
    changeCurrentType(type);
  };

  const calendarCellRender = (date: moment.Moment): React.ReactNode => {
    const eventsTypes: string[] = eventsSortByDate(getDayData(date)).map(({ type }) => type);
    const backgroundColor: string = eventsTypes.length
      ? taskSettings[eventsTypes[0]].color
      : '';
    const border: string = date.isSame(value, 'day') ? '1px solid #1890ff' : 'none';

    const cellStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    };

    const tagStyle = {
      minWidth: '65%',
      border,
      height: '100%',
    };

    return (
      <div style={cellStyle}>
        {backgroundColor !== ''
          ? (
            <Tag
              color={backgroundColor}
              style={{
                ...tagStyle, margin: '0px',
              }}
            >
              {date.date()}
            </Tag>
          )
          : (
            <div
              style={{
                ...tagStyle,
                borderRadius: '2px',
                maxHeight: '22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {date.date()}
            </div>
          )}
      </div>
    );
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
              defaultValue={currentDate}
              dateFullCellRender={calendarCellRender}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={13} lg={15} xl={17} xxl={19}>
          <Row gutter={rowGutterSettings}>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <Divider>
                {currentType === 'month'
                  ? (selectedValue && DateService.getFullDate(selectedValue))
                  : (selectedValue && selectedValue.format('MMMM YYYY'))}
              </Divider>
            </Col>
            <Col xs={24} sm={24} md={24} lg={24} xl={24} xxl={24}>
              <CalendarDate data={currentType === 'month'
                ? eventsSortByDate(getDayData(value))
                : eventsSortByDate(getMonthData(value))}
              />
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
