import React, { useState } from 'react';
import {
  Button,
  Modal,
  Row,
  Col,
  List,
  Tag,
  Popover,
} from 'antd';
import { ChromePicker, ColorResult } from 'react-color';
import { ITaskSettings, ITaskColors } from '../../../interfaces/settings-interfaces';

type ColorSettingsProps = {
  defaultValue: ITaskSettings;
  onChange: (value: ITaskSettings) => void;
};

const ColorSettings: React.FC<ColorSettingsProps> = ({
  defaultValue,
  onChange,
}: ColorSettingsProps) => {
  const [isColorSettingsVisible, changeColorSettingsVisible] = useState<boolean>(false);
  const [currentSettings, changeCurrentSettings] = useState<ITaskSettings>({ ...defaultValue });

  const handleCancelColorSettings = (): void => {
    changeCurrentSettings(defaultValue);
    changeColorSettingsVisible(false);
  };

  const showColorSettings = (): void => {
    changeColorSettingsVisible(true);
  };

  const handleOkClick = (): void => {
    onChange(currentSettings);
    changeColorSettingsVisible(false);
  };

  const getHandleColorChange = (
    taskType: keyof ITaskSettings,
  ) => ({ hex }: ColorResult) => {
    const newColorSettings: ITaskColors = { ...currentSettings[taskType], color: hex };
    const newCurrentSettings: ITaskSettings = { ...currentSettings, [taskType]: newColorSettings };
    changeCurrentSettings(newCurrentSettings);
  };

  const getHandleFontColorChange = (
    taskType: keyof ITaskSettings,
  ) => ({ hex }: ColorResult) => {
    const newColorSettings: ITaskColors = { ...currentSettings[taskType], fontColor: hex };
    const newCurrentSettings: ITaskSettings = { ...currentSettings, [taskType]: newColorSettings };
    changeCurrentSettings(newCurrentSettings);
  };

  const renderItem = (key: string) => {
    const taskType: keyof ITaskSettings = key as keyof ITaskSettings;
    const { color }: ITaskColors = currentSettings[taskType];
    const { fontColor }: ITaskColors = currentSettings[taskType];
    const tagStyle = { cursor: 'pointer' };

    return (
      <List.Item>
        <Row justify="space-between" style={{ width: '100%' }}>
          <Col flex="33%">{taskType}</Col>
          <Col flex="33%">
            <Popover trigger="click" content={<ChromePicker disableAlpha color={color} onChange={getHandleColorChange(taskType)} />}>
              <Tag color={color} style={tagStyle}>color</Tag>
            </Popover>
          </Col>
          <Col flex="33%">
            <Popover trigger="click" content={<ChromePicker disableAlpha color={fontColor} onChange={getHandleFontColorChange(taskType)} />}>
              <b style={{ color: fontColor, ...tagStyle }}>font color</b>
            </Popover>
          </Col>
        </Row>
      </List.Item>
    );
  };

  const modalStyle = {
    maxHeight: '60vh',
    'overflow-y': 'scroll',
    'overflow-x': 'hidden',
  };

  return (
    <>
      <Button onClick={showColorSettings}>Colors</Button>
      <Modal
        title="Color Settings"
        visible={isColorSettingsVisible}
        onCancel={handleCancelColorSettings}
        onOk={handleOkClick}
      >
        <div style={modalStyle}>
          <List
            size="small"
            bordered
            dataSource={Object.keys(currentSettings)}
            renderItem={renderItem}
          />
        </div>
      </Modal>
    </>
  );
};

export default ColorSettings;
