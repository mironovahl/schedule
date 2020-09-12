export type Timezone = 'Europe/London'
  | 'Europe/Warsaw'
  | 'Europe/Kiev'
  | 'Europe/Minsk'
  | 'Europe/Moscow'
  | 'Europe/Volgograd'
  | 'Asia/Yekaterinburg'
  | 'Asia/Tashkent'
  | 'Asia/Tbilisi';

export type ScheduleView = 'table' | 'calendar' | 'list';

export interface ITaskColors {
  color: string;
  fontColor: string;
  name: string;
}

export type TaskSettings = Record<string, ITaskColors>;

export interface ISettings {
  scheduleView: ScheduleView;
  timezone: Timezone;
  taskSettings: TaskSettings;
}
