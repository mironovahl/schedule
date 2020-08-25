import React from 'react';

import { Table } from 'antd';
import 'antd/dist/antd.css';

const dataSource = [
  {
    key: '1',
    date: '26.08.2020',
    time: '10:00',
    name: 'Schedule',
  },
];

const columns = [
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

const Schedule = () => (
  <div>
    <Table dataSource={dataSource} columns={columns} pagination={false} />
  </div>
);

export default Schedule;
