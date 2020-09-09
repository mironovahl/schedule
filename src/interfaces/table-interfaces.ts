export interface ITableColumns {
  title: string
  width?: number,
  dataIndex: string
  key: string
  className: string
  render?: (value: moment.Moment | string) => JSX.Element
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
}
