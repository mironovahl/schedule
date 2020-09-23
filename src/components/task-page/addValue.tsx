import React, { Dispatch, SetStateAction } from 'react';
import { IEvent } from '../../interfaces/backend-interfaces';
import BackendService from '../../services/backend-service';

interface TVisibleInputs {
  [key:string]: boolean,
  photo: boolean;
  video: boolean;
  text: boolean;
}

interface IProps {
  link: string,
  property: string,
  setData: Dispatch<SetStateAction<IEvent | null>>;
  visibleInputs: TVisibleInputs;
  setVisibleInputs: React.Dispatch<React.SetStateAction<TVisibleInputs>>;
}

const addValue = (props: IProps): void => {
  const {
    link, property, setData, visibleInputs, setVisibleInputs,
  } = props;

  const backendService = new BackendService();

  setData((oldData: IEvent | null) => {
    if (oldData) {
      console.log(link);
      setVisibleInputs({
        ...visibleInputs,
        [property]: ![property],
      });
      const newData = {
        ...oldData,
        [property]: link,
      };
      backendService.updateEvent(newData);
      return newData;
    }
    return oldData;
  });
};

export default addValue;