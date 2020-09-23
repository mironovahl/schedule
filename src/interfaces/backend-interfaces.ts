export interface IFeedback {
  'rate': number;
  'comment': string;
}

export interface IFeedbacks {
  isFeedbackEnable: boolean;
  taskFeedbacks: IFeedback[];
}

export interface IEventBackend {
  id: string;
  name: string;
  description: string;
  descriptionUrl: string;
  type: string;
  timeZone: string;
  dateTime: string[];
  place: string;
  comment: string;
  photo: string;
  video: string;
  text: string;
  organizerID: string;
  feedbacks: IFeedbacks;
}

export interface IEvent {
  [key: string]: any;
  key: string;
  id: string;
  name: string;
  description: string;
  url: string;
  type: string;
  startDate: moment.Moment;
  endDate: moment.Moment;
  place: string;
  comment: string;
  photo: string;
  video: string;
  text: string;
  organizerID: string;
  feedbacks: IFeedbacks;
}

export interface IOrganizer {
  id: string;
  name: string;
  github: string;
}
