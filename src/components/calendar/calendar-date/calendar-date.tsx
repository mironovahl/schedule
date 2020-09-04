import React from 'react';
import { Tag, List } from 'antd';
import * as moment from 'moment';
import { IEvent } from '../../../interfaces/backend-interfaces';

type CalendarDateProps = {
  data: IEvent[];
};

enum EventTypeColor {
  deadline = 'red',
  test = '#63ab91',
  jstask = 'green',
  htmltask = 'green',
  selfeducation = 'green',
  externaltask = 'green',
  codewars = 'green',
  codejam = 'green',
  newtask = 'green',
  lecture = 'blue',
  /* eslint-disable camelcase */
  lecture_online = 'blue',
  lecture_offline = 'blue',
  lecture_mixed = 'blue',
  lecture_self_study = 'blue',
  /* eslint-enable camelcase */
  info = '#ff7b00',
  warmup = '#63ab91',
  meetup = '#bde04a',
  workshop = '#bde04a',
  interview = '#63ab91',
}

const CalendarDate: React.FC<CalendarDateProps> = ({ data }: CalendarDateProps) => {
  const dateContent: React.ReactNode = data.length
    ? (
      <List
        size="small"
        dataSource={data}
        renderItem={(event: IEvent) => {
          const color = EventTypeColor.deadline;
          return (
            <Tag
              color={color}
              style={{ width: '95%', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {`${moment(event.date).format('h:mm')} ${event.name}`}
            </Tag>
          );
        }}
      />
    )
    : null;

  return (
    <div className="calendar__date">
      {dateContent}
    </div>
  );
};

export default CalendarDate;
