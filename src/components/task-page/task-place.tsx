import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';

const API_KEY = '32357e55-ae68-4e2d-a73d-8dbe45633551';

interface IProps {
  place: string;
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
  const { place } = props;

  const [placeGeo, setPlaceGeo] = useState<Array<number>>([]);

  useEffect(() => {
    searchGeo('Ижевск 30 лет победы 18')
      .then((item) => {
        const coordinate = item.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos;
        setPlaceGeo(coordinate.split(' ').reverse().map(Number));
      });
  }, []);

  return (
    <>
      <p>{place}</p>
      {place
        ? (
          <YMaps>
            <Map defaultState={{ center: placeGeo, zoom: 14 }}>
              <Placemark geometry={placeGeo} />
            </Map>
          </YMaps>
        )
        : null}

    </>
  );
};
export default TaskPlace;
