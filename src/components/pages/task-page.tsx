import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import TaskDescription from '../task-page/task-description';
import PageLayout from '../page-layout';
import { IEvent } from '../../interfaces/backend-interfaces';
import BackendService from '../../services/backend-service';

type RouteParams = {id: string};

const TaskPage: React.FC = () => {
  const backendService = new BackendService();
  const [loading, setLoading] = useState<boolean>(true);
  const { id } = useParams<RouteParams>();
  const [data, setData] = useState<IEvent | undefined>();
  useEffect(() => {
    setLoading(true);
    backendService.getEvent(id)
      .then((item: IEvent) => {
        setLoading(false);
        console.log(item);
        setData(item);
      })
      .catch(() => setLoading(false));
  }, []);
  return (
    <>
      <PageLayout loading={loading} title={data?.name}>
        <TaskDescription data={data} setData={setData} />
      </PageLayout>

    </>
  );
};

export default TaskPage;
