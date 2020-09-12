import React from 'react';
import { List, Collapse } from 'antd';
import CalendarEventDescription from '../calendar-event-description';
import { IEvent } from '../../../interfaces/backend-interfaces';

type CalendarDateProps = {
  data: IEvent[];
};

const { Panel } = Collapse;

const CalendarDate: React.FC<CalendarDateProps> = ({ data }: CalendarDateProps) => {
  const renderItem = (event: IEvent): React.ReactNode => (

    <Collapse accordion>
      <Panel header={event.name} key={event.id}>
        <CalendarEventDescription event={event} />
      </Panel>
    </Collapse>
  );
  return (
    <div className="calendar__date">
      {data.length ? <List size="small" dataSource={data} renderItem={renderItem} /> : null}
    </div>
  );
};

export default CalendarDate;
