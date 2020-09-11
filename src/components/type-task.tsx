import React, { useContext } from 'react';
import { Tag } from 'antd';
import SettingsContext from '../context/settings-context';

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
  const { taskSettings } = useContext(SettingsContext);
  return (
    <Tag color={taskSettings[type].color}>{EventTypeToName[type]}</Tag>
  );
};

export default RenderTag;
