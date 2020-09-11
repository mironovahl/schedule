import defaultSettings from '../config/default-settings';
import * as SettingsInterfaces from '../interfaces/settings-interfaces';

const setTimezone = (timezone: SettingsInterfaces.Timezone): void => {
  localStorage.setItem('timezone', timezone);
};

const setScheduleView = (scheduleView: SettingsInterfaces.ScheduleView): void => {
  localStorage.setItem('scheduleView', scheduleView);
};

const setTaskSettings = (taskSettings: SettingsInterfaces.TaskSettings): void => {
  localStorage.setItem('taskSettings', JSON.stringify(taskSettings));
};

const setHiddenRows = (hiddenRows: string[]): void => {
  localStorage.setItem('hiddenRows', JSON.stringify(hiddenRows));
};

const setHiddenCols = (hiddenCols: string[]): void => {
  localStorage.setItem('hiddenCols', JSON.stringify(hiddenCols));
};

const getTimezone = (): SettingsInterfaces.Timezone => {
  if (localStorage.getItem('timezone') === null) {
    const timezone = Intl.DateTimeFormat()
      .resolvedOptions().timeZone as SettingsInterfaces.Timezone;
    setTimezone(timezone);
  }
  return localStorage.getItem('timezone') as SettingsInterfaces.Timezone || defaultSettings.timezone;
};

const getScheduleView = (): SettingsInterfaces.ScheduleView => localStorage
  .getItem('scheduleView') as SettingsInterfaces.ScheduleView || defaultSettings.scheduleView;

const getTasksSettings = (): SettingsInterfaces.TaskSettings => {
  const taskSettings: string = localStorage.getItem('taskSettings') || JSON.stringify(defaultSettings.taskSettings);
  return JSON.parse(taskSettings);
};

const getHiddenRows = (): string[] => {
  const hiddenRows: string = localStorage.getItem('hiddenRows') || JSON.stringify(defaultSettings.hiddenRows);
  return JSON.parse(hiddenRows);
};

const getHiddenCols = (): string[] => {
  const hiddenCols: string = localStorage.getItem('hiddenCols') || JSON.stringify(defaultSettings.hiddenCols);
  return JSON.parse(hiddenCols);
};

export default class SettingsService {
  static getAllSettings(): SettingsInterfaces.ISettings {
    const scheduleView: SettingsInterfaces.ScheduleView = getScheduleView();
    const timezone: SettingsInterfaces.Timezone = getTimezone();
    const taskSettings: SettingsInterfaces.TaskSettings = getTasksSettings();
    const hiddenRows: string[] = getHiddenRows();
    const hiddenCols: string[] = getHiddenCols();

    return {
      scheduleView,
      timezone,
      taskSettings,
      hiddenRows,
      hiddenCols,
    };
  }

  static setAllSettings(settings: SettingsInterfaces.ISettings): void {
    setTimezone(settings.timezone);
    setScheduleView(settings.scheduleView);
    setTaskSettings(settings.taskSettings);
    setHiddenRows(settings.hiddenRows);
    setHiddenCols(settings.hiddenCols);
  }
}
