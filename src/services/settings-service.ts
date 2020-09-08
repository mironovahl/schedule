import defaultSettings from '../config/default-settings';
import * as SettingsInterfaces from '../interfaces/settings-interfaces';

export default class SettingsService {
  static setTimezone(timezone: typeof defaultSettings.timezone): void {
    localStorage.setItem('timezone', timezone);
  }

  static getTimezone(): string {
    return localStorage.getItem('timezone') || defaultSettings.timezone;
  }

  static setScheduleView(scheduleView: typeof defaultSettings.scheduleView): void {
    localStorage.setItem('scheduleView', scheduleView);
  }

  static getScheduleView(): SettingsInterfaces.ScheduleView {
    return localStorage.getItem('scheduleView') as SettingsInterfaces.ScheduleView || defaultSettings.scheduleView;
  }

  static setTaskColor(
    taskType: keyof typeof defaultSettings.taskSettings,
    taskColor: string,
  ): void {
    const taskSettings: string = localStorage.getItem('taskSettings') || JSON.stringify(defaultSettings.taskSettings);

    const newTaskSettings: typeof defaultSettings.taskSettings = JSON.parse(taskSettings);
    newTaskSettings[taskType].color = taskColor;

    localStorage.setItem('taskSettings', JSON.stringify(newTaskSettings));
  }

  static getTaskColor(taskType: keyof typeof defaultSettings.taskSettings): string {
    const taskSettings: string | null = localStorage.getItem('taskSettings');
    return taskSettings !== null
      ? JSON.parse(taskSettings)[taskType].color
      : defaultSettings.taskSettings[taskType].color;
  }

  static setTaskFontColor(
    taskType: keyof typeof defaultSettings.taskSettings,
    fontColor: string,
  ): void {
    const taskSettings: string = localStorage.getItem('taskSettings') || JSON.stringify(defaultSettings.taskSettings);

    const newTaskSettings: typeof defaultSettings.taskSettings = JSON.parse(taskSettings);
    newTaskSettings[taskType].fontColor = fontColor;

    localStorage.setItem('taskSettings', JSON.stringify(newTaskSettings));
  }

  static getTaskFontColor(taskType: keyof typeof defaultSettings.taskSettings): string {
    const taskSettings: string | null = localStorage.getItem('taskSettings');
    return taskSettings !== null
      ? JSON.parse(taskSettings)[taskType].fontColor
      : defaultSettings.taskSettings[taskType].fontColor;
  }
}
