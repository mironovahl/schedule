import React, { useState } from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';

import './app.scss';
import SettingsContext from '../../context/settings-context';
import SettingsService from '../../services/settings-service';
import {
  MainPage, SchedulePage, Page404, TaskPage,
} from '../pages';
import { ISettings } from '../../interfaces/settings-interfaces';

const Schedule: React.FC = () => {
  const [settings, changeSettings] = useState<ISettings>(SettingsService.getAllSettings());
  const changeContext = (newSettings: ISettings) => {
    changeSettings(newSettings);
  };

  return (
    <SettingsContext.Provider value={{ ...settings, changeContext }}>
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
            path="/task-page/:id"
            component={TaskPage}
          />
          <Route
            component={Page404}
          />
        </Switch>
      </Router>
    </SettingsContext.Provider>
  );
};

export default Schedule;
