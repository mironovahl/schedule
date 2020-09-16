import React from 'react';
import {
  Button, Space, Input,
} from 'antd';
import { FilterOutlined } from '@ant-design/icons';

const handleSearch = (confirm: () => void) => {
  confirm();
  // save to settings
};

const handleReset = (clearFilters: () => void) => {
  clearFilters();
  // save to settings
};

export default function getTypeFilterProps(dataIndex: string) {
  return ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }: any) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Filter by ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(confirm)}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    // eslint- disable - next - line max-len
    filterIcon: (filtered: any) => <FilterOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value: any, record: { type: string | any[]; }) => record.type.indexOf(value) === 0,
    // onFilterDropdownVisibleChange: (visible: any) => {
    //   if (visible) {
    //     setTimeout(() => searchInput.select(), 100);
    //   }
    // },
    // defaultFilteredValue: ['task', 'js task'], // get from settings
  });
}
