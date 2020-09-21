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

}

interface TVisibleInputs {
  [key:string]: boolean,
  photo: boolean;
  video: boolean;
  text: boolean;
}

const menu = (
  isPhoto: string,
  isVideo: string,
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
      <Menu.Item key="3">Текст</Menu.Item>
    </Menu>
  );
};

const AddSection: React.FC<IProps> = (props: IProps) => {
  const {
    data, setData, photo, setPhoto, video, setVideo,
  } = props;

  const [visibleInputs, setVisibleInputs] = useState<TVisibleInputs>({
    photo: false,
    video: false,
    text: false,
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
      <Dropdown overlay={menu(data.photo, data.video, setVisibleInputs)}>
        <Button type="primary" shape="circle" size="large">
          <PlusOutlined />
        </Button>
      </Dropdown>

    </>
  );
};

export default AddSection;
