import defaultSettings from '../config/default-settings';
import * as SettingsInterfaces from '../interfaces/settings-interfaces';

export default class SettingsService {
  static setTimezone(timezone: SettingsInterfaces.Timezone): void {
    localStorage.setItem('timezone', timezone);
  }

  static getTimezone(): SettingsInterfaces.Timezone {
    return localStorage.getItem('timezone') as SettingsInterfaces.Timezone || defaultSettings.timezone;
  }

  static setScheduleView(scheduleView: SettingsInterfaces.ScheduleView): void {
    localStorage.setItem('scheduleView', scheduleView);
  }

  static getScheduleView(): SettingsInterfaces.ScheduleView {
    return localStorage.getItem('scheduleView') as SettingsInterfaces.ScheduleView || defaultSettings.scheduleView;
  }

  static setTaskColor(
    taskType: keyof SettingsInterfaces.ITaskSettings,
    taskColor: string,
  ): void {
    const taskSettings: string = localStorage.getItem('taskSettings') || JSON.stringify(defaultSettings.taskSettings);

    const newTaskSettings: SettingsInterfaces.ITaskSettings = JSON.parse(taskSettings);
    newTaskSettings[taskType].color = taskColor;

    localStorage.setItem('taskSettings', JSON.stringify(newTaskSettings));
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
    const taskSettings: string = localStorage.getItem('taskSettings') || JSON.stringify(defaultSettings.taskSettings);

    const newTaskSettings: typeof defaultSettings.taskSettings = JSON.parse(taskSettings);
    newTaskSettings[taskType].fontColor = fontColor;

    localStorage.setItem('taskSettings', JSON.stringify(newTaskSettings));
  }

  static getTaskFontColor(taskType: keyof SettingsInterfaces.ITaskSettings): string {
    const taskSettings: string | null = localStorage.getItem('taskSettings');
    return taskSettings !== null
      ? JSON.parse(taskSettings)[taskType].fontColor
      : defaultSettings.taskSettings[taskType].fontColor;
  }
}
