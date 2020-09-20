import React, { useContext } from 'react';

import {
  List, Checkbox, Button, Empty,
} from 'antd';
// import { saveToCSV, saveToTXT } from 'src/services/saving-service.ts';
import moment from 'moment';
import { eventsSortByDate } from '../../services/date-service';
import RenderTag from '../type-task';
import { IEvent } from '../../interfaces/backend-interfaces';
import SettingsContext from '../../context/settings-context';
import './list-page.scss';

type ListProps = {
  dataSource: IEvent[] | undefined;
};

const ListPage: React.FC<ListProps> = ({ dataSource }: ListProps) => {
  if (!dataSource) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  const { completedTask, changeContext } = useContext(SettingsContext);
  const selected: any[] = [];

  const onChange = (e: { target: any; }) => {
    if (e.target.checked) {
      selected.push(e.target.id);
      changeContext({ completedTask: [...completedTask, e.target.id] });
    } else {
      selected.splice(selected.indexOf(e.target.id), 1);
      changeContext({ completedTask: completedTask.filter((id) => id !== e.target.id) });
    }
  };

  const hideElement = () => {
    const hidden = dataSource?.filter((i) => selected.includes(i.id))
    .concat(selected.filter((i: IEvent) => dataSource.includes(i)));
    changeContext({ hiddenRows: hidden });
  };

  return (
    <List
      header={(
        <>
          <Button type="primary" onClick={hideElement}>Hide</Button>
          <Button type="primary" ghost>Hidden Rows</Button>
        </>
      )}
      pagination={{
        pageSize: 5,
      }}
      itemLayout="horizontal"
      dataSource={eventsSortByDate(dataSource)}
      renderItem={(item) => (
        <List.Item
          id={item.id}
          className={completedTask.includes(item.id) ? 'list-item done' : 'list-item'}
          key={item.id}
          actions={[<a href={`/task-page/${item.id}`} key="list-item__load-more">See more</a>]}
        >
          <Checkbox
            onChange={onChange}
            checked={completedTask.includes(item.id)}
            id={item.id}
            style={{ margin: 10 }}
          />
          <List.Item.Meta
            title={item.name}
            description={<RenderTag type={item.type} />}
          />
          <List.Item.Meta
            description={(
              <a
                href={item.url}
                rel="noreferrer"
                target="_blank"
              >
                Link
              </a>
            )}
            className="list-item__description"
          />
          <List.Item.Meta
            title={moment(item.startDate).format('DD-MM-YYYY')}
            description={moment(item.startDate).format('h:mm')}
          />
          <List.Item.Meta
            title={moment(item.endDate).format('DD-MM-YYYY')}
            description={moment(item.endDate).format('h:mm')}
          />
        </List.Item>
      )}
    />
  );
};

export default ListPage;
