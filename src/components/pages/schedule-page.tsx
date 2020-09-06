import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

import BackendService from '../../services/backend-service';
import PageLayout from '../page-layout';
import Calendar from '../calendar';
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
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    backendService.getAllEvents()
      .then((data) => {
        setLoading(false);
        setTableData([...data]);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <PageLayout loading={loading} title="Schedule">
      <Table dataSource={tableData} columns={columns} pagination={false} style={{ display: 'none' }} />
      <Calendar dataSource={tableData} />
    </PageLayout>
  );
};

export default SchedulePage;
