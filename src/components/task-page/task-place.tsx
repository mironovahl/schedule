import React, {
  Dispatch, SetStateAction, useEffect, useState,
} from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { Typography } from 'antd';
import { IEvent } from '../../interfaces/backend-interfaces';
import BackendService from '../../services/backend-service';

const { Paragraph } = Typography;

const API_KEY = '32357e55-ae68-4e2d-a73d-8dbe45633551';

interface IProps {
  data: IEvent;
  setData: Dispatch<SetStateAction<IEvent | null>>;
}

const searchGeo = async (place: string) => {
  try {
    const url = `https://geocode-maps.yandex.ru/1.x/?format=json&apikey=${API_KEY}&geocode=${place}`;
    const res = await fetch(url);
    return await res.json();
  } catch (err) {
    return 'no location';
  }
};

const TaskPlace: React.FC<IProps> = (props: IProps) => {
  const { data, setData } = props;
  const backendService = new BackendService();
  const { type, place } = data;

  const changeValue = (event: string, property: string): void => {
    setData((oldData: IEvent | null) => {
      if (oldData) {
        const newData = {
          ...oldData,
          [property]: event,
        };
        backendService.updateEvent(newData);
        return newData;
      }
      return oldData;
    });
  };

  const [placeGeo, setPlaceGeo] = useState<Array<number>>([]);
  if (type === 'lecture_offline') {
    useEffect(() => {
      searchGeo(place)
        .then((item) => {
          const coordinate = item.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
          setPlaceGeo(coordinate.split(' ').reverse().map(Number));
        });
    }, []);
  }

  return (
    <>
      {type === 'lecture_offline'
        ? (
          <>
            <Paragraph
              editable={{ onChange: (e) => changeValue(e, 'place') }}
            >
              {place}
            </Paragraph>
            <div className="task-place">
              <YMaps>
                <Map defaultState={{ center: placeGeo, zoom: 14 }}>
                  <Placemark geometry={placeGeo} />
                </Map>
              </YMaps>
            </div>
          </>
        )
        : (
          <Paragraph editable={{ onChange: (e) => changeValue(e, 'place') }}>
            {place}
          </Paragraph>
        )}

    </>
  );
};
export default TaskPlace;
