export interface ITableColumns {
  title: string
  width?: number
  dataIndex?: string
  key: string
  className: string
  ellipsis?: any
  fixed?: any
  // filters?: any
  // filterDropdown?: any
  // filterIcon?: (filtered: any) => JSX.Element
  // onFilter?: (value: any, record?: any) => boolean
  // defaultFilteredValue?: string[]
  render?: (value: any, record?: any) => JSX.Element
}

export interface IColumnsVisibility {
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
