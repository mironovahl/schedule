import { ISettings } from '../interfaces/settings-interfaces';

const defaultSettings: ISettings = {
  scheduleView: 'table',
  timezone: 'Europe/Minsk',
  taskSettings: {
    deadline: {
      color: 'red',
      fontColor: 'red',
      name: 'deadline',
    },
    test: {
      color: '#63ab91',
      fontColor: '#63ab91',
      name: 'test',
    },
    task: {
      color: 'green',
      fontColor: 'green',
      name: 'task',
    },
    jstask: {
      color: 'green',
      fontColor: 'green',
      name: 'js task',
    },
    htmltask: {
      color: 'green',
      fontColor: 'green',
      name: 'html task',
    },
    selfeducation: {
      color: 'green',
      fontColor: 'green',
      name: 'self education',
    },
    externaltask: {
      color: 'green',
      fontColor: 'green',
      name: 'external task',
    },
    codewars: {
      color: 'green',
      fontColor: 'green',
      name: 'codewars',
    },
    codejam: {
      color: 'green',
      fontColor: 'green',
      name: 'code-jam',
    },
    newtask: {
      color: 'green',
      fontColor: 'green',
      name: 'new task',
    },
    lecture: {
      color: 'blue',
      fontColor: 'blue',
      name: 'lecture',
    },
    lecture_online: {
      color: 'blue',
      fontColor: 'blue',
      name: 'online lecture',
    },
    lecture_offline: {
      color: 'blue',
      fontColor: 'blue',
      name: 'offline lecture',
    },
    lecture_mixed: {
      color: 'blue',
      fontColor: 'blue',
      name: 'mixed lecture',
    },
    lecture_self_study: {
      color: 'blue',
      fontColor: 'blue',
      name: 'self study lecture',
    },
    info: {
      color: '#ff7b00',
      fontColor: '#ff7b00',
      name: 'info',
    },
    warmup: {
      color: '#ff7b00',
      fontColor: '#ff7b00',
      name: 'warm-up',
    },
    meetup: {
      color: '#ff7b00',
      fontColor: '#ff7b00',
      name: 'meetup',
    },
    workshop: {
      color: '#ff7b00',
      fontColor: '#ff7b00',
      name: 'workshop',
    },
    interview: {
      color: '#ff7b00',
      fontColor: '#ff7b00',
      name: 'interview',
    },
  },
  hiddenRows: [],
  hiddenCols: [],
};

export default defaultSettings;
