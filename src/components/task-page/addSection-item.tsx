import React, { Dispatch, SetStateAction } from 'react';
import { Button, Input } from 'antd';
import { IEvent } from '../../interfaces/backend-interfaces';
import onChangeValue from './onChangeValue';

import addValue from './addValue';

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
  link: string;
  setFunc: React.Dispatch<React.SetStateAction<string>>;
  setData: Dispatch<SetStateAction<IEvent | null>>;
  visibleInputs: TVisibleInputs;
  setVisibleInputs: React.Dispatch<React.SetStateAction<TVisibleInputs>>;
  property: string;
  placeholder: string;
}

const AddItem = (props: IProps) => {
  const {
    link, setFunc, setData, visibleInputs, setVisibleInputs, property, placeholder,
  } = props;
  return (
    <div>
      <p>Вставьте ссылку</p>
      <div className="addSection-inputs">
        <Input placeholder={placeholder} onChange={(e) => onChangeValue(e, setFunc)} />
        <Button onClick={() => addValue({
          link, property, setData, visibleInputs, setVisibleInputs,
        })}
        >
          Добавить
        </Button>
      </div>

    </div>
  );
};

export default AddItem;
