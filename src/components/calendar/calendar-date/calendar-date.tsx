import React from 'react';
import { Tag, List, Popover } from 'antd';
import CalendarEventDescription from '../calendar-event-description';
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
  const renderItem = (event: IEvent): React.ReactNode => {
    const color = EventTypeColor.deadline;
    const content: React.ReactNode = (
      <CalendarEventDescription event={event} />
    );

    return (
      <Popover trigger="click" content={content}>
        <Tag
          color={color}
          style={{ width: '95%', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {`${moment(event.date).format('h:mm')} ${event.name}`}
        </Tag>
      </Popover>
    );
  }

  return (
    <div className="calendar__date">
      {data.length
        ? (
            <List
              size="small"
              dataSource={data}
              renderItem={renderItem}
            />
        )
        : null}
    </div>
  );
};

export default CalendarDate;
