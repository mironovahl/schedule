import React from 'react';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

const onChange = (checked: boolean, setValue: React.Dispatch<React.SetStateAction<boolean>>) => {
  setValue(checked);
  console.log(`${checked}`);
};

interface IProps {
  isFeedback: boolean
  setIsFeedback: React.Dispatch<React.SetStateAction<boolean>>,
}

const AddFeedback = (props: IProps) => {
  const { isFeedback, setIsFeedback } = props;
  return (
    <div>
      <span>Разрешить добавлять feedback </span>
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked={isFeedback}
        onChange={(checked) => onChange(checked, setIsFeedback)}
      />
    </div>
  );
};

export default AddFeedback;
