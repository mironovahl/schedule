import React, { useContext } from 'react';
import { Tag } from 'antd';

import SettingsContext from '../context/settings-context';

interface IProps {
  type: string;
}

const RenderTag: React.FC<IProps> = (props: IProps) => {
  const { type } = props;
  const { taskSettings } = useContext(SettingsContext);
  return (
    <Tag color={taskSettings[type].color}>{taskSettings[type].name}</Tag>
  );
};

export default RenderTag;
