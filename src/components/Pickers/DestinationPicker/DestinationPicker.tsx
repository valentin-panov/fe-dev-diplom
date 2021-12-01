import React, { memo, useState } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import s from './DestinationPicker.module.scss';
import { ReactComponent as SwapBtn } from '../../../svg/swapBtn.svg';

import { DestinationPickerUnit } from './DestinationPickerUnit';
import { RootState } from '../../../store';
import { setArrival } from '../../../reducers/arrival';
import { setDeparture } from '../../../reducers/departure';
import { capitalize } from '../../../utils/capitalize';

export type Props = {
  className?: string;
};

export type Destination = {
  value: string;
};

export const DestinationPicker = memo<Props>(({ className }) => {
  const departure = useSelector((store: RootState) => store.departure);
  const arrival = useSelector((store: RootState) => store.arrival);
  const [departureString, setDepartureString] = useState(departure);
  const [arrivalString, setArrivalString] = useState(arrival);
  const dispatch = useDispatch();

  const response = [
    {
      _id: 1491,
      name: 'москва',
    },
    {
      _id: 1492,
      name: 'санкт-петербург',
    },
    {
      _id: 1493,
      name: 'нижний новгород',
    },
  ];

  const optionsRefined: Destination[] = response.map((el) => (({ name }) => ({ value: capitalize(name) }))(el));

  const swapPoints = () => {
    setArrivalString(departure);
    setDepartureString(arrival);
    dispatch(setArrival(departure));
    dispatch(setDeparture(arrival));
  };
  return (
    <div className={cn(s.root, className)}>
      <span className={s.title}>Направление</span>
      <div className={s.input_holder}>
        <DestinationPickerUnit
          value={departureString}
          options={optionsRefined}
          placeholder="Откуда"
          onSelect={(value: string) => {
            dispatch(setDeparture(value));
          }}
          onChange={(value: string) => {
            setDepartureString(value);
          }}
        />
        <Button shape="circle" className={s.geoIcon} onClick={swapPoints}>
          <SwapBtn />
        </Button>
        <DestinationPickerUnit
          value={arrivalString}
          options={optionsRefined}
          placeholder="Куда"
          onSelect={(value: string) => {
            dispatch(setArrival(value));
          }}
          onChange={(value: string) => {
            setArrivalString(value);
          }}
        />
      </div>
    </div>
  );
});
