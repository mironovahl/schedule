import { ISettings } from '../interfaces/settings-interfaces';

const defaultSettings: ISettings = {
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
    task: {
      color: 'green',
      fontColor: 'green',
    },
    jstask: {
      color: 'green',
      fontColor: 'green',
    },
    htmltask: {
      color: 'green',
      fontColor: 'green',
    },
    selfeducation: {
      color: 'green',
      fontColor: 'green',
    },
    externaltask: {
      color: 'green',
      fontColor: 'green',
    },
    codewars: {
      color: 'green',
      fontColor: 'green',
    },
    codejam: {
      color: 'green',
      fontColor: 'green',
    },
    newtask: {
      color: 'green',
      fontColor: 'green',
    },
    lecture: {
      color: 'blue',
      fontColor: 'blue',
    },
    lecture_online: {
      color: 'blue',
      fontColor: 'blue',
    },
    lecture_offline: {
      color: 'blue',
      fontColor: 'blue',
    },
    lecture_mixed: {
      color: 'blue',
      fontColor: 'blue',
    },
    lecture_self_study: {
      color: 'blue',
      fontColor: 'blue',
    },
    info: {
      color: '#ff7b00',
      fontColor: '#ff7b00',
    },
    warmup: {
      color: '#ff7b00',
      fontColor: '#ff7b00',
    },
    meetup: {
      color: '#ff7b00',
      fontColor: '#ff7b00',
    },
    workshop: {
      color: '#ff7b00',
      fontColor: '#ff7b00',
    },
    interview: {
      color: '#ff7b00',
      fontColor: '#ff7b00',
    },
  },
};

export default defaultSettings;
