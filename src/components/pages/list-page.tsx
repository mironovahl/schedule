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

  useEffect(() => {
    setLoading(true);
    backendService.getAllEvents()
      .then((data) => {
        setLoading(false);
        setListData([...data]);
      })
      .catch(() => setLoading(false));
  }, []);

  function onChecked(e: { target: { checked: any; }; }) {
    // eslint-disable-next-line no-console
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <PageLayout loading={loading} title="List">
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
            <Checkbox onChange={onChecked} style={{ margin: 10 }} />
            <List.Item.Meta description={moment(item.date).format('DD-MM-YYYY')} />
            <List.Item.Meta title={<a href={item.url}>{item.name}</a>} />
            <RenderTag type={item.type} />
          </List.Item>
        )}
      />
    </PageLayout>
  );
};

export default ListPage;
