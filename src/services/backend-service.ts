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
    return res.data.map(this.transformEvents);
  }

  postData = async (url: string, data: object) => {
    const res: Response = await fetch(`${this.apiBase}${url}`, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error(`Could not post ${url}, received ${res.status}`);
    }
  }

  setNewEvent = async () => {
    const date = new Date().toISOString();
    await this.postData('event', {
      date,
    });
  }

  transformEvents = (event: IEventBackend):IEvent => {
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
}
