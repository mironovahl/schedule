import React, { useState, useEffect } from 'react';
import { Table } from 'antd';

import BackendService from '../../services/backend-service';
import PageLayout from '../page-layout';
import { ITableColumns } from '../../interfaces/table-interfaces';
import { IEvent } from '../../interfaces/backend-interfaces';
import Settings from '../../services/settings-service';
import SettingsBar from '../settings-bar';
import * as SettingsInterfaces from '../../interfaces/settings-interfaces';

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
  const [view, changeView] = useState<SettingsInterfaces.ScheduleView>(Settings.getScheduleView());
  const [
    timezone,
    changeTimezone,
  ] = useState<SettingsInterfaces.Timezone>(Settings.getTimezone());

  const handleChangeView = (value: SettingsInterfaces.ScheduleView): void => {
    changeView(value);
    Settings.setScheduleView(value);
  };

  const handleChangeTimezone = (value: SettingsInterfaces.Timezone): void => {
    changeTimezone(value);
    Settings.setTimezone(value);
  };

  console.log(
    Settings.getScheduleView(),
    Settings.getTaskColor('externaltask'),
    Settings.getTaskFontColor('deadline'),
    Settings.getTimezone(),
  );

  useEffect(() => {
    setLoading(true);
    backendService.getAllEvents()
      .then((data) => {
        setLoading(false);
        setTableData([...data]);
      })
      .catch(() => setLoading(false));
  }, []);

  const viewMapping = {
    table: <Table dataSource={tableData} columns={columns} pagination={false} />,
    list: <div>Тут будет список</div>,
    calendar: <div>Тут будет календарь</div>,
  };

  return (
    <PageLayout loading={loading} title="Schedule">
      <SettingsBar
        view={view}
        onViewChange={handleChangeView}
        timezone={timezone}
        onTimezoneChange={handleChangeTimezone}
      />
      {viewMapping[view]}
    </PageLayout>
  );
};

export default SchedulePage;
