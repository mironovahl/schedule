import React, { useState, useEffect } from 'react';

import BackendService from '../../services/backend-service';
import PageLayout from '../page-layout';
import Table from '../table';
import { IEvent } from '../../interfaces/backend-interfaces';
import Settings from '../../services/settings-service';
import SettingsBar from '../settings-bar';
import * as SettingsInterfaces from '../../interfaces/settings-interfaces';

const SchedulePage: React.FC = () => {
  const backendService = new BackendService();
  const [tableData, setTableData] = useState<IEvent[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [view, changeView] = useState<SettingsInterfaces.ScheduleView>(Settings.getScheduleView());
  const [
    timezone,
    changeTimezone,
  ] = useState<SettingsInterfaces.Timezone>(Settings.getTimezone());
  const [
    tasksSettings,
    changeTasksSettings,
  ] = useState<SettingsInterfaces.ITaskSettings>(Settings.getTasksSettings());

  const handleChangeView = (value: SettingsInterfaces.ScheduleView): void => {
    changeView(value);
    Settings.setScheduleView(value);
  };

  const handleChangeTimezone = (value: SettingsInterfaces.Timezone): void => {
    changeTimezone(value);
    Settings.setTimezone(value);
  };

  const changeTaskColor = (
    taskType: keyof SettingsInterfaces.ITaskSettings,
    color: string,
  ): void => {
    const newTaskColors: SettingsInterfaces.ITaskColors = {
      ...tasksSettings[taskType],
      color,
    };
    const newTaskSettings: SettingsInterfaces.ITaskSettings = {
      ...tasksSettings,
      [taskType]: newTaskColors,
    };

    changeTasksSettings(newTaskSettings);
    Settings.setTaskSettings(newTaskSettings);
  };

  console.log(
    Settings.getAllSettings(),
    changeTaskColor,
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
    table: <Table dataSource={tableData} />,
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
