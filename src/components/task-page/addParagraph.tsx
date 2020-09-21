import React from 'react';
import { Typography } from 'antd';
import { IEvent } from '../../interfaces/backend-interfaces';

const { Paragraph } = Typography;

interface IProps {
  data: IEvent;
  property: string;
  isMentor: boolean;
}
const AddParagraph: React.FC = (props: IProps) => {
  const { data, property, isMentor } = props;

  return (
    <Paragraph
      editable={isMentor ? { onChange: (e) => changeValue(e, property) } : false}
    >
      {data?.[property]}
    </Paragraph>
  );
};

export default AddParagraph;
