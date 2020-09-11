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

export default class SettingsService {
  static getAllSettings(): SettingsInterfaces.ISettings {
    const scheduleView: SettingsInterfaces.ScheduleView = getScheduleView();
    const timezone: SettingsInterfaces.Timezone = getTimezone();
    const taskSettings: SettingsInterfaces.TaskSettings = getTasksSettings();

    return {
      scheduleView,
      timezone,
      taskSettings,
    };
  }

  static setAllSettings(settings: SettingsInterfaces.ISettings): void {
    setTimezone(settings.timezone);
    setScheduleView(settings.scheduleView);
    setTaskSettings(settings.taskSettings);
  }
}
