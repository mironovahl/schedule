type Timezone ='Europe/London'
  | 'Europe/Warsaw'
  | 'Europe/Kiev'
  | 'Europe/Minsk'
  | 'Europe/Moscow'
  | 'Europe/Volgograd'
  | 'Europe/Yekaterinburg'
  | 'Asia/Tashkent'
  | 'Asia/Tbilisi';

type ScheduleView = 'table' | 'calendar' | 'list';

type ITaskColors = {
  color: string;
  fontColor: string;
}

interface ITaskSettings {
  deadline: ITaskColors;
  test: ITaskColors;
  // task: ITaskColors;
  // jstask: ITaskColors;
  // htmltask: ITaskColors;
  // selfeducation: ITaskColors;
  // externaltask: ITaskColors;
  // codewars: ITaskColors;
  // codejam: ITaskColors;
  // newtask: ITaskColors;
  // lecture: ITaskColors;
  // 'lecture_online': ITaskColors;
  // 'lecture_offline': ITaskColors;
  // 'lecture_mixed': ITaskColors;
  // 'lecture_self_study': ITaskColors;
  // info: ITaskColors;
  // warmup: ITaskColors;
  // meetup: ITaskColors;
  // workshop: ITaskColors;
  // interview: ITaskColors;
}

export interface ISettings {
  scheduleView: ScheduleView;
  timezone: Timezone;
  taskSettings: ITaskSettings;
}
