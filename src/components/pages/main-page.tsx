import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Layout } from 'antd';
import Header from '../header';

const { Content } = Layout;

const MainPage: React.FC = () => (
  <Layout style={{ minHeight: '100vh', background: '#fff' }}>
    <Header title="" />
    <Content style={{ margin: '16px 16px 32px' }}>
      <Link to="/schedule"><Button>Go to schedule</Button></Link>
    </Content>
  </Layout>

);

export default MainPage;
