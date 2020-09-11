import defaultSettings from '../config/default-settings';
import * as SettingsInterfaces from '../interfaces/settings-interfaces';

export default class SettingsService {
  static setTimezone(timezone: SettingsInterfaces.Timezone): void {
    localStorage.setItem('timezone', timezone);
  }

  static getTimezone(): SettingsInterfaces.Timezone {
    if (localStorage.getItem('timezone') === null) {
      const timezone = Intl.DateTimeFormat()
        .resolvedOptions().timeZone as SettingsInterfaces.Timezone;
      SettingsService.setTimezone(timezone);
    }
    return localStorage.getItem('timezone') as SettingsInterfaces.Timezone || defaultSettings.timezone;
  }

  static setScheduleView(scheduleView: SettingsInterfaces.ScheduleView): void {
    localStorage.setItem('scheduleView', scheduleView);
  }

  static getScheduleView(): SettingsInterfaces.ScheduleView {
    return localStorage.getItem('scheduleView') as SettingsInterfaces.ScheduleView || defaultSettings.scheduleView;
  }

  static getTasksSettings(): SettingsInterfaces.ITaskSettings {
    const taskSettings: string = localStorage.getItem('taskSettings') || JSON.stringify(defaultSettings.taskSettings);
    return JSON.parse(taskSettings);
  }

  static setTaskSettings(taskSettings: SettingsInterfaces.ITaskSettings): void {
    localStorage.setItem('taskSettings', JSON.stringify(taskSettings));
  }

  static setTaskColor(
    taskType: keyof SettingsInterfaces.ITaskSettings,
    taskColor: string,
  ): void {
    const taskSettings: SettingsInterfaces.ITaskSettings = SettingsService.getTasksSettings();

    taskSettings[taskType].color = taskColor;
    localStorage.setItem('taskSettings', JSON.stringify(taskSettings));
  }

  static getTaskColor(taskType: keyof SettingsInterfaces.ITaskSettings): string {
    const taskSettings: string | null = localStorage.getItem('taskSettings');
    return taskSettings !== null
      ? JSON.parse(taskSettings)[taskType].color
      : defaultSettings.taskSettings[taskType].color;
  }

  static setTaskFontColor(
    taskType: keyof SettingsInterfaces.ITaskSettings,
    fontColor: string,
  ): void {
    const taskSettings: SettingsInterfaces.ITaskSettings = SettingsService.getTasksSettings();

    taskSettings[taskType].fontColor = fontColor;
    localStorage.setItem('taskSettings', JSON.stringify(taskSettings));
  }

  static getTaskFontColor(taskType: keyof SettingsInterfaces.ITaskSettings): string {
    const taskSettings: string | null = localStorage.getItem('taskSettings');
    return taskSettings !== null
      ? JSON.parse(taskSettings)[taskType].fontColor
      : defaultSettings.taskSettings[taskType].fontColor;
  }

  static getAllSettings(): SettingsInterfaces.ISettings {
    const scheduleView: SettingsInterfaces.ScheduleView = SettingsService.getScheduleView();
    const timezone: SettingsInterfaces.Timezone = SettingsService.getTimezone();
    const taskSettings: SettingsInterfaces.ITaskSettings = SettingsService.getTasksSettings();

    return {
      scheduleView,
      timezone,
      taskSettings,
    };
  }
}
