import React from 'react';
import {
  Row,
  Col,
  Select,
} from 'antd';
import { ScheduleView } from '../../interfaces/settings-interfaces';

type SettingsBarProps = {
  onViewChange: (value: ScheduleView) => void;
  view: ScheduleView;
};

const SettingsBar: React.FC<SettingsBarProps> = ({ onViewChange, view }: SettingsBarProps) => (
  <div className="settings-bar">
    <Row align="middle" justify="space-between">
      <Col>
        <Select defaultValue={view} onChange={onViewChange}>
          <Select.Option value="table">Table</Select.Option>
          <Select.Option value="calendar">Calendar</Select.Option>
          <Select.Option value="list">List</Select.Option>
        </Select>
      </Col>
    </Row>
  </div>
);

export default SettingsBar;
