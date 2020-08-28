import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import './app.scss';
import { MainPage, SchedulePage, Page404 } from '../pages';

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
        component={Page404}
      />
    </Switch>
  </Router>
);

export default Schedule;
