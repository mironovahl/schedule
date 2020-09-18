// import React, { useState, useContext } from 'react';
import React, { useState } from 'react';
import moment from 'moment';
import {
  Table as AntDTable, Menu, Checkbox, Dropdown, Button, Tooltip,
} from 'antd';
// import { getTime } from '../../services/date-service';
import RenderTag from '../type-task';

import { ITableColumns, IColumnsVisibility } from '../../interfaces/table-interfaces';
import { IEvent } from '../../interfaces/backend-interfaces';

// import SettingsContext from '../../context/settings-context';
import './table.scss';

type TableProps = {
  dataSource: IEvent[] | undefined;
};

// const { user } = useContext(SettingsContext);

const Table: React.FC<TableProps> = ({ dataSource }: TableProps) => {
  const [columnsVisible, setColumnsVisible] = useState<IColumnsVisibility>({
    date: true,
    time: true,
    type: true,
    name: true,
    description: true,
    url: true,
    place: true,
    comment: true,
    details: true,
    done: true,
  });
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const columns: ITableColumns[] = [
    {
      title: 'Done',
      width: 60,
      key: 'done',
      render: () => (<Checkbox />),
      className: (columnsVisible.done) ? '' : 'hidden',
    },
    {
      title: 'Date',
      width: 90,
      dataIndex: 'date',
      key: 'date',
      className: (columnsVisible.date) ? '' : 'hidden',
      render: (value: moment.Moment) => <>{ moment(value).format('DD-MM-YYYY')}</>,
    },
    {
      title: 'Time',
      width: 70,
      dataIndex: 'date',
      key: 'time',
      className: (columnsVisible.time) ? '' : 'hidden',
      // render: (value: moment.Moment) => <>{ getTime(value)}</>,
      render: (value: moment.Moment) => <>{moment(value).format('H:mm')}</>,
    },
    {
      title: 'Type',
      width: 100,
      dataIndex: 'type',
      key: 'type',
      className: (columnsVisible.type) ? '' : 'hidden',
      render: (value: string) => <RenderTag type={value} />,
    },
    {
      title: 'Name',
      width: 200,
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: false,
      },
      className: (columnsVisible.name) ? '' : 'hidden',
      render: (value: string, record: IEvent) => <a href={record.url} target="_blank" rel="noreferrer">{value}</a>,
    },
    {
      title: 'Place',
      width: 200,
      dataIndex: 'place',
      key: 'place',
      ellipsis: {
        showTitle: false,
      },
      className: (columnsVisible.place) ? '' : 'hidden',
    },
    {
      title: 'Description',
      width: 200,
      dataIndex: 'description',
      key: 'description',
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
      className: (columnsVisible.description) ? '' : 'hidden',
    },
    {
      title: 'Details Url',
      width: 85,
      key: 'details',
      className: (columnsVisible.details) ? '' : 'hidden',
      // fixed: 'right',
      render: (record: IEvent) => <a href={`/task-page/${record.id}`}>See more</a>,
    },
    {
      title: 'Comment',
      width: 200,
      dataIndex: 'comment',
      key: 'comment',
      ellipsis: {
        showTitle: false,
      },
      render: (comment) => (
        <Tooltip placement="topLeft" title={comment}>
          {comment}
        </Tooltip>
      ),
      className: (columnsVisible.comment) ? '' : 'hidden',
    },
  ];

  const onCheckboxChange = (e: any) => {
    setColumnsVisible({
      ...columnsVisible,
      [e.target.id]: e.target.checked,
    });
  };

  const handleVisibleChange = (flag: boolean) => {
    setMenuVisible(flag);
  };

  const menu: JSX.Element = (
    <Menu>
      <Menu.ItemGroup>
        {columns.map((column) => (
          <Menu.Item key={column.key}>
            <Checkbox
              id={column.key}
              defaultChecked
              onChange={onCheckboxChange}
            >
              {column.title}
            </Checkbox>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );

  return (
    <>
      <Dropdown
        overlay={menu}
        onVisibleChange={handleVisibleChange}
        visible={menuVisible}
      >
        <Button style={{ marginBottom: 15 }}>Show/Hide columns</Button>
      </Dropdown>

      <AntDTable
        dataSource={dataSource}
        columns={columns}
        pagination={false}
        size="small"
        scroll={{ x: 'max-content' }}
      />
    </>
  );
};

export default Table;
