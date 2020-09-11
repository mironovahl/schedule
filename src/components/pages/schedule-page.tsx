import React, { useState, useEffect, useContext } from 'react';

import { Divider } from 'antd';
import BackendService from '../../services/backend-service';
import PageLayout from '../page-layout';
import Table from '../table';
import Calendar from '../calendar';
import { IEvent } from '../../interfaces/backend-interfaces';
import SettingsBar from '../settings-bar';
import * as SettingsInterfaces from '../../interfaces/settings-interfaces';
import SettingsContext from '../../context/settings-context';

const SchedulePage: React.FC = () => {
  const backendService = new BackendService();
  const [tableData, setTableData] = useState<IEvent[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const {
    scheduleView,
    timezone,
    taskSettings,
    changeContext,
  } = useContext(SettingsContext);

  const handleChangeView = (value: SettingsInterfaces.ScheduleView): void => {
    changeContext({ scheduleView: value });
  };

  const handleChangeTimezone = (value: SettingsInterfaces.Timezone): void => {
    changeContext({ timezone: value });
  };

  const changeTaskSettings = (value: SettingsInterfaces.TaskSettings): void => {
    changeContext({ taskSettings: value });
  };

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
    list: <div>тут будет список</div>,
    calendar: <Calendar dataSource={tableData} />,
  };

  return (
    <PageLayout loading={loading} title="Schedule">
      <SettingsBar
        view={scheduleView}
        onViewChange={handleChangeView}
        timezone={timezone}
        onTimezoneChange={handleChangeTimezone}
        tasksSettings={taskSettings}
        onTasksSettingsChange={changeTaskSettings}
      />
      <Divider />
      {viewMapping[scheduleView]}
    </PageLayout>
  );
};

export default SchedulePage;
