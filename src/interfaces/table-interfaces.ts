export interface ITableColumns {
  title: string
  width?: number
  dataIndex?: string
  key: string
  className: string
  ellipsis?: any
  fixed?: any
  render?: (value: any, record?: any) => JSX.Element
}

export interface IColumnsVisibility {
  [key: string]: any
  date: boolean,
  time: boolean,
  type: boolean,
  name: boolean,
  description: boolean,
  url: boolean,
  place: boolean,
  comment: boolean,
  details: boolean,
}

export interface Item {
  key: string;
  name: string;
  age: number;
  address: string;
}

export interface EditableCellProps {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: 'number' | 'text';
  record: Item;
  index: number;
  children: React.ReactNode;
}
