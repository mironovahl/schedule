import React from 'react';
import { Card, List, Popover } from 'antd';
import * as moment from 'moment';
import CalendarEventDescription from '../calendar-event-description';
import { IEvent } from '../../../interfaces/backend-interfaces';

type CalendarDateProps = {
  data: IEvent[];
};

const CalendarDate: React.FC<CalendarDateProps> = ({ data }: CalendarDateProps) => {
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
