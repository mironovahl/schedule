import { ISettings } from '../interfaces/settings-interfaces';

const defaultValues: ISettings = {
  scheduleView: 'table',
  timezone: 'Europe/Minsk',
  taskSettings: {
    deadline: {
      color: 'red',
      fontColor: 'red',
    },
    test: {
      color: '#63ab91',
      fontColor: '#63ab91',
    },
  },
};

export default class SettingsService {
  static setTimezone(timezone: typeof defaultValues.timezone): void {
    localStorage.setItem('timezone', timezone);
  }

  static getTimezone(): string {
    return localStorage.getItem('timezone') || defaultValues.timezone;
  }

  static setScheduleView(scheduleView: typeof defaultValues.scheduleView): void {
    localStorage.setItem('scheduleView', scheduleView);
  }

  static getScheduleView(): string {
    return localStorage.getItem('scheduleView') || defaultValues.scheduleView;
  }

  static setTaskColor(taskType: keyof typeof defaultValues.taskSettings, taskColor: string): void {
    const taskSettings: string = localStorage.getItem('taskSettings') || JSON.stringify(defaultValues.taskSettings);

    const newTaskSettings: typeof defaultValues.taskSettings = JSON.parse(taskSettings);
    newTaskSettings[taskType].color = taskColor;

    localStorage.setItem('taskSettings', JSON.stringify(newTaskSettings));
  }

  static getTaskColor(taskType: keyof typeof defaultValues.taskSettings): string {
    const taskSettings: string | null = localStorage.getItem('taskSettings');
    return taskSettings !== null
      ? JSON.parse(taskSettings)[taskType].color
      : defaultValues.taskSettings[taskType].color;
  }

  static setTaskFontColor(
    taskType: keyof typeof defaultValues.taskSettings,
    fontColor: string,
  ): void {
    const taskSettings: string = localStorage.getItem('taskSettings') || JSON.stringify(defaultValues.taskSettings);

    const newTaskSettings: typeof defaultValues.taskSettings = JSON.parse(taskSettings);
    newTaskSettings[taskType].fontColor = fontColor;

    localStorage.setItem('taskSettings', JSON.stringify(newTaskSettings));
  }

  static getTaskFontColor(taskType: keyof typeof defaultValues.taskSettings): string {
    const taskSettings: string | null = localStorage.getItem('taskSettings');
    return taskSettings !== null
      ? JSON.parse(taskSettings)[taskType].fontColor
      : defaultValues.taskSettings[taskType].fontColor;
  }
}
