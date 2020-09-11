import React from 'react';
import { ISettings } from '../interfaces/settings-interfaces';
import defaultSettings from '../config/default-settings';

const settings: ISettings = defaultSettings;
const changeContext: (newSettings: object) => void = () => {};

const SettingsContext = React.createContext({
  ...settings,
  changeContext,
});

export default SettingsContext;
