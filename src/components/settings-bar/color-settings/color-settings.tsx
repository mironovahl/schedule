import React, { useState } from 'react';
import {
  Button,
  Modal,
  Row,
  Col,
  List,
  Tag,
} from 'antd';
import { ChromePicker } from 'react-color';
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

  const renderItem = (k: string) => {
    const { color }: ITaskColors = currentSettings[k as keyof ITaskSettings];
    const { fontColor }: ITaskColors = currentSettings[k as keyof ITaskSettings];

    return (
      <List.Item>
        <Row justify="space-between" style={{ width: '100%' }}>
          <Col>{k}</Col>
          <Col>
            <Tag color={color}>color</Tag>
          </Col>
          <Col>
            <Tag style={{ color: fontColor }}>font color</Tag>
          </Col>
        </Row>
      </List.Item>
    );
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
        <List
          size="small"
          bordered
          dataSource={Object.keys(currentSettings)}
          renderItem={renderItem}
        />
        <ChromePicker disableAlpha />
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ColorSettings;
