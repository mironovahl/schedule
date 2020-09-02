import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

import BackendService from '../../services/backend-service';

import { ITableColumns } from '../../interfaces/table-interfaces';
import { IEvent } from '../../interfaces/backend-interfaces';

const columns: ITableColumns[] = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Description',
    dataIndex: 'description',
    key: 'description',
  },
  {
    title: 'URL',
    dataIndex: 'url',
    key: 'url',
  },
  {
    title: 'Place',
    dataIndex: 'place',
    key: 'place',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
    key: 'comment',
  },
];

const SchedulePage: React.FC = () => {
  const backendService = new BackendService();
  const [tableData, setTableData] = useState<IEvent[]>();

  useEffect(() => {
    backendService.getAllEvents().then((data) => setTableData([...data]));
  });

  return (
    <Table dataSource={tableData} columns={columns} pagination={false} />
  );
};

export default SchedulePage;
