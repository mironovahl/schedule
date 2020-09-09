import React, { useState, useEffect } from 'react';

import BackendService from '../../services/backend-service';
import PageLayout from '../page-layout';
import Table from '../table';
import { IEvent } from '../../interfaces/backend-interfaces';
import Calendar from '../calendar';

const SchedulePage: React.FC = () => {
  const backendService = new BackendService();
  const [tableData, setTableData] = useState<IEvent[]>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    backendService.getAllEvents()
      .then((data) => {
        setLoading(false);
        setTableData([...data]);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <PageLayout loading={loading} title="Schedule">
      <Table dataSource={tableData} />
      <Calendar dataSource={tableData} />
    </PageLayout>
  );
};

export default SchedulePage;
