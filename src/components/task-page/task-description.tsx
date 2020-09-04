import React, { useState } from 'react';
import { Typography, DatePicker } from 'antd';
import moment from 'moment';

const { Paragraph, Title } = Typography;

const dateFormat = 'YYYY-MM-DD';

const TaskDescription: React.FC = () => {
  const isMentor: boolean = true;
  const [title, setTitle] = useState('English for kids');
  const [description, setDescription] = useState('English for kids - приложение для изучения английских слов детьми.');
  const date: Date = new Date();
  console.log(moment('2015/01/01', dateFormat));
  return (
    <>
      <Title level={2} editable={isMentor ? { onChange: setTitle } : false}>{title}</Title>
      <p>Начало 22.03.2020</p>
      <div>
        <p>Конец</p>
        <DatePicker defaultValue={moment('2015/01/01', dateFormat)} format={dateFormat} />
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
