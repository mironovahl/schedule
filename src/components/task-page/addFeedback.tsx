import React from 'react';
import { Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';
import BackendService from '../../services/backend-service';
import { IEvent, IFeedbacks } from '../../interfaces/backend-interfaces';

const onChange = (
  isFeedbackEnable: boolean,
  setData:React.Dispatch<React.SetStateAction<IEvent | null>>,
) => {
  const backendService = new BackendService();
  setData((oldData: IEvent | null) => {
    if (oldData) {
      const newFeedbacks: IFeedbacks = {
        ...oldData.feedbacks,
        isFeedbackEnable,
      };
      const newData = {
        ...oldData,
        feedbacks: newFeedbacks,
      };
      backendService.updateEvent(newData);
      return newData;
    }
    return oldData;
  });
  console.log(`${isFeedbackEnable}`);
};

interface IProps {
  isFeedback: boolean
  setData: React.Dispatch<React.SetStateAction<IEvent | null>>,
}

const AddFeedback = (props: IProps) => {
  const { isFeedback, setData } = props;
  return (
    <div className="taskDescription__section">
      <span>Разрешить добавлять feedback </span>
      <Switch
        checkedChildren={<CheckOutlined />}
        unCheckedChildren={<CloseOutlined />}
        defaultChecked={isFeedback}
        onChange={(checked) => onChange(checked, setData)}
      />
    </div>
  );
};

export default AddFeedback;
