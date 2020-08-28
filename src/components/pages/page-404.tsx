import React from 'react';
import { Button } from 'antd';

import { useHistory } from 'react-router-dom';

const Page404: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <h2>404. Page not found.</h2>
      <Button
        onClick={() => history.push('/')}
      >
        Go to Main Page
      </Button>
    </>
  );
};

export default Page404;
