import React from 'react';
import { List, Rate, Divider } from 'antd';
import { IEvent } from '../../interfaces/backend-interfaces';

interface IProps {
  data: IEvent;
}

const ShowFeeback = ({ data }: IProps) => (

  data.feedbacks.taskFeedbacks.length !== 0
    ? (
      <div className="allFeedbacks">
        <Divider>Отзывы</Divider>
        <List
          className="allFeedbacks-list"
          itemLayout="horizontal"
          dataSource={data.feedbacks.taskFeedbacks}
          renderItem={(item) => (
            <List.Item>
              <div className="feedback-item">
                <Rate disabled defaultValue={item.rate} />
                {item.comment}
              </div>
            </List.Item>
          )}
        />
        <Divider />
      </div>
    ) : null

);

export default ShowFeeback;
