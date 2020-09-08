import React, { useState, useEffect } from 'react';

import { List, Checkbox } from 'antd';

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
        header={<div>Header</div>}
        renderItem={(item) => (
          <List.Item
            className="list-item"
            key={item.id}
          >
            <Checkbox onChange={onChecked} style={{ margin: 10 }} />
            <List.Item.Meta
              title={<a href={item.url}>{item.name}</a>}
              description={item.type}
            />
            <List.Item.Meta className="list-item__description" description={item.description} />
          </List.Item>
        )}
      />
    </PageLayout>
  );
};

export default ListPage;
