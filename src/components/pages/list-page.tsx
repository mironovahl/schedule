import React, { useContext, useEffect, useState } from 'react';

import {
  List,
  Checkbox,
  Empty,
  Col,
  Row,
  Button,
  Tag,
  Popover,
} from 'antd';
import { EyeInvisibleOutlined } from '@ant-design/icons';
import moment from 'moment';
import { eventsSortByDate, getDeadline, isDeadlinePassed } from '../../services/date-service';
import RenderTag from '../type-task';
import DownloadTasksButton from '../download-tasks';
import { IEvent, IOrganizer } from '../../interfaces/backend-interfaces';
import SettingsContext from '../../context/settings-context';
import './list-page.scss';

type ListProps = {
  dataSource: IEvent[] | undefined;
  organizers: IOrganizer[] | undefined;
};

// eslint-disable-next-line sonarjs/cognitive-complexity
const ListPage: React.FC<ListProps> = ({ dataSource, organizers }: ListProps) => {
  if (!dataSource) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  if (!organizers) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  const { completedTask, hiddenRows, changeContext } = useContext(SettingsContext);
  const [activeRows, changeActiveRows] = useState<string[]>([]);
  const formatData = 'DD-MM-YYYY, h:mm';

  const onChange = (e: { target: any; }) => {
    if (e.target.checked) {
      changeContext({ completedTask: [...completedTask, e.target.id] });
    } else {
      changeContext({ completedTask: completedTask.filter((id) => id !== e.target.id) });
    }
  };

  let isShiftActive: boolean = false;
  const handleShiftDown = (e: any): void => {
    if (e.key === 'Shift') {
      isShiftActive = true;
    }
  };
  const handleShiftUp = (e: any): void => {
    if (e.key === 'Shift') {
      isShiftActive = false;
    }
  };

  useEffect(() => {
    window.addEventListener('keyup', handleShiftUp);
    window.addEventListener('keydown', handleShiftDown);
  });

  const handleClick = (e: { currentTarget: any; target: any; }) => {
    if (e.target.type !== 'checkbox') {
      if (isShiftActive) {
        if (activeRows.includes(e.currentTarget.id)) {
          changeActiveRows(activeRows.filter((id) => id !== e.currentTarget.id));
        } else {
          changeActiveRows([...activeRows, e.currentTarget.id]);
        }
      } else {
        changeActiveRows([e.currentTarget.id]);
      }
    }
  };

  const onHideClick = () => {
    changeContext({ hiddenRows: [...hiddenRows, ...activeRows] });
    changeActiveRows([]);
  };
  const onShowClick = () => {
    changeActiveRows(hiddenRows);
    changeContext({ hiddenRows: [] });
  };

  const listClassName = (item: any): string => {
    const classnames = ['list-item'];
    if (activeRows.includes(item.id)) {
      classnames.push('list-item_active');
    }
    if (completedTask.includes(item.id)) {
      classnames.push('list-item_done');
    }
    if (isDeadlinePassed(item.endDate)) {
      classnames.push('list-item_passed');
    }
    return classnames.join(' ');
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
            className={listClassName(item)}
            key={item.id}
            onClick={handleClick}
          >
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
              description={moment(item.startDate).format(formatData)}
              className={window.innerWidth >= 414 ? '' : 'hidden'}
            />
            <List.Item.Meta
              description={<Tag color="red">{getDeadline(item.endDate)}</Tag>}
              className={window.innerWidth >= 414 ? '' : 'hidden'}
            />
            <List.Item.Meta
              title="Deadline"
              description={moment(item.endDate).format(formatData)}
              className={window.innerWidth >= 414 ? '' : 'hidden'}
            />
            <List.Item.Meta
              description={(
                <Popover
                  content={organizers.find((organizer) => item.organizerID === organizer.id)!.name}
                  className="list-item__organizer"
                >
                  <div>
                    <a
                      href={organizers.find((organizer) => item.organizerID === organizer.id)!
                        .github}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <div className="list-item__github-icon" />
                    </a>
                  </div>
                </Popover>

              )}
              className={window.innerWidth >= 414 ? '' : 'hidden'}
            />
            <List.Item.Meta
              description={<a href={`/task-page/${item.id}`} key="list-item__load-more">See more</a>}
            />
            <Checkbox
              onChange={onChange}
              checked={completedTask.includes(item.id)}
              id={item.id}
              className="list-item__checkbox"
            >
              Done
            </Checkbox>
          </List.Item>
        )}
      />
    </>
  );
};

export default ListPage;
