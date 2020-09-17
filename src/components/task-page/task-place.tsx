import React, { useEffect, useState } from 'react';
import { YMaps, Map, Placemark } from 'react-yandex-maps';
import { Typography } from 'antd';

const { Paragraph } = Typography;

const API_KEY = '32357e55-ae68-4e2d-a73d-8dbe45633551';

interface IProps {
  place: string;
  type: string;
}

const isMentor: boolean = true;

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
  const { place, type } = props;

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
              editable={isMentor ? { onChange: (e) => changeValue(e, 'description') } : false}
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
          <Paragraph editable>
            {place}
          </Paragraph>
        )}

    </>
  );
};
export default TaskPlace;
