import React, { Dispatch, SetStateAction } from 'react';
import { Typography, DatePicker } from 'antd';
import { IEvent } from '../../interfaces/backend-interfaces';
import './task-description.scss';
import RenderTag from '../type-task';
import TaskPlace from './task-place';

const { Paragraph, Title } = Typography;

interface IProps {
  data: IEvent;
  setData: Dispatch<SetStateAction<IEvent | null>>;
}

const TaskDescription: React.FC<IProps> = (props: IProps) => {
  const { data, setData } = props;

  const isMentor: boolean = true;

  const { date } = data;
  const startDay = date;
  const changeValue = (event: string, property: string): void => {
    setData((oldData: IEvent | null) => {
      if (oldData) {
        return {
          ...oldData,
          [property]: event,
        };
      }
      return oldData;
    });
  };

  return (
    <>
      <div className="taskDescription">
        <Title
          level={2}
          editable={isMentor ? { onChange: (e) => changeValue(e, 'name') } : false}
        >
          {data?.name}
        </Title>
        <RenderTag type={data.type} />
        <div className="taskDescription_date">
          <div className="taskDescription_date-day">
            <span>Начало</span>
            <DatePicker defaultValue={startDay} format="DD-MM-YYYY" />
          </div>
          <div className="taskDescription_date-day">
            <span>Конец</span>
            <DatePicker defaultValue={startDay} format="DD-MM-YYYY" />
          </div>
        </div>

        <h3>Описание</h3>
        <Paragraph
          editable={isMentor ? { onChange: (e) => changeValue(e, 'description') } : false}
        >
          {data?.description}
        </Paragraph>
        <div>
          <div>
            <h3>Место проведения</h3>
            <TaskPlace place={data.place} />
          </div>
          <div>
            <h3>Ссылка</h3>
            <Paragraph
              editable={isMentor ? { onChange: (e) => changeValue(e, 'url') } : false}
            >
              <a href={data?.url}>{data?.url}</a>
            </Paragraph>
            <h3>Комментарий</h3>
            <Paragraph
              editable={isMentor ? { onChange: (e) => changeValue(e, 'comment') } : false}
            >
              {data?.comment}
            </Paragraph>
          </div>
        </div>
      </div>
    </>
  );
};
export default TaskDescription;
