import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const VisuallyImpairedSettings = () => {
  const [isSettingsVisible, setSettingsVisible] = useState<boolean>(false);
  const showSettings = () => {
    // const html = document.querySelector('html');
    // html!.style.fontSize = '15px';
    setSettingsVisible(true);
  };

  const handleCancelClick = () => {
    setSettingsVisible(false);
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
        settings
      </Modal>
    </>
  );
};

export default VisuallyImpairedSettings;
