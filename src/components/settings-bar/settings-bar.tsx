import React from 'react';
import {
  Row,
  Col,
  Select,
} from 'antd';
import { ScheduleView, Timezone } from '../../interfaces/settings-interfaces';
import timezones from '../../config/timezones';

type SettingsBarProps = {
  view: ScheduleView;
  onViewChange: (value: ScheduleView) => void;
  timezone: Timezone;
  onTimezoneChange: (value: Timezone) => void;
};

const SettingsBar: React.FC<SettingsBarProps> = ({
  view,
  onViewChange,
  timezone,
  onTimezoneChange,
}: SettingsBarProps) => (
  <div className="settings-bar">
    <Row align="middle" justify="space-between">
      <Col>
        <Select defaultValue={view} onChange={onViewChange}>
          <Select.Option value="table">Table</Select.Option>
          <Select.Option value="calendar">Calendar</Select.Option>
          <Select.Option value="list">List</Select.Option>
        </Select>
        <Select defaultValue={timezone} onChange={onTimezoneChange}>
          {timezones.map((t) => (
            <Select.Option value={t}>{t}</Select.Option>
          ))}
        </Select>
      </Col>
    </Row>
  </div>
);

export default SettingsBar;
