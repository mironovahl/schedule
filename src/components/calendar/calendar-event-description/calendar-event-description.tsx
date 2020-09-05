import React from 'react';
import { Descriptions } from 'antd';
import * as moment from 'moment';
import { IEvent } from '../../../interfaces/backend-interfaces';

type CalendarEventDescriptionProps = {
  event: IEvent;
};

const CalendarEventDescription: React.FC<CalendarEventDescriptionProps> = ({ event }: CalendarEventDescriptionProps) => (
  <Descriptions title={event.name} size="small" bordered column={{ xxl: 2, xl: 2, lg: 2, md: 1, sm: 1, xs: 1 }} layout="vertical">
    <Descriptions.Item label="Type">
      {event.type}
    </Descriptions.Item>
    <Descriptions.Item label="Date">
      {moment(event.date).format('MMMM Do YYYY, h:mm')}
    </Descriptions.Item>
    <Descriptions.Item label="Description" span={2}>
      {event.description}
    </Descriptions.Item>
    <Descriptions.Item label="Url">
      <a href={event.url} target="_blank">{event.url}</a>
    </Descriptions.Item>
    <Descriptions.Item label="Place">
      {event.place}
    </Descriptions.Item>
    <Descriptions.Item label="Comment" span={2}>
      {event.comment}
    </Descriptions.Item>
  </Descriptions>
);

export default CalendarEventDescription;
