import React, { useState } from 'react';
import {
  Button, Menu, Dropdown, Input,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { IEvent } from '../../interfaces/backend-interfaces';
import './addSection.scss';

interface IProps {
  data: IEvent;
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
  const { data } = props;
  const [visibleInputs, setVisibleInputs] = useState<TVisibleInputs>({
    photo: false,
    video: false,
    text: false,
  });

  return (
    <>
      {visibleInputs.photo
        && (
          <div>
            <p>Вставьте ссылку на изображение</p>
            <Input placeholder="Image link" />
            <Button>Добавить</Button>
          </div>
        )}
      {visibleInputs.video
        && (
          <div>
            <p>Вставьте ссылку на видео</p>
            <Input placeholder="Video link" />
            <Button>Добавить</Button>
          </div>
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
