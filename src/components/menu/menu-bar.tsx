import React from 'react';
import {
  Row, Menu, Col,
} from 'antd';
import { UnorderedListOutlined, TableOutlined, CalendarOutlined } from '@ant-design/icons';
import { ScheduleView } from '../../interfaces/settings-interfaces';

type MenuProps = {
  view: ScheduleView;
  onViewChange: (value: ScheduleView) => void;
};

const MenuBar: React.FC<MenuProps> = ({ view, onViewChange }: MenuProps) => (
  <div className="menu-bar" style={{ marginBottom: 15 }}>
    <Row align="middle" justify="space-between">
      <Col>
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
      </Col>
    </Row>
  </div>
);

export default MenuBar;
