import React from 'react';
import { Table } from 'antd';

import { ITableData, ITableColumns } from '../../interfaces/table-interfaces';

const dataSource: ITableData[] = [
  {
    key: '1',
    date: '26.08.2020',
    time: '10:00',
    name: 'Schedule',
  },
];

const columns: ITableColumns[] = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

const SchedulePage: React.FC = () => (
  <Table dataSource={dataSource} columns={columns} pagination={false} />
);

export default SchedulePage;
