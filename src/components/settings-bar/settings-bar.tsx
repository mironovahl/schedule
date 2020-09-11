import React from 'react';
import {
  Row,
  Col,
  Select,
} from 'antd';
<<<<<<< HEAD
import { ScheduleView, Timezone, TaskSettings } from '../../interfaces/settings-interfaces';
=======
import { ScheduleView, Timezone, ITaskSettings } from '../../interfaces/settings-interfaces';
>>>>>>> develop
import timezones from '../../config/timezones';
import ColorSettings from './color-settings/color-settings';

type SettingsBarProps = {
  view: ScheduleView;
  onViewChange: (value: ScheduleView) => void;
  timezone: Timezone;
  onTimezoneChange: (value: Timezone) => void;
<<<<<<< HEAD
  tasksSettings: TaskSettings;
  onTasksSettingsChange: (value: TaskSettings) => void;
=======
  tasksSettings: ITaskSettings;
  onTasksSettingsChange: (value: ITaskSettings) => void;
>>>>>>> develop
};

const SettingsBar: React.FC<SettingsBarProps> = ({
  view,
  onViewChange,
  timezone,
  onTimezoneChange,
  tasksSettings,
  onTasksSettingsChange,
}: SettingsBarProps) => (
  <div className="settings-bar">
    <Row align="middle" justify="space-between">
      <Col>
        <Select defaultValue={view} onChange={onViewChange}>
          <Select.Option value="table" key={1}>Table</Select.Option>
          <Select.Option value="calendar" key={2}>Calendar</Select.Option>
          <Select.Option value="list" key={3}>List</Select.Option>
        </Select>
        <Select defaultValue={timezone} onChange={onTimezoneChange}>
          {timezones.map((t) => (
            <Select.Option value={t} key={t}>{t}</Select.Option>
          ))}
        </Select>
      </Col>
      <Col>
        <ColorSettings defaultValue={tasksSettings} onChange={onTasksSettingsChange} />
      </Col>
    </Row>
  </div>
);

export default SettingsBar;
