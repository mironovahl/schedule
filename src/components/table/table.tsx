/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useContext, useEffect } from 'react';
import {
  Table as AntDTable,
  Menu,
  Checkbox,
  Dropdown,
  Button,
  Tooltip,
  Input,
  Popconfirm,
  Form,
  Tag,
  Empty,
  Row,
  Col,
  Radio,
} from 'antd';

import RenderTag from '../type-task';
import SettingsContext from '../../context/settings-context';
import BackendService from '../../services/backend-service';

import {
  getDate, getTime, eventsSortByDate, getDeadline,
} from '../../services/date-service';

import {
  ITableColumns,
  IColumnsVisibility,
  EditableCellProps,
} from '../../interfaces/table-interfaces';
import { IEvent } from '../../interfaces/backend-interfaces';

import './table.scss';

type TableProps = {
  dataSource: IEvent[] | undefined;
};

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}: EditableCellProps) => {
  const inputNode = <Input />;

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

function isDuplicate(arr: { text: string; value: string }[], value: string): boolean {
  let isDup = false;
  arr.forEach((item) => {
    if (item.text === value) {
      isDup = true;
    }
  });
  return isDup;
}

// eslint-disable-next-line sonarjs/cognitive-complexity
const Table: React.FC<TableProps> = ({ dataSource }: TableProps) => {
  if (!dataSource) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  const backendService = new BackendService();
  const [columnsVisible, setColumnsVisible] = useState<IColumnsVisibility>({
    done: true,
    date: true,
    time: true,
    type: true,
    name: true,
    description: true,
    url: true,
    place: true,
    comment: true,
    details: true,
  });
  const [menuVisible, setMenuVisible] = useState<boolean>(false);

  const {
    taskSettings, completedTask, hiddenRows, changeContext,
  } = useContext(SettingsContext);

  const typeFilters: { text: string; value: string }[] = [];
  dataSource.forEach((item) => {
    if (!isDuplicate(typeFilters, taskSettings[item.type].name)) {
      typeFilters.push({
        text: taskSettings[item.type].name,
        value: item.type,
      });
    }
  });
  typeFilters.sort((a, b) => {
    if (a.value > b.value) return 1;
    if (a.value < b.value) return -1;
    return 0;
  });

  const [form] = Form.useForm();
  const [data, setData] = useState(dataSource);
  const [editingKey, setEditingKey] = useState<string>('');

  const isEditing = (record: IEvent) => record.key === editingKey;

  const edit = (record: IEvent) => {
    form.setFieldsValue({ ...record });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async (key: React.Key) => {
    try {
      const row = (await form.validateFields()) as IEvent;
      console.log(row);
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        console.log(newData);
        console.log(newData[index]);
        setData(newData);
        backendService.updateEvent(newData[index]);

        setEditingKey('');
      } else {
        newData.push(row);
        // backendService.updateEvent(item);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns: ITableColumns[] = [
    {
      title: 'Done',
      width: 40,
      key: 'done',
      className: columnsVisible.done ? '' : 'hidden',
      render: (record) => (
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              changeContext({ completedTask: [...completedTask, record.id] });
            } else {
              changeContext({ completedTask: completedTask.filter((id) => id !== record.id) });
            }
          }}
          checked={completedTask.includes(record.id)}
        />
      ),
    },
    {
      title: 'Date',
      width: 90,
      dataIndex: 'startDate',
      key: 'date',
      className: columnsVisible.date ? '' : 'hidden',

      render: (date, record) => (
        <>
          {getDate(date)}
          <Tag color="red">{getDeadline(record.endDate)}</Tag>
        </>
      ),
      editable: false,
    },
    {
      title: 'Time',
      width: 70,
      dataIndex: 'startDate',
      key: 'time',
      className: columnsVisible.time ? '' : 'hidden',
      render: (date) => <>{getTime(date)}</>,
      editable: false,
    },
    {
      title: 'Type',
      width: 100,
      dataIndex: 'type',
      key: 'type',
      className: columnsVisible.type ? '' : 'hidden',
      filters: typeFilters,
      onFilter: (value, record) => record.type.indexOf(value) === 0,
      render: (value: string) => <RenderTag type={value} />,
      editable: false,
    },
    {
      title: 'Name',
      width: 200,
      dataIndex: 'name',
      key: 'name',
      ellipsis: {
        showTitle: true,
      },
      className: columnsVisible.name ? '' : 'hidden',
      render: (value: string, record: IEvent) => (
        <a href={record.url} target="_blank" rel="noreferrer">
          {value}
        </a>
      ),
      editable: false,
    },
    {
      title: 'Place',
      width: 200,
      dataIndex: 'place',
      key: 'place',
      ellipsis: {
        showTitle: false,
      },
      className: columnsVisible.place ? '' : 'hidden',
      editable: false,
    },
    {
      title: 'Description',
      width: 200,
      dataIndex: 'description',
      key: 'description',
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
      className: columnsVisible.description ? '' : 'hidden',
      editable: true,
    },
    {
      title: 'Details Url',
      width: 85,
      key: 'details',
      className: columnsVisible.details ? '' : 'hidden',
      render: (record: IEvent) => <a href={`/task-page/${record.id}`}>See more</a>,
      editable: false,
    },
    {
      title: 'Comment',
      width: 200,
      dataIndex: 'comment',
      key: 'comment',
      ellipsis: {
        showTitle: false,
      },
      render: (comment) => (
        <Tooltip placement="topLeft" title={comment}>
          {comment}
        </Tooltip>
      ),
      className: columnsVisible.comment ? '' : 'hidden',
      editable: true,
    },
    {
      title: 'Operation',
      width: 85,
      dataIndex: 'operation',
      key: 'operation',
      render: (_: any, record: IEvent) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a onClick={() => save(record.key)} style={{ marginRight: 8 }}>
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a onClick={() => edit(record)}>Edit</a>
        );
      },
    },
  ];

  const onCheckboxChange = (e: any) => {
    setColumnsVisible({
      ...columnsVisible,
      [e.target.id]: e.target.checked,
    });
  };

  const handleVisibleChange = (flag: boolean) => {
    setMenuVisible(flag);
  };

  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: IEvent) => ({
        record,
        inputtype: 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  const menu: JSX.Element = (
    <Menu>
      <Menu.ItemGroup>
        {columns.map((column) => (
          <Menu.Item key={column.key}>
            <Checkbox id={column.key} defaultChecked onChange={onCheckboxChange}>
              {column.title}
            </Checkbox>
          </Menu.Item>
        ))}
      </Menu.ItemGroup>
    </Menu>
  );

  const [activeRows, changeActiveRows] = useState<string[]>([]);
  let isShiftActive: boolean = false;
  const handleShiftDown = (e: any): void => {
    if (e.key === 'Shift') {
      isShiftActive = true;
    }
  };
  const handleShiftUp = (e: any): void => {
    if (e.key === 'Shift') {
      isShiftActive = false;
    }
  };
  const onHideClick = () => {
    changeContext({ hiddenRows: [...hiddenRows, ...activeRows] });
    changeActiveRows([]);
  };
  const onShowClick = () => {
    changeActiveRows(hiddenRows);
    changeContext({ hiddenRows: [] });
  };
  useEffect(() => {
    window.addEventListener('keyup', handleShiftUp);
    window.addEventListener('keydown', handleShiftDown);
  });
  const getOnRowClick = (record: any): object => ({
    onClick: () => {
      if (isShiftActive) {
        if (activeRows.includes(record.id)) {
          changeActiveRows(activeRows.filter((id) => id !== record.id));
        } else {
          changeActiveRows([...activeRows, record.id]);
        }
        return;
      }
      changeActiveRows([record.id]);
    },
  });

  const rowClassName = (record: any): string => {
    const classnames = ['editable-row', 'table__row'];
    if (activeRows.includes(record.id)) {
      classnames.push('table__row-active');
    }
    return classnames.join(' ');
  };

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Radio.Group>
            <Radio.Button disabled={activeRows.length < 1} onClick={onHideClick}>
              Hide Rows
            </Radio.Button>
            <Radio.Button disabled={hiddenRows.length < 1} onClick={onShowClick}>
              Show Hidden Rows
            </Radio.Button>
          </Radio.Group>
        </Col>
        <Col>
          <Dropdown overlay={menu} onVisibleChange={handleVisibleChange} visible={menuVisible}>
            <Button style={{ marginBottom: 15 }}>Show/Hide columns </Button>
          </Dropdown>
        </Col>
      </Row>
      <Form form={form} component={false}>
        <AntDTable
          dataSource={eventsSortByDate(data).filter(({ id }) => !hiddenRows.includes(id))}
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          columns={mergedColumns}
          className="table"
          rowClassName={rowClassName}
          pagination={{
            onChange: cancel,
          }}
          size="small"
          scroll={{ x: 'max-content' }}
          onRow={(record) => getOnRowClick(record)}
        />
      </Form>
    </>
  );
};

export default Table;
