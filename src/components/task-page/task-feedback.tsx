import React from 'react';
import {
  Form,
  Input,
  Button,
  Rate,
} from 'antd';

interface IProps {
  rate: number;
  feedback: string;
}

const Feedback = () => {
  const onFinish = (values: IProps) => {
    console.log('Received values of form: ', values);
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
          name="feedback"
          label="Feedback"
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
