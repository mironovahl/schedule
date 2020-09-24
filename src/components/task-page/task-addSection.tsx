import React, {
  Dispatch, SetStateAction, useState,
} from 'react';
import {
  Button, Menu, Dropdown,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IEvent } from '../../interfaces/backend-interfaces';
import AddItem from './addSection-item';
import './addSection.scss';

interface IProps {
  data: IEvent;
  setData: Dispatch<SetStateAction<IEvent | null>>;
  photo: string;
  setPhoto: React.Dispatch<React.SetStateAction<string>>;
  video: string;
  setVideo: React.Dispatch<React.SetStateAction<string>>;
  text: string;
  setText: React.Dispatch<React.SetStateAction<string>>;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
  url: string;
  setUrl: React.Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;

}

interface TVisibleInputs {
  [key:string]: boolean,
  photo: boolean;
  video: boolean;
  text: boolean;
  comment: boolean;
  url: boolean;
  description: boolean;
}

const menu = (
  isPhoto: string,
  isVideo: string,
  isText:string,
  isComment: string,
  isUrl: string,
  isDescription: string,
  changeVisible: React.Dispatch<React.SetStateAction<TVisibleInputs>>,
) => {
  const addValue = (property:string) => changeVisible((prevState:TVisibleInputs) => (
    {
      ...prevState,
      [property]: !prevState[property],
    }
  ));
  return (
    <Menu>
      {isPhoto ? null : <Menu.Item key="1" onClick={() => addValue('photo')}>Фото</Menu.Item>}
      {isVideo ? null : <Menu.Item key="2" onClick={() => addValue('video')}>Видео</Menu.Item>}
      {isText ? null : <Menu.Item key="3" onClick={() => addValue('text')}>Текст</Menu.Item>}
      {isComment ? null : <Menu.Item key="4" onClick={() => addValue('comment')}>Комментарий</Menu.Item>}
      {isUrl ? null : <Menu.Item key="5" onClick={() => addValue('url')}>Ссылку</Menu.Item>}
      {isDescription ? null : <Menu.Item key="6" onClick={() => addValue('description')}>Описание</Menu.Item>}
    </Menu>
  );
};

const AddSection: React.FC<IProps> = (props: IProps) => {
  const {
    data, setData,
    photo, setPhoto,
    video, setVideo,
    text, setText,
    comment, setComment,
    url, setUrl,
    description, setDescription,
  } = props;

  const [visibleInputs, setVisibleInputs] = useState<TVisibleInputs>({
    photo: false,
    video: false,
    text: false,
    comment: false,
    url: false,
    description: false,
  });

  return (
    <>
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
      {visibleInputs.text
        && (
          <AddItem
            link={text}
            setFunc={setText}
            setData={setData}
            visibleInputs={visibleInputs}
            setVisibleInputs={setVisibleInputs}
            property="text"
            placeholder="text"
          />
        )}
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
      {visibleInputs.description
        && (
          <AddItem
            link={description}
            setFunc={setDescription}
            setData={setData}
            visibleInputs={visibleInputs}
            setVisibleInputs={setVisibleInputs}
            property="description"
            placeholder="Description"
          />
        )}
      <Dropdown
        overlay={menu(
          data.photo,
          data.video,
          data.text,
          data.comment,
          data.url,
          data.description,
          setVisibleInputs,
        )}
      >
        <Button type="primary" icon={<PlusOutlined />}>
          Add
        </Button>
      </Dropdown>

    </>
  );
};

export default AddSection;
