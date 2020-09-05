import React from 'react';
import { Tag, List, Popover } from 'antd';
import CalendarEventDescription from '../calendar-event-description';
import * as moment from 'moment';
import { IEvent } from '../../../interfaces/backend-interfaces';

type CalendarMonthProps = {
  data: IEvent[];
};

const CalendarMonth: React.FC<CalendarMonthProps> = ({ data }: CalendarMonthProps) => {
  const renderItem = (event: IEvent): React.ReactNode => {
    const color = "red";
    const content: React.ReactNode = (
      <CalendarEventDescription event={event} />
    );

    return (
      <Popover trigger="click" content={content}>
        <Tag
          color={color}
          style={{ width: '95%', overflow: 'hidden', textOverflow: 'ellipsis' }}
        >
          {`${moment(event.date).format('MMMM Do, h:mm')} ${event.name}`}
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

export default CalendarMonth;
