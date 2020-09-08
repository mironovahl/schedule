export interface IEventBackend {
  id: string;
  name: string;
  description: string;
  descriptionUrl: string;
  type: string;
  timeZone: string;
  dateTime: string;
  place: string;
  comment: string;
}

export interface IEvent {
  id: string;
  name: string;
  description: string;
  url: string;
  type: string;
  date: moment.Moment;
  place: string;
  comment: string;
}
