import React from 'react';
import { Row, Menu } from 'antd';
import { UnorderedListOutlined, TableOutlined, CalendarOutlined } from '@ant-design/icons';
import { ScheduleView } from '../../interfaces/settings-interfaces';
import './menu-bar.scss';

type MenuProps = {
  view: ScheduleView;
  onViewChange: (value: ScheduleView) => void;
};

const MenuBar: React.FC<MenuProps> = ({
  view,
  onViewChange,
}: MenuProps) => (
  <div className="menu-bar" style={{ marginBottom: 5 }}>
    <Row align="middle" justify="space-between">
      <Menu
        onClick={(e) => {
          onViewChange(e.key as ScheduleView);
        }}
        selectedKeys={[view]}
        mode="horizontal"
      >
        <Menu.Item key="table" icon={<TableOutlined />}>
          Table
        </Menu.Item>
        <Menu.Item key="list" icon={<UnorderedListOutlined />}>
          List
        </Menu.Item>
        <Menu.Item key="calendar" icon={<CalendarOutlined />}>
          Calendar
        </Menu.Item>
      </Menu>
    </Row>
  </div>
);

export default MenuBar;
