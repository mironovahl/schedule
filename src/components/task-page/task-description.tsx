import React, { useState, Dispatch, SetStateAction } from 'react';
import {
  Typography, DatePicker, Image, Button, Tooltip,
} from 'antd';
import { EditOutlined } from '@ant-design/icons';

import { IEvent } from '../../interfaces/backend-interfaces';
import './task-description.scss';
import RenderTag from '../type-task';
import TaskPlace from './task-place';
import AddSection from './task-addSection';
import BackendService from '../../services/backend-service';
import AddItem from './addSection-item';

const { Paragraph, Title } = Typography;

interface TVisibleInputs {
  [key:string]: boolean,
  photo: boolean;
  video: boolean;
  text: boolean;
}
interface IProps {
  data: IEvent;
  setData: Dispatch<SetStateAction<IEvent | null>>;
}

const TaskDescription: React.FC<IProps> = (props: IProps) => {
  const backendService = new BackendService();
  const { data, setData } = props;
  const [photo, setPhoto] = useState<string>(data.photo);
  const [video, setVideo] = useState<string>(data.video);

  console.log(data);

  const [visibleInputs, setVisibleInputs] = useState<TVisibleInputs>({
    photo: false,
    video: false,
    text: false,
  });

  const isMentor: boolean = true;

  const { startDate, endDate } = data;
  const changeValue = (event: string, property: string): void => {
    setData((oldData: IEvent | null) => {
      if (oldData) {
        const newData = {
          ...oldData,
          [property]: event,
        };
        backendService.updateEvent(newData);
        return newData;
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
            <DatePicker defaultValue={startDate} format="DD-MM-YYYY HH:mm" showTime />
          </div>
          <div className="taskDescription_date-day">
            <span>Конец</span>
            <DatePicker defaultValue={endDate} format="DD-MM-YYYY HH:mm" showTime />
          </div>
        </div>
        {
          data.description !== ''
            && (
              <div>
                <h3>Описание</h3>
                <Paragraph
                  editable={isMentor ? { onChange: (e) => changeValue(e, 'description') } : false}
                >
                  {data?.description}
                </Paragraph>

              </div>
            )
        }
        <div>
          <h3>Место проведения</h3>
          <TaskPlace data={data} setData={setData} />
        </div>
        {
          data.url !== ''
            && (
              <div>
                <h3>Ссылка</h3>
                <Paragraph
                  editable={isMentor ? { onChange: (e) => changeValue(e, 'url') } : false}
                >
                  <a href={data?.url}>{data?.url}</a>
                </Paragraph>
              </div>
            )
        }

        {
          data.comment !== ''
            && (
              <div>
                <h3>Комментарий</h3>
                <Paragraph
                  editable={isMentor ? { onChange: (e) => changeValue(e, 'comment') } : false}
                >
                  {data?.comment}
                </Paragraph>
              </div>
            )
        }
        {
          data.photo
            && (
              <div>
                <Image
                  width={500}
                  src={data.photo}
                />
                <Tooltip title="Edit">
                  <Button
                    shape="circle"
                    icon={(<EditOutlined />)}
                    onClick={() => {
                      setVisibleInputs({
                        ...visibleInputs,
                        photo: !visibleInputs.photo,
                      });
                    }}
                  />
                </Tooltip>
                {visibleInputs.photo
                  && (
                    <AddItem
                      link={photo}
                      setFunc={setPhoto}
                      setData={setData}
                      visibleInputs={visibleInputs}
                      setVisibleInputs={setVisibleInputs}
                      property="photo"
                      placeholder="Image link"
                    />
                  )}
              </div>
            )
        }
        {
          data.video
            && (
              <div>
                <iframe
                  src={data.video}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />
                <Tooltip title="Edit">
                  <Button
                    shape="circle"
                    icon={(<EditOutlined />)}
                    onClick={() => {
                      setVisibleInputs({
                        ...visibleInputs,
                        video: !visibleInputs.video,
                      });
                    }}
                  />
                </Tooltip>
                {visibleInputs.video
                  && (
                    <AddItem
                      link={video}
                      setFunc={setVideo}
                      setData={setData}
                      visibleInputs={visibleInputs}
                      setVisibleInputs={setVisibleInputs}
                      property="video"
                      placeholder="Video link"
                    />
                  )}
              </div>
            )
        }
        <div>
          <AddSection
            data={data}
            setData={setData}
            photo={photo}
            setPhoto={setPhoto}
            video={video}
            setVideo={setVideo}
          />
        </div>
      </div>
    </>
  );
};
export default TaskDescription;
