import React, { useState, useEffect } from 'react';
import {
  Table, Menu, Checkbox, Dropdown, Button,
} from 'antd';

import BackendService from '../../services/backend-service';
import PageLayout from '../page-layout';
import { ITableColumns, IColumnsVisibility } from '../../interfaces/table-interfaces';
import { IEvent } from '../../interfaces/backend-interfaces';

import './schedule-page.scss';

const SchedulePage: React.FC = () => {
  const backendService = new BackendService();
  const [tableData, setTableData] = useState<IEvent[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [columnsVisible, setColumnsVisible] = useState<IColumnsVisibility>({
    date: true,
    type: true,
    name: true,
    description: true,
    url: true,
    place: true,
    comment: true,
  });
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const columns: ITableColumns[] = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      className: (columnsVisible.date) ? '' : 'hidden',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      className: (columnsVisible.type) ? '' : 'hidden',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      className: (columnsVisible.name) ? '' : 'hidden',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
      className: (columnsVisible.description) ? '' : 'hidden',
    },
    {
      title: 'URL',
      dataIndex: 'url',
      key: 'url',
      className: (columnsVisible.url) ? '' : 'hidden',
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
  ];

  useEffect(() => {
    setLoading(true);
    backendService.getAllEvents()
      .then((data) => {
        setLoading(false);
        setTableData([...data]);
      })
      .catch(() => setLoading(false));
  }, []);

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
    <PageLayout loading={loading} title="Schedule">

      <Dropdown
        overlay={menu}
        onVisibleChange={handleVisibleChange}
        visible={menuVisible}
      >
        <Button style={{ marginBottom: 15 }}>Show/Hide columns</Button>
      </Dropdown>

      <Table dataSource={tableData} columns={columns} pagination={false} />

    </PageLayout>
  );
};

export default SchedulePage;
