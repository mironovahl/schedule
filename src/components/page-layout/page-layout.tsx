import React from 'react';
import { Layout, Spin } from 'antd';
import Header from '../header';

const { Content } = Layout;

type TProps = { loading: boolean; title?: string; children: any };

const PageLayout: React.FC<TProps> = (props: TProps) => {
  const { loading, title, children } = props;
  return (
    <Layout style={{ background: 'transparent' }}>
      <Header title={title!} />
      <Content style={{ margin: 16 }}>
        {loading ? <Spin spinning={loading} style={{ width: '100%' }} /> : children}
      </Content>
    </Layout>
  );
};

PageLayout.defaultProps = {
  title: '',
};

export default PageLayout;
