/* eslint-disable sonarjs/cognitive-complexity */
import React, {
  useState, Dispatch, SetStateAction, useContext,
} from 'react';
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
import SettingsContext from '../../context/settings-context';
import AddFeedback from './addFeedback';
import Feedback from './task-feedback';

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
  const { user } = useContext(SettingsContext);
  const backendService = new BackendService();
  const { data, setData } = props;
  const [photo, setPhoto] = useState<string>(data.photo);
  const [video, setVideo] = useState<string>(data.video);
  const [text, setText] = useState<string>(data.text);
  const [isFeedback, setIsFeedback] = useState<boolean>(false);

  const [visibleInputs, setVisibleInputs] = useState<TVisibleInputs>({
    photo: false,
    video: false,
    text: false,
  });
  const isMentor: boolean = user === 'mentor';

  const { startDate, endDate } = data;

  const changeValue = (event: string|moment.Moment, property: string): void => {
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

  const onChangeDate = (value: moment.Moment | null, dateString: string, property: string) => {
    if (value) {
      changeValue(value, property);
    }
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
            <span className="date_title">Начало</span>
            {isMentor
              ? (
                <DatePicker
                  style={{ width: '162px' }}
                  onChange={(value, dateString) => onChangeDate(value, dateString, 'startDate')}
                  defaultValue={startDate}
                  format="DD-MM-YYYY HH:mm"
                  showTime
                />
              )
              : (
                <DatePicker style={{ width: '162px' }} value={startDate} format="DD-MM-YYYY HH:mm" showTime />

              )}
          </div>
          <div className="taskDescription_date-day">
            <span className="date_title">Конец</span>
            {isMentor
              ? (
                <DatePicker
                  style={{ width: '162px' }}
                  onChange={(value, dateString) => onChangeDate(value, dateString, 'startDate')}
                  defaultValue={endDate}
                  format="DD-MM-YYYY HH:mm"
                  showTime
                />
              )
              : (
                <DatePicker style={{ width: '162px' }} value={endDate} format="DD-MM-YYYY HH:mm" showTime />
              )}
          </div>
        </div>
        {data.description !== ''
          && (
            <div>
              <h3>Описание</h3>
              <Paragraph
                editable={isMentor ? { onChange: (e) => changeValue(e, 'description') } : false}
              >
                {data?.description}
              </Paragraph>
            </div>
          )}
        <div>
          <h3>Место проведения</h3>
          <TaskPlace data={data} setData={setData} />
        </div>
        {data.url !== ''
          && (
            <div>
              <h3>Ссылка</h3>
              <Paragraph
                editable={isMentor ? { onChange: (e) => changeValue(e, 'url') } : false}
              >
                <a href={data?.url}>{data?.url}</a>
              </Paragraph>
            </div>
          )}

        {data.comment !== ''
          && (
            <div>
              <h3>Комментарий</h3>
              <Paragraph
                editable={isMentor ? { onChange: (e) => changeValue(e, 'comment') } : false}
              >
                {data?.comment}
              </Paragraph>
            </div>
          )}
        {data.photo
          && (
            <div>
              <Image
                width={500}
                src={data.photo}
              />
              {isMentor
                && (
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
                )}
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
          )}
        {data.text
        && (
          <div>
            <Paragraph
              editable={isMentor ? { onChange: (e) => changeValue(e, 'text') } : false}
            >
              {data?.text}
            </Paragraph>
            {visibleInputs.text
            && (
              <AddItem
                link={text}
                setFunc={setText}
                setData={setData}
                visibleInputs={visibleInputs}
                setVisibleInputs={setVisibleInputs}
                property="text"
                placeholder="Text"
              />
            )}
          </div>
        )}

        {data.video
          && (
            <div>
              <iframe
                src={data.video}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />
              {isMentor
                && (
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
                )}
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
          )}
        {isMentor
          && (
            <div>
              <AddSection
                data={data}
                setData={setData}
                photo={photo}
                setPhoto={setPhoto}
                video={video}
                setVideo={setVideo}
                text={text}
                setText={setText}
              />
            </div>
          )}
        {isMentor
          ? <AddFeedback isFeedback={isFeedback} setIsFeedback={setIsFeedback} />
          : (isFeedback
          && <Feedback />)}

      </div>
    </>
  );
};
export default TaskDescription;
