/* eslint-disable sonarjs/prefer-immediate-return */
import moment from 'moment';
import { IEventBackend, IEvent, IOrganizer } from '../interfaces/backend-interfaces';

export default class BackendService {
  apiBase: string = 'https://rs-react-schedule.firebaseapp.com/api/team/hl12';

  getResource = async (url: string) => {
    const res: Response = await fetch(`${this.apiBase}${url}`, {
      method: 'GET',
    });

    if (!res.ok) {
      throw new Error(`Could not get ${url}, received ${res.status}`);
    }
    const content = await res.json();
    return content;
  };

  getAllEvents = async (): Promise<IEvent[]> => {
    const res = await this.getResource('/events');
    return res.data.map(this.transformEventsToFrontend);
  }

  getEvent = async (id: string): Promise<IEvent> => {
    const res = await this.getResource(`/event/${id}`);
    return this.transformEventsToFrontend(res);
  }

  getAllOrganizers = async (): Promise<IOrganizer[]> => {
    const res = await this.getResource('/organizers');
    return res.data;
  }

  getOrganizer = async (id: string): Promise<IOrganizer> => {
    const res = await this.getResource(`/organizer/${id}`);
    return res;
  }

  postData = async (url: string, data: object) => {
    const res: Response = await fetch(`${this.apiBase}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Could not post ${url}, received ${res.status}`);
    }
    const content = await res.json();
    return content;
  }

  setNewEvent = async (event: IEvent) => {
    await this.postData('/event', this.transformEventsToBackend(event));
  }

  setNewOrganizer = async (organizer: IOrganizer) => {
    await this.postData('/organizer', organizer);
  }

  putData = async (url: string, data: object) => {
    const res: Response = await fetch(`${this.apiBase}${url}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Could not put ${url}, received ${res.status}`);
    }
  }

  updateEvent = async (event: IEvent) => {
    await this.putData(`/event/${event.id}`, this.transformEventsToBackend(event));
  }

  updateOrganizer = async (organizer: IOrganizer) => {
    await this.putData(`/organizer/${organizer.id}`, organizer);
  }

  deleteData = async (url: string) => {
    const res: Response = await fetch(`${this.apiBase}${url}`, {
      method: 'DELETE',
    });

    if (!res.ok) {
      throw new Error(`Could not put ${url}, received ${res.status}`);
    }
  }

  deleteEvent = async (id: string) => {
    await this.deleteData(`/event/${id}`);
  }

  deleteOrganizer = async (id: string) => {
    await this.deleteData(`/organizer/${id}`);
  }

  transformEventsToFrontend = (event: IEventBackend): IEvent => {
    const { dateTime: [start, end] } = event;
    const startDate = moment(start);
    const endDate = moment(end);
    return (
      {
        id: event.id,
        key: event.id,
        name: event.name,
        description: event.description,
        url: event.descriptionUrl,
        type: event.type,
        startDate,
        endDate,
        place: event.place,
        comment: event.comment,
        photo: event.photo,
        video: event.video,
        text: event.text,
        feedbacks: event.feedbacks,
      }
    );
  }

  transformEventsToBackend = (event: IEvent): IEventBackend => {
    const { startDate, endDate } = event;
    const startDateStr = startDate.toISOString();
    const endDateStr = endDate.toISOString();
    const timeZone = '0';
    const defaultFeedback = {
      isFeedbackEnable: true,
      taskFeedbacks: [],
    };

    return (
      {
        id: event.id,
        name: event.name,
        description: event.description,
        descriptionUrl: event.url,
        type: event.type,
        timeZone,
        dateTime: [startDateStr, endDateStr],
        place: event.place,
        comment: event.comment,
        photo: event.photo || '',
        video: event.video || '',
        text: event.text || '',
        feedbacks: event.feedbacks || defaultFeedback,
      }
    );
  }
}
