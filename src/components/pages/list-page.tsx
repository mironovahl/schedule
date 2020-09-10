import React, { useState, useEffect } from 'react';

import { List, Checkbox } from 'antd';

import moment from 'moment';
import RenderTag from '../type-task';
import BackendService from '../../services/backend-service';
import PageLayout from '../page-layout';
import { IEvent } from '../../interfaces/backend-interfaces';

import './list-page.scss';

const ListPage: React.FC = () => {
  const backendService = new BackendService();
  const [listData, setListData] = useState<IEvent[]>();
  const [loading, setLoading] = useState<boolean>(true);
  let selected: never[] = [];

  useEffect(() => {
    setLoading(true);
    backendService.getAllEvents()
      .then((data) => {
        setLoading(false);
        setListData([...data]);
      })
      .catch(() => setLoading(false));
  }, []);

  const onChange = (checkedValues: any) => {
    selected = checkedValues;
    localStorage.setItem('checked', JSON.stringify(selected));
  };

  return (
    <PageLayout loading={loading} title="List">
      <Checkbox.Group onChange={onChange} style={{ width: '100%' }}>
        <List
          itemLayout="horizontal"
          dataSource={listData}
          pagination={{
            pageSize: 6,
          }}
          renderItem={(item) => (
            <List.Item
              className="list-item"
              key={item.id}
              actions={[<a href={`/task-page/${item.id}`} key="list-item__load-more">more</a>]}
            >
              <Checkbox value={item.id} style={{ margin: 10 }} />
              <List.Item.Meta
                title={item.name}
                description={<RenderTag type={item.type} />}
              />
              <List.Item.Meta description={(
                <a
                  href={item.url}
                  rel="noreferrer"
                  target="_blank"
                >
                  Ссылка
                </a>
            )}
              />
              <List.Item.Meta
                title={moment(item.date).format('DD-MM-YYYY')}
                description={moment(item.date).format('h:mm')}
              />
            </List.Item>
          )}
        />
      </Checkbox.Group>
    </PageLayout>
  );
};

export default ListPage;
