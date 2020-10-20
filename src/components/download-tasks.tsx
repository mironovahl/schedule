import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { DownOutlined, DownloadOutlined } from '@ant-design/icons';
import { saveToCSV, saveToTXT } from '../services/saving-service';
import { IEvent } from '../interfaces/backend-interfaces';

interface IProps {
  data: IEvent[];
}

const DownloadTasksButton: React.FC<IProps> = ({ data }: IProps) => {
  const handleMenuClick = ({ key }: any) => {
    if (key === 'txt') saveToTXT(data);
    if (key === 'csv') saveToCSV(data);
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="txt" icon={<DownloadOutlined />}>
        in .txt
      </Menu.Item>
      <Menu.Item key="csv" icon={<DownloadOutlined />}>
        in .csv
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <Button>
        Download
        <DownOutlined />
      </Button>
    </Dropdown>
  );
};

export default DownloadTasksButton;
