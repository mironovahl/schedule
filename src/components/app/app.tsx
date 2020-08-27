import React from 'react';
import {
  BrowserRouter as Router, Route, Link, Switch,
} from 'react-router-dom';

import './app.scss';
import { Table, Button } from 'antd';
import 'antd/dist/antd.css';

const dataSource = [
  {
    key: '1',
    date: '26.08.2020',
    time: '10:00',
    name: 'Schedule',
  },
];

const columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
  },
  {
    title: 'Time',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
];

const Schedule: React.FC = () => (
  <Router>
    <Switch>
      <Route
        path="/"
        render={() => <Link to="/schedule"><Button>Go to schedule</Button></Link>}
        exact
      />
      <Route
        path="/schedule"
        render={() => <Table dataSource={dataSource} columns={columns} pagination={false} />}
      />
      <Route
        render={() => <h2>404. Page not found.</h2>}
      />
    </Switch>
  </Router>
);

export default Schedule;
