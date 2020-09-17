import React from 'react';
import { Descriptions } from 'antd';
import { IEvent } from '../../../interfaces/backend-interfaces';
import RenderTag from '../../type-task';
import * as DateService from '../../../services/date-service';

type CalendarEventDescriptionProps = {
  event: IEvent;
};

const CalendarEventDescription: React.FC<CalendarEventDescriptionProps> = ({
  event,
}: CalendarEventDescriptionProps) => (
  <Descriptions
    title={event.name}
    size="small"
    bordered
    column={{
      xxl: 2,
      xl: 2,
      lg: 2,
      md: 1,
      sm: 1,
      xs: 1,
    }}
  >
    <Descriptions.Item label="Type">
      <RenderTag type={event.type} />
    </Descriptions.Item>
    <Descriptions.Item label="Description">
      {event.description}
    </Descriptions.Item>
    <Descriptions.Item label="Date">{DateService.getFullDate(event.startDate)}</Descriptions.Item>
    <Descriptions.Item label="Time">{DateService.getTime(event.startDate)}</Descriptions.Item>
    <Descriptions.Item label="Url">
      <a href={event.url} target="_blank" rel="noreferrer">
        {event.url}
      </a>
    </Descriptions.Item>
    <Descriptions.Item label="Place">{event.place}</Descriptions.Item>
    <Descriptions.Item
      label="Comment"
      span={2}
    >
      {event.comment}
    </Descriptions.Item>
    <Descriptions.Item label="More info">
      <a href={`/task-page/${event.id}`} target="_blank" rel="noreferrer">
        Details
      </a>
    </Descriptions.Item>
  </Descriptions>
);

export default CalendarEventDescription;
