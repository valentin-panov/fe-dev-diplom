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

export type Props = {
  className?: string;
};

export const DestinationPicker = memo<Props>(({ className }) => {
  const departure = useSelector((store: RootState) => store.departure);
  const arrival = useSelector((store: RootState) => store.arrival);
  const [departureString, setDepartureString] = useState(departure);
  const [arrivalString, setArrivalString] = useState(arrival);
  const dispatch = useDispatch();

  const options = [{ value: 'Москва' }, { value: 'Санкт-Петербург' }, { value: 'Владивосток' }];

  const getDeparture = (value: string) => {
    dispatch(setDeparture(value));
  };
  const getArrival = (value: string) => {
    dispatch(setArrival(value));
  };

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
          options={options}
          placeholder="Откуда"
          onSelect={getDeparture}
          onChange={(value: string) => {
            setDepartureString(value);
          }}
        />
        <Button shape="circle" className={s.geoIcon} onClick={swapPoints}>
          <SwapBtn />
        </Button>
        <DestinationPickerUnit
          value={arrivalString}
          options={options}
          placeholder="Куда"
          onSelect={getArrival}
          onChange={(value: string) => {
            setArrivalString(value);
          }}
        />
      </div>
    </div>
  );
});
