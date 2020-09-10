import React, { useState } from 'react';
import moment from 'moment';
import {
  Table as AntDTable, Menu, Checkbox, Dropdown, Button,
} from 'antd';
import RenderTag from '../type-task';

import { ITableColumns, IColumnsVisibility } from '../../interfaces/table-interfaces';
import { IEvent } from '../../interfaces/backend-interfaces';

import './table.scss';

type TableProps = {
  dataSource: IEvent[] | undefined;
};

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
  });
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const columns: ITableColumns[] = [
    {
      title: 'Date',
      width: 120,
      dataIndex: 'date',
      key: 'date',
      className: (columnsVisible.date) ? '' : 'hidden',
      render: (value: moment.Moment) => <>{moment(value).format('DD-MM-YYYY')}</>,
    },
    {
      title: 'Time',
      width: 60,
      dataIndex: 'date',
      key: 'time',
      className: (columnsVisible.time) ? '' : 'hidden',
      render: (value: moment.Moment) => <>{moment(value).format('H:mm')}</>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      className: (columnsVisible.type) ? '' : 'hidden',
      render: (value: string) => <RenderTag type={value} />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: (columnsVisible.name) ? '' : 'hidden',
      render: (value: string, record: IEvent) => <a href={record.url} target="_blank" rel="noreferrer">{value}</a>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      className: (columnsVisible.description) ? '' : 'hidden',
    },
    {
      title: 'Place',
      dataIndex: 'place',
      key: 'place',
      className: (columnsVisible.place) ? '' : 'hidden',
    },
    {
      title: 'Comment',
      dataIndex: 'comment',
      key: 'comment',
      className: (columnsVisible.comment) ? '' : 'hidden',
    },
    {
      title: 'Details',
      width: 100,
      key: 'details',
      className: (columnsVisible.details) ? '' : 'hidden',
      render: (record: IEvent) => <a href={`/task-page/${record.id}`}>See more</a>,
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
        // size="small"
        // scroll={{ x: 'max-content' }}
        // scroll={{ x: '100vw' }}
      />
    </>
  );
};

export default Table;
