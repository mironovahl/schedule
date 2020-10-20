import React, { useState, useEffect, useContext } from 'react';
import { Divider } from 'antd';
import BackendService from '../../services/backend-service';
import PageLayout from '../page-layout';
import Table from '../table';
import Calendar from '../calendar';
import { IEvent, IOrganizer } from '../../interfaces/backend-interfaces';
import SettingsBar from '../settings-bar';
import * as SettingsInterfaces from '../../interfaces/settings-interfaces';
import SettingsContext from '../../context/settings-context';
import MenuBar from '../menu';
import ListPage from './list-page';

const SchedulePage: React.FC = () => {
  const backendService = new BackendService();
  const [tableData, setTableData] = useState<IEvent[]>();
  const [organizersData, setOrganizersData] = useState<IOrganizer[]>();
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
    Promise.all([
      backendService.getAllEvents(),
      backendService.getAllOrganizers(),
    ]).then(([events, organizers]) => {
      setLoading(false);
      setTableData([...events]);
      setOrganizersData(organizers);
    })
      .catch(() => setLoading(false));
  }, []);

  const viewMapping = {
    table: <Table dataSource={tableData} organizers={organizersData} />,
    list: <ListPage dataSource={tableData} organizers={organizersData} />,
    calendar: <Calendar dataSource={tableData} />,
  };

  return (
    <PageLayout loading={loading} title="Schedule">
      <SettingsBar
        timezone={timezone}
        onTimezoneChange={handleChangeTimezone}
        tasksSettings={taskSettings}
        onTasksSettingsChange={changeTaskSettings}
      />
      <Divider />
      <MenuBar view={scheduleView} onViewChange={handleChangeView} />
      {viewMapping[scheduleView]}
    </PageLayout>
  );
};

export default SchedulePage;
