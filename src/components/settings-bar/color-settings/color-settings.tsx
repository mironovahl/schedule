import React, { useState } from 'react';
import {
  Button,
  Modal,
} from 'antd';

const ColorSettings: React.FC = () => {
  const [isColorSettingsVisible, changeColorSettingsVisible] = useState<boolean>(false);

  const handleCancelColorSettings = (): void => {
    changeColorSettingsVisible(false);
  };

  const showColorSettings = (): void => {
    changeColorSettingsVisible(true);
  };

  return (
    <>
      <Button onClick={showColorSettings}>Color</Button>
      <Modal
        title="Color Settings"
        visible={isColorSettingsVisible}
        onCancel={handleCancelColorSettings}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default ColorSettings;
