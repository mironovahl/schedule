import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import './app.scss';
import {
  MainPage,
  SchedulePage,
  Page404,
  ListPage,
  TaskPage,
} from '../pages';

const Schedule: React.FC = () => (
  <Router>
    <Switch>
      <Route
        path="/"
        component={MainPage}
        exact
      />
      <Route
        path="/schedule"
        component={SchedulePage}
      />
      <Route
        path="/list"
        component={ListPage}
      />
      <Route
        path="/task-page/:id"
        component={TaskPage}
      />
      <Route
        component={Page404}
      />
    </Switch>
  </Router>
);

export default Schedule;
