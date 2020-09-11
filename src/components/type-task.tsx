import React from 'react';
import { Tag } from 'antd';
// import SettingsContext from '../context/settings-context';

const colorTagName: Record<string, string> = {
  deadline: 'red',
  test: '#63ab91',
  task: 'green',
  jstask: 'green',
  htmltask: 'green',
  selfeducation: 'green',
  externaltask: 'green',
  codewars: 'green',
  codejam: 'green',
  newtask: 'green',
  lecture: 'blue',
  lecture_online: 'blue',
  lecture_offline: 'blue',
  lecture_mixed: 'blue',
  lecture_self_study: 'blue',
  info: '#ff7b00',
  warmup: '#63ab91',
  meetup: '#bde04a',
  workshop: '#bde04a',
  interview: '#63ab91',
};

const EventTypeToName: Record<string, string> = {
  deadline: 'deadline',
  task: 'task',
  test: 'test',
  newtask: 'newtask',
  lecture: 'lecture',
  lecture_online: 'online lecture',
  lecture_offline: 'offline lecture',
  lecture_mixed: 'mixed lecture',
  lecture_self_study: 'self study',
  warmup: 'warm-up',
  jstask: 'js task',
  kotlintask: 'kotlin task',
  objctask: 'objc task',
  htmltask: 'html task',
  codejam: 'code jam',
  externaltask: 'external task',
  codewars: 'codewars',
  selfeducation: 'self education',
};

interface IProps {
  type: string;
}

const RenderTag: React.FC<IProps> = (props: IProps) => {
  const { type } = props;
  // const { taskSettings } = useContext(SettingsContext);
  return (
    <Tag color={colorTagName[type]}>{EventTypeToName[type]}</Tag>
  );
};

export default RenderTag;
