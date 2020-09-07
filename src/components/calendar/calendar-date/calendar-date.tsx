import React from 'react';
import { Card, List, Popover } from 'antd';
import * as moment from 'moment';
import CalendarEventDescription from '../calendar-event-description';
import { IEvent } from '../../../interfaces/backend-interfaces';

type CalendarDateProps = {
  data: IEvent[];
  date: moment.Moment;
};

// enum EventTypeColor {
//   deadline = 'red',
//   test = '#63ab91',
//   jstask = 'green',
//   htmltask = 'green',
//   selfeducation = 'green',
//   externaltask = 'green',
//   codewars = 'green',
//   codejam = 'green',
//   newtask = 'green',
//   lecture = 'blue',
//   /* eslint-disable camelcase */
//   lecture_online = 'blue',
//   lecture_offline = 'blue',
//   lecture_mixed = 'blue',
//   lecture_self_study = 'blue',
//   /* eslint-enable camelcase */
//   info = '#ff7b00',
//   warmup = '#63ab91',
//   meetup = '#bde04a',
//   workshop = '#bde04a',
//   interview = '#63ab91',
// }


const CalendarDate: React.FC<CalendarDateProps> = ({ data, date }: CalendarDateProps) => {
  const renderItem = (event: IEvent): React.ReactNode => {
    const content: React.ReactNode = (
      <CalendarEventDescription event={event} />
    );

    return (
      <Popover trigger="click" content={content}>
        <Card
          title={event.type}
          style={{ width: '100%', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          <p>
            {`${moment(event.date).format('H:mm')} ${event.name}`}
          </p>
        </Card>
      </Popover>
    );
  };

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
