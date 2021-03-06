import React from 'react';
import { Row, Col, Select } from 'antd';
import { Timezone, TaskSettings } from '../../interfaces/settings-interfaces';
import timezones from '../../config/timezones';
import ColorSettings from './color-settings/color-settings';
import VisuallyImpairedSettings from './visually-impaired-settings/visually-impaired-settings';

type SettingsBarProps = {
  timezone: Timezone;
  onTimezoneChange: (value: Timezone) => void;
  tasksSettings: TaskSettings;
  onTasksSettingsChange: (value: TaskSettings) => void;
};

const SettingsBar: React.FC<SettingsBarProps> = ({
  timezone,
  onTimezoneChange,
  tasksSettings,
  onTasksSettingsChange,
}: SettingsBarProps) => (
  <div className="settings-bar">
    <Row align="middle" justify="space-between">
      <Col>
        <span>Timezone: </span>
        <Select defaultValue={timezone} onChange={onTimezoneChange} style={{ minWidth: '180px' }}>
          {timezones.map((t) => (
            <Select.Option value={t} key={t}>
              {t}
            </Select.Option>
          ))}
        </Select>
      </Col>
      <Col style={{ display: 'flex', alignItems: 'center' }}>
        <VisuallyImpairedSettings />
        <ColorSettings defaultValue={tasksSettings} onChange={onTasksSettingsChange} />
      </Col>
    </Row>
  </div>
);

export default SettingsBar;
