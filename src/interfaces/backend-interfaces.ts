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
}

export interface IEvent {
  [key: string]: any
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
}
