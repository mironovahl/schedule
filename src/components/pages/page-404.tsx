import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';

import './page-404.scss';

const Page404: React.FC = () => (
  <div className="page404">
    <h2>404. Page not found.</h2>
    <Link to="/"><Button>Go to Main Page</Button></Link>
  </div>
);

export default Page404;
