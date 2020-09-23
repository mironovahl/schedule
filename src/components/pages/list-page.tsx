import React, { useContext, useState } from 'react';

import {
  List,
  Checkbox,
  Empty,
  Col,
  Row,
  Button,
  Tag,
} from 'antd';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { eventsSortByDate, getDeadline } from '../../services/date-service';
import RenderTag from '../type-task';
import DownloadTasksButton from '../download-tasks';
import { IEvent } from '../../interfaces/backend-interfaces';
import SettingsContext from '../../context/settings-context';
import './list-page.scss';

type ListProps = {
  dataSource: IEvent[] | undefined;
};

const ListPage: React.FC<ListProps> = ({ dataSource }: ListProps) => {
  if (!dataSource) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  const { completedTask, hiddenRows, changeContext } = useContext(SettingsContext);
  const [activeRows, changeActiveRows] = useState<string[]>([]);
  // const selected: any[] = [];

  const onChange = (e: { target: any; }) => {
    if (e.target.checked) {
      changeActiveRows([...activeRows, e.target.id]);
    } else {
      changeActiveRows(activeRows.filter((id) => id !== e.target.id));
      changeContext({ completedTask: completedTask.filter((id) => id !== e.target.id) });
    }
  };

  const onDoneClick = () => {
    changeContext({ completedTask: [...completedTask, ...activeRows] });
  };

  const onHideClick = () => {
    changeContext({ hiddenRows: [...hiddenRows, ...activeRows] });
    changeActiveRows([]);
  };
  const onShowClick = () => {
    changeActiveRows(hiddenRows);
    changeContext({ hiddenRows: [] });
  };

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Button style={{ margin: '0 10px 0 0' }} disabled={hiddenRows.length < 1} onClick={onShowClick}>
            Show hidden rows
          </Button>
          <Button style={{ margin: '0 10px 0 0' }} type="dashed" disabled={activeRows.length < 1} onClick={onHideClick}>
            <EyeInvisibleOutlined />
            Hide rows
          </Button>
          <DownloadTasksButton data={dataSource} />
        </Col>
        <Col>
          <Button disabled={activeRows.length < 1} onClick={onDoneClick}>Done</Button>
        </Col>
      </Row>

      <List
        pagination={{
          pageSize: 5,
        }}
        itemLayout="horizontal"
        dataSource={eventsSortByDate(dataSource).filter(({ id }) => !hiddenRows.includes(id))}
        renderItem={(item) => (
          <List.Item
            id={item.id}
            className={completedTask.includes(item.id) ? 'list-item done' : 'list-item'}
            key={item.id}
            actions={[<a href={`/task-page/${item.id}`} key="list-item__load-more">See more</a>]}
          >
            <Checkbox
              onChange={onChange}
              checked={activeRows.includes(item.id)}
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
                  Ссылка на задание
                </a>
            )}
              className={window.innerWidth >= 414 ? '' : 'hidden'}
            />
            <List.Item.Meta
              title="Выдача таска"
              description={moment(item.startDate).format('DD-MM-YYYY, h:mm')}
            />
            <List.Item.Meta
              description={<Tag color="red">{getDeadline(item.endDate)}</Tag>}
              className={window.innerWidth >= 414 ? '' : 'hidden'}
            />
            <List.Item.Meta
              title="Deadline"
              description={moment(item.endDate).format('DD-MM-YYYY, h:mm')}
              className={window.innerWidth >= 414 ? '' : 'hidden'}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListPage;
