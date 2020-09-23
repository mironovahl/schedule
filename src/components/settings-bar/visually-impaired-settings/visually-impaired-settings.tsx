import React, { useState } from 'react';
import {
  Button, Modal, Space, Radio,
} from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const VisuallyImpairedSettings = () => {
  const [isSettingsVisible, setSettingsVisible] = useState<boolean>(false);
  const [fontSize, setFontSize] = useState<string>('10px');
  const showSettings = () => {
    setSettingsVisible(true);
  };

  const handleCancelClick = () => {
    setSettingsVisible(false);
  };

  const handleFontSizeChange = (e: any): void => {
    const html = document.querySelector('html');
    html!.style.fontSize = e.target.value;
    setFontSize(e.target.value);
  };

  return (
    <>
      <Button
        style={{ marginRight: 10 }}
        icon={<EyeOutlined />}
        onClick={showSettings}
      />
      <Modal
        title="Visually Impaired Settings"
        visible={isSettingsVisible}
        footer={null}
        onCancel={handleCancelClick}
      >
        <Space direction="vertical">
          <Space>Font size:</Space>
          <Space>
            <Radio.Group
              value={fontSize}
              onChange={handleFontSizeChange}
              buttonStyle="solid"
            >
              <Radio.Button value="10px">Default</Radio.Button>
              <Radio.Button value="12px">Medium</Radio.Button>
              <Radio.Button value="15px">Large</Radio.Button>
            </Radio.Group>
          </Space>
        </Space>

      </Modal>
    </>
  );
};

export default VisuallyImpairedSettings;
