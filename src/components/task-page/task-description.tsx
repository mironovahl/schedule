import React, { Dispatch, SetStateAction } from 'react';
import { Typography, DatePicker } from 'antd';
import moment from 'moment';
import { IEvent } from '../../interfaces/backend-interfaces';

const { Paragraph, Title } = Typography;

interface IProps {
  data: IEvent | undefined;
  setData: Dispatch<SetStateAction<IEvent | undefined>>;
}

const dateRenderer = (value: string) => (value ? moment(value, 'YYYY-MM-DD') : '');

const TaskDescription: React.FC<IProps> = (props: IProps) => {
  const { data, setData } = props;
  console.log(data);

  const isMentor: boolean = true;
  const date: Date = new Date();
  const dat = Intl.DateTimeFormat().format(date);
  const startDay = dateRenderer(dat);

  const changeValue = (event: string, property: string): void => {
    setData((oldData: IEvent | undefined) => {
      if (oldData) {
        const newData: IEvent = {
          ...oldData,
          [property]: event,
        };
        return newData;
      }
      return oldData;
    });
  };

  return (
    <>
      <Title
        level={2}
        editable={isMentor ? { onChange: (e) => changeValue(e, 'name') } : false}
      >
        {data?.name}
      </Title>
      <p>Начало 22.03.2020</p>
      <div>
        <p>Конец</p>
        <DatePicker defaultValue={moment(startDay)} />
      </div>
      <p>Задание</p>
      <h3>Описание</h3>
      <Paragraph
        editable={isMentor ? { onChange: (e) => changeValue(e, 'description') } : false}
      >
        {data?.description}
      </Paragraph>
      <h3>Комментарий</h3>
      <Paragraph
        editable={isMentor ? { onChange: (e) => changeValue(e, 'comment') } : false}
      >
        {data?.comment}
      </Paragraph>
    </>
  );
};
export default TaskDescription;
