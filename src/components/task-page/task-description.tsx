import React, { useState } from 'react';
import { Typography, DatePicker } from 'antd';
import moment from 'moment';

const { Paragraph, Title } = Typography;

const dateRenderer = (value: string) => (value ? moment(value, 'YYYY-MM-DD') : '');
const TaskDescription: React.FC = () => {
  const [title, setTitle] = useState('English for kids');
  const [description, setDescription] = useState('English for kids - приложение для изучения английских слов детьми.');
  const isMentor: boolean = true;

  const date: Date = new Date();
  const dat = Intl.DateTimeFormat().format(date);
  const startDay = dateRenderer(dat);

  return (
    <>
      <Title level={2} editable={isMentor ? { onChange: setTitle } : false}>{title}</Title>
      <p>Начало 22.03.2020</p>
      <div>
        <p>Конец</p>
        <DatePicker defaultValue={moment(startDay)} />
      </div>
      <p>Задание</p>
      <h3>Описание</h3>
      <Paragraph
        editable={isMentor ? { onChange: setDescription } : false}
      >
        {description}
      </Paragraph>
      <h3>Комментарий</h3>
      <Paragraph editable={isMentor ? { onChange: setTitle } : false}>{title}</Paragraph>
    </>
  );
};
export default TaskDescription;
