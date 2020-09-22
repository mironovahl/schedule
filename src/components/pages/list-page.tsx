import React, { useContext } from 'react';

import { List, Checkbox, Button } from 'antd';
import { EyeInvisibleOutlined } from '@ant-design/icons';

import moment from 'moment';
import RenderTag from '../type-task';
import { IEvent } from '../../interfaces/backend-interfaces';
import SettingsContext from '../../context/settings-context';
import './list-page.scss';

type ListProps = {
  dataSource: IEvent[] | undefined;
};

const ListPage: React.FC<ListProps> = ({ dataSource }: ListProps) => {
  const { changeContext } = useContext(SettingsContext);
  const selected: any[] = [];

  const onChange = (e: { target: any; }) => {
    if (e.target.checked) {
      selected.push(e.target.id);
    } else {
      selected.splice(selected.indexOf(e.target.id), 1);
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
          <Button type="primary" style={{ margin: '0 10px 0 0' }} ghost>Show hidden Rows</Button>
          <Button type="dashed" onClick={hideElement}>
            <EyeInvisibleOutlined />
            Hide rows
          </Button>
        </>
      )}
      pagination={{
        pageSize: 5,
      }}
      itemLayout="horizontal"
      dataSource={dataSource}
      renderItem={(item) => (
        <List.Item
          id={item.id}
          className="list-item"
          key={item.id}
          actions={[<a href={`/task-page/${item.id}`} key="list-item__load-more">See more</a>]}
        >
          <Checkbox
            onChange={onChange}
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
            title={moment(item.date).format('DD-MM-YYYY')}
            description={moment(item.date).format('h:mm')}
          />
        </List.Item>
      )}
    />
  );
};

export default ListPage;
