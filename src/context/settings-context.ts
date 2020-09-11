import React from 'react';
import { ISettings } from '../interfaces/settings-interfaces';
import defaultSettings from '../config/default-settings';

const settings: ISettings = defaultSettings;
<<<<<<< HEAD
const changeContext: (newSettings: object) => void = () => {};
=======
const changeContext: (newSettings: ISettings) => void = () => {};
>>>>>>> develop

const SettingsContext = React.createContext({
  ...settings,
  changeContext,
});

export default SettingsContext;
