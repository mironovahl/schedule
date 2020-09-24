/* eslint-disable sonarjs/cognitive-complexity */
import React, {
  useState, Dispatch, SetStateAction, useContext,
} from 'react';
import {
  Typography, DatePicker, Image, Button, Tooltip, Divider,
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
import ShowFeeback from './showFeedback';
import {
  getDate,
  getTime,
} from '../../services/date-service';

const { Paragraph, Title } = Typography;

interface TVisibleInputs {
  [key:string]: boolean,
  photo: boolean;
  video: boolean;
  text: boolean;
  comment: boolean;
  url: boolean;
  description: boolean;
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
  const [comment, setComment] = useState<string>(data.comment);
  const [url, setUrl] = useState<string>(data.url);
  const [description, setDescription] = useState<string>(data.description);
  const isFeedback: boolean = data.feedbacks.isFeedbackEnable;

  const [visibleInputs, setVisibleInputs] = useState<TVisibleInputs>({
    photo: false,
    video: false,
    text: false,
    comment: false,
    url: false,
    description: false,
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
        <div className="taskDescription_title taskDescription__section">
          <Title
            level={2}
            editable={isMentor ? { onChange: (e) => changeValue(e, 'name') } : false}
          >
            {data?.name}
          </Title>
          <div>
            {' '}
            <RenderTag type={data.type} />
          </div>
        </div>

        <div className="taskDescription_date taskDescription__section">
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
                <p style={{ width: '162px', margin: '0' }}>
                  {getDate(startDate)}
                  {' '}
                  {getTime(startDate)}
                </p>

              )}
          </div>
          <div className="taskDescription_date-day">
            <span className="date_title">Конец</span>
            {isMentor
              ? (
                <DatePicker
                  style={{ width: '162px' }}
                  onChange={(value, dateString) => onChangeDate(value, dateString, 'endDate')}
                  defaultValue={endDate}
                  format="DD-MM-YYYY HH:mm"
                  showTime
                />
              )
              : (
                <p style={{ width: '162px', margin: '0' }}>
                  {getDate(endDate)}
                  {' '}
                  {getTime(endDate)}
                </p>
              )}
          </div>
        </div>
        {data.description
          && (
            <div className="taskDescription__section">
              <h3>Описание</h3>
              <Paragraph
                editable={isMentor ? { onChange: (e) => changeValue(e, 'description') } : false}
              >
                {data?.description}
              </Paragraph>
            </div>
          )}
        <div className="taskDescription__section">
          <h3>Место проведения</h3>
          <TaskPlace data={data} setData={setData} />
        </div>
        {data.url
          && (
            <div className="taskDescription__section">
              <h3>Ссылка</h3>

              <a href={data?.url}>{data?.url}</a>
              {isMentor
                && (
                  <Tooltip title="Edit">
                    <Button
                      type="link"
                      icon={(<EditOutlined />)}
                      onClick={() => {
                        setVisibleInputs({
                          ...visibleInputs,
                          url: !visibleInputs.url,
                        });
                      }}
                    />
                  </Tooltip>
                )}
              {visibleInputs.url
                && (
                  <AddItem
                    link={url}
                    setFunc={setUrl}
                    setData={setData}
                    visibleInputs={visibleInputs}
                    setVisibleInputs={setVisibleInputs}
                    property="url"
                    placeholder="Link"
                  />
                )}
            </div>
          )}

        {data.comment
          && (
            <div className="taskDescription__section">
              <Divider>Комментарий</Divider>
              <Paragraph
                editable={isMentor ? { onChange: (e) => changeValue(e, 'comment') } : false}
              >
                {data?.comment}
              </Paragraph>
              {visibleInputs.comment
                && (
                  <AddItem
                    link={comment}
                    setFunc={setComment}
                    setData={setData}
                    visibleInputs={visibleInputs}
                    setVisibleInputs={setVisibleInputs}
                    property="comment"
                    placeholder="Comment"
                  />
                )}
            </div>
          )}
        {data.text
        && (
          <div className="taskDescription__section">
            <Divider>Дополнительно</Divider>
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
        {data.photo
          && (
            <div className="taskDescription__section">

              {isMentor
                ? (
                  <div>
                    <h3 style={{ display: 'inline' }}>Фото</h3>
                    <Tooltip title="Edit">
                      <Button
                        type="link"
                        icon={(<EditOutlined />)}
                        onClick={() => {
                          setVisibleInputs({
                            ...visibleInputs,
                            photo: !visibleInputs.photo,
                          });
                        }}
                      />
                    </Tooltip>
                  </div>
                )
                : (<h3>Фото</h3>)}
              <Image
                width={320}
                src={data.photo}
              />

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
        {data.video && data.video !== ' '
          && (
            <div className="taskDescription__section">
              {isMentor
                ? (
                  <div>
                    <h3 style={{ display: 'inline' }}>Видео</h3>
                    <Tooltip title="Edit">
                      <Button
                        type="link"
                        icon={(<EditOutlined />)}
                        onClick={() => {
                          setVisibleInputs({
                            ...visibleInputs,
                            video: !visibleInputs.video,
                          });
                        }}
                      />
                    </Tooltip>
                  </div>

                )
                : (<h3>Видео</h3>)}
              <iframe
                src={data.video}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                title="video"
              />

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
          ? <AddFeedback isFeedback={isFeedback} setData={setData} />
          : (isFeedback
          && <Feedback setData={setData} />)}
        {isMentor
          && (
            <>
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
                  comment={comment}
                  setComment={setComment}
                  url={url}
                  setUrl={setUrl}
                  description={description}
                  setDescription={setDescription}
                />
              </div>
              <ShowFeeback data={data} />

            </>
          )}

      </div>
    </>
  );
};
export default TaskDescription;
