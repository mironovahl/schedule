import React, { useState, useEffect } from 'react';

import { Divider } from 'antd';
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
    Settings.setScheduleView(value);
    changeView(value);
  };

  const handleChangeTimezone = (value: SettingsInterfaces.Timezone): void => {
    Settings.setTimezone(value);
    changeTimezone(value);
  };

  const changeTaskColor = (value: SettingsInterfaces.ITaskSettings): void => {
    Settings.setTaskSettings(value);
    changeTasksSettings(value);
  };

  console.log(
    Settings.getAllSettings(),
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

  const ThemeContext = React.createContext({
    timezone: Settings.getTimezone(),
    tasksSettings: Settings.getTasksSettings(),
  });

  return (
    <ThemeContext.Provider value={{ timezone, tasksSettings }}>
      <PageLayout loading={loading} title="Schedule">
        <SettingsBar
          view={view}
          onViewChange={handleChangeView}
          timezone={timezone}
          onTimezoneChange={handleChangeTimezone}
          tasksSettings={tasksSettings}
          onTasksSettingsChange={changeTaskColor}
        />
        <Divider />
        {viewMapping[view]}
      </PageLayout>
    </ThemeContext.Provider>
  );
};

export default SchedulePage;
