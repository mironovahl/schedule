import React, { useState, CSSProperties } from 'react';
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
import { TaskSettings, ITaskColors } from '../../../interfaces/settings-interfaces';
import defaultSettings from '../../../config/default-settings';

type ColorSettingsProps = {
  defaultValue: TaskSettings;
  onChange: (value: TaskSettings) => void;
};

const ColorSettings: React.FC<ColorSettingsProps> = ({
  defaultValue,
  onChange,
}: ColorSettingsProps) => {
  const [isColorSettingsVisible, changeColorSettingsVisible] = useState<boolean>(false);
  const [currentSettings, changeCurrentSettings] = useState<TaskSettings>({ ...defaultValue });

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
    taskType: string,
  ) => ({ hex }: ColorResult) => {
    const newColorSettings: ITaskColors = { ...currentSettings[taskType], color: hex };
    const newCurrentSettings: TaskSettings = { ...currentSettings, [taskType]: newColorSettings };
    changeCurrentSettings(newCurrentSettings);
  };

  const getHandleFontColorChange = (
    taskType: keyof TaskSettings,
  ) => ({ hex }: ColorResult) => {
    const newColorSettings: ITaskColors = { ...currentSettings[taskType], fontColor: hex };
    const newCurrentSettings: TaskSettings = { ...currentSettings, [taskType]: newColorSettings };
    changeCurrentSettings(newCurrentSettings);
  };

  const renderItem = (key: string) => {
    const taskType: string = key;
    const { color }: ITaskColors = currentSettings[taskType];
    const { fontColor }: ITaskColors = currentSettings[taskType];
    const tagStyle = { cursor: 'pointer' };

    return (
      <List.Item>
        <Row
          justify="space-between"
          style={{ width: '100%' }}
          gutter={[0, {
            xs: 10,
            sm: 10,
            md: 10,
            lg: 0,
            xl: 0,
            xxl: 0,
          }]}
        >
          <Col xs={24} sm={24} md={24} lg={8} xl={8} xxl={8}>{taskType}</Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
            <Popover trigger="click" content={<ChromePicker disableAlpha color={color} onChange={getHandleColorChange(taskType)} />}>
              <Tag color={color} style={tagStyle}>color</Tag>
            </Popover>
          </Col>
          <Col xs={12} sm={12} md={12} lg={8} xl={8} xxl={8}>
            <Popover trigger="click" content={<ChromePicker disableAlpha color={fontColor} onChange={getHandleFontColorChange(taskType)} />}>
              <b style={{ color: fontColor, ...tagStyle }}>font color</b>
            </Popover>
          </Col>
        </Row>
      </List.Item>
    );
  };

  const modalStyle: CSSProperties = {
    maxHeight: '60vh',
    overflowY: 'scroll',
    overflowX: 'hidden',
    marginTop: '25px',
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
        <Button
          onClick={() => {
            onChange(defaultSettings.taskSettings);
            changeCurrentSettings(defaultSettings.taskSettings);
          }}
          type="default"
        >
          Reset Colors
        </Button>
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
