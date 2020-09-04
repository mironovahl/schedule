import React from 'react';
import TaskDescription from '../task-page/task-description';
import PageLayout from '../page-layout';

const TaskPage: React.FC = () => {
  const loading: boolean = true;
  return (
    <>
      <PageLayout loading={loading} title="Schedule">
        <TaskDescription />
      </PageLayout>

    </>
  );
};

export default TaskPage;
