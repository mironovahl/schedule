import React from 'react';
import {
  Form,
  Input,
  Button,
  Rate,
} from 'antd';
import { IEvent, IFeedbacks, IFeedback } from '../../interfaces/backend-interfaces';

import BackendService from '../../services/backend-service';

interface IProps {
  rate: number;
  comment: string;
}
interface IPropsData {
  setData: React.Dispatch<React.SetStateAction<IEvent | null>>;
}

const Feedback: React.FC<IPropsData> = ({ setData }: IPropsData) => {
  const backendService = new BackendService();
  const onFinish = (values: IProps) => {
    const { rate, comment } = values;
    setData((oldData: IEvent | null) => {
      if (oldData) {
        const newFeedback: IFeedback = {
          rate,
          comment,
        };
        const newTaskFeedbacks: IFeedback[] = [...oldData.feedbacks.taskFeedbacks, newFeedback];
        const newFeedbacks: IFeedbacks = {
          ...oldData.feedbacks,
          taskFeedbacks: newTaskFeedbacks,
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
  };

  return (
    <div className="task-feedback">

      <h3>Оцените задание</h3>

      <Form
        name="feedback-form"
        onFinish={onFinish}
        initialValues={{
          rate: 3,
        }}
      >

        <Form.Item name="rate" label="Rate">
          <Rate />
        </Form.Item>
        <Form.Item
          name="comment"
          label="Comment"
        >
          <Input placeholder="Поделитесь впечатлениями (необязательно)" />
        </Form.Item>

        <Form.Item className="feedback-button">
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Feedback;
