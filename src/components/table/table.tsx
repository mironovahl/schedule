/* eslint-disable no-nested-ternary */
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
  DatePicker,
} from 'antd';
import { DownOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

import RenderTag from '../type-task';
import DownloadTasksButton from '../download-tasks';
import SettingsContext from '../../context/settings-context';
import BackendService from '../../services/backend-service';

import {
  getDate,
  getTime,
  eventsSortByDate,
  getDeadline,
  isDeadlinePassed,
} from '../../services/date-service';

import {
  ITableColumns,
  IColumnsVisibility,
  EditableCellProps,
} from '../../interfaces/table-interfaces';
import { IEvent, IOrganizer } from '../../interfaces/backend-interfaces';

import './table.scss';

type TableProps = {
  dataSource: IEvent[] | undefined;
  organizers: IOrganizer[] | undefined;
};

const EditableCell: React.FC<EditableCellProps> = ({
  editing,
  dataIndex,
  title,
  children,
  ...restProps
}: EditableCellProps) => {
  const inputNode = <Input />;
  const dateFormat = 'DD-MM-YYYY';
  const dateNode = (
    <DatePicker
      format={dateFormat}
    />
  );

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <td {...restProps}>
      {title === 'Date' && editing ? (
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
          {dateNode}
        </Form.Item>
      ) : editing ? (
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
const Table: React.FC<TableProps> = ({ dataSource, organizers }: TableProps) => {
  if (!dataSource) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  if (!organizers) return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
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

  const { taskSettings, completedTask, hiddenRows, changeContext } = useContext(
    SettingsContext,
  );

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

  const { user } = useContext(SettingsContext);

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
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        backendService.updateEvent(newData[index]);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  const columns: ITableColumns[] = [
    {
      title: 'Date',
      width: 100,
      dataIndex: 'startDate',
      key: 'date',
      columnVisible: columnsVisible.date,
      render: (date, record) => (
        <>
          {getDate(date)}
          <Tag color="red">{getDeadline(record.endDate)}</Tag>
        </>
      ),
      editable: true,
    },
    {
      title: 'Time',
      width: 70,
      dataIndex: 'startDate',
      key: 'time',
      columnVisible: columnsVisible.time,
      render: (date) => <>{getTime(date)}</>,
      editable: false,
    },
    {
      title: 'Type',
      width: 120,
      dataIndex: 'type',
      key: 'type',
      columnVisible: columnsVisible.type,
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
      columnVisible: columnsVisible.name,
      ellipsis: {
        showTitle: true,
      },
      render: (value: string, record: IEvent) => (
        <a href={record.url} target="_blank" rel="noreferrer">
          {value}
        </a>
      ),
      editable: false,
    },
    {
      title: 'Place',
      width: 140,
      dataIndex: 'place',
      key: 'place',
      columnVisible: columnsVisible.place,
      ellipsis: {
        showTitle: false,
      },
      editable: true,
    },
    {
      title: 'Description',
      width: 200,
      dataIndex: 'description',
      key: 'description',
      columnVisible: columnsVisible.description,
      ellipsis: {
        showTitle: false,
      },
      render: (description) => (
        <Tooltip placement="topLeft" title={description}>
          {description}
        </Tooltip>
      ),
      editable: true,
    },
    {
      title: 'Organizer',
      width: 100,
      dataIndex: 'organizerID',
      key: 'organizerID',
      columnVisible: columnsVisible.description,
      render: (organizerID: string) => (
        <>{organizers.find((item) => item.id === organizerID)!.name}</>
      ),
    },
    {
      title: 'Details Url',
      width: 110,
      key: 'details',
      columnVisible: columnsVisible.details,
      render: (record: IEvent) => <a href={`/task-page/${record.id}`}>See more</a>,
      editable: false,
    },
    {
      title: 'Comment',
      width: 200,
      dataIndex: 'comment',
      key: 'comment',
      columnVisible: columnsVisible.comment,
      ellipsis: {
        showTitle: false,
      },
      render: (comment) => (
        <Tooltip placement="topLeft" title={comment}>
          {comment}
        </Tooltip>
      ),
      editable: true,
    },
    {
      title: 'Done',
      width: 70,
      key: 'done',
      columnVisible: columnsVisible.done,
      render: (record) => (
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              changeContext({ completedTask: [...completedTask, record.id] });
            } else {
              changeContext({
                completedTask: completedTask.filter((id) => id !== record.id),
              });
            }
          }}
          checked={completedTask.includes(record.id)}
        />
      ),
    },
    {
      title: 'Operation',
      width: 85,
      dataIndex: 'operation',
      key: 'operation',
      columnVisible: true,
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

  const columnsStudent: ITableColumns[] = columns.filter(
    (column) => column.key !== 'operation',
  );

  const columnsMentor: ITableColumns[] = columns.filter(
    (column) => column.key !== 'done',
  );

  let mergedColumnsForTable;
  let mergedColumns;

  const getMergedColumns = (switchColumns: any[]) => {
    mergedColumns = switchColumns.map((col) => {
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
    return mergedColumns;
  };

  if (user !== 'mentor') {
    mergedColumnsForTable = getMergedColumns(columnsStudent);
    mergedColumnsForTable = mergedColumnsForTable.filter(
      (column) => column.columnVisible === true,
    );
  } else {
    mergedColumnsForTable = getMergedColumns(columnsMentor);
    mergedColumnsForTable = mergedColumnsForTable.filter(
      (column) => column.columnVisible === true,
    );
  }

  const menu: JSX.Element = (
    <Menu>
      <Menu.ItemGroup>
        {columnsStudent.map((column) => (
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
    if (completedTask.includes(record.id)) {
      classnames.push('table__row_done');
    }
    if (isDeadlinePassed(record.endDate)) {
      classnames.push('passed');
    }
    return classnames.join(' ');
  };

  return (
    <>
      <Row justify="space-between">
        <Col>
          <Button
            style={{ margin: '0 10px 0 0' }}
            disabled={hiddenRows.length < 1}
            onClick={onShowClick}
          >
            Show hidden rows
          </Button>
          <Button
            style={{ margin: '0 10px 0 0' }}
            type="dashed"
            disabled={activeRows.length < 1}
            onClick={onHideClick}
          >
            <EyeInvisibleOutlined />
            Hide rows
          </Button>
          <DownloadTasksButton data={dataSource} />
        </Col>
        <Col>
          <Dropdown
            overlay={menu}
            onVisibleChange={handleVisibleChange}
            visible={menuVisible}
          >
            <Button style={{ marginBottom: 15 }}>
              Show/Hide columns
              <DownOutlined />
            </Button>
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
          columns={mergedColumnsForTable}
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
