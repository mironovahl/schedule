import defaultSettings from '../config/default-settings';
import { IColumnsVisibility } from '../interfaces/table-interfaces';
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

const setHiddenCols = (hiddenCols: IColumnsVisibility): void => {
  localStorage.setItem('hiddenCols', JSON.stringify(hiddenCols));
};

const setUser = (user: string): void => {
  localStorage.setItem('user', user);
};

const setCompletedTask = (completedTask: string[]): void => {
  localStorage.setItem('completedTask', JSON.stringify(completedTask));
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

const getHiddenCols = (): IColumnsVisibility => {
  const hiddenCols: string = localStorage.getItem('hiddenCols') || JSON.stringify(defaultSettings.hiddenCols);
  return JSON.parse(hiddenCols);
};

const getUser = (): string => localStorage.getItem('user') || defaultSettings.user;

const getCompletedTask = (): string[] => {
  const completedTask: string = localStorage.getItem('completedTask') || JSON.stringify(defaultSettings.completedTask);
  return JSON.parse(completedTask);
};

export default class SettingsService {
  static getAllSettings(): SettingsInterfaces.ISettings {
    const scheduleView: SettingsInterfaces.ScheduleView = getScheduleView();
    const timezone: SettingsInterfaces.Timezone = getTimezone();
    const taskSettings: SettingsInterfaces.TaskSettings = getTasksSettings();
    const hiddenRows: string[] = getHiddenRows();
    const hiddenCols: IColumnsVisibility = getHiddenCols();
    const user: string = getUser();
    const completedTask: string[] = getCompletedTask();

    return {
      scheduleView,
      timezone,
      taskSettings,
      hiddenRows,
      hiddenCols,
      user,
      completedTask,
    };
  }

  static setAllSettings(settings: SettingsInterfaces.ISettings): void {
    setTimezone(settings.timezone);
    setScheduleView(settings.scheduleView);
    setTaskSettings(settings.taskSettings);
    setHiddenRows(settings.hiddenRows);
    setHiddenCols(settings.hiddenCols);
    setUser(settings.user);
    setCompletedTask(settings.completedTask);
  }
}
