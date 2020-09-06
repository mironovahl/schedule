/* eslint-disable sonarjs/prefer-immediate-return */
import { IEventBackend, IEvent } from '../interfaces/backend-interfaces';

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

  postData = async (url: string, data: object) => {
    const res: Response = await fetch(`${this.apiBase}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Could not post ${url}, received ${res.status}`);
    }
    const content = await res.json();
    return content;
  }

  setNewEvent = async (event: IEvent) => {
    const res: Response = await this.postData('/event', this.transformEventsToBackend(event));

    if (!res.ok) {
      throw new Error(`Could not post event, received ${res.status}`);
    }
  }

  putData = async (url: string, data: object) => {
    const res: Response = await fetch(`${this.apiBase}${url}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Could not put ${url}, received ${res.status}`);
    }
  }

  updateEvent = async (event: IEvent) => {
    await this.putData(`/event/${event.id}`, this.transformEventsToBackend(event));
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

  transformEventsToFrontend = (event: IEventBackend):IEvent => {
    const { dateTime } = event;
    const date = new Date(dateTime);
    return (
      {
        id: event.id,
        name: event.name,
        description: event.description,
        url: event.descriptionUrl,
        type: event.type,
        date,
        place: event.place,
        comment: event.comment,
      }
    );
  }

  transformEventsToBackend = (event: IEvent):IEventBackend => {
    const date = new Date();
    const dateStr = date.toISOString();
    const timeZone = date.getTimezoneOffset().toString();
    return (
      {
        id: event.id,
        name: event.name,
        description: event.description,
        descriptionUrl: event.url,
        type: event.type,
        timeZone,
        dateTime: dateStr,
        place: event.place,
        comment: event.comment,
      }
    );
  }
}
