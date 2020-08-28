import React from 'react';
import { Link } from 'react-router-dom';

import { Button } from 'antd';

const MainPage: React.FC = () => (
  <Link to="/schedule"><Button>Go to schedule</Button></Link>
);

export default MainPage;
