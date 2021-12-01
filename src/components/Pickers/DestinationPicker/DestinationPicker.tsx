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
import { City } from '../../../interfaces/Interfaces';

export type Props = {
  className?: string;
};

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

export const DestinationPicker = memo<Props>(({ className }) => {
  const departure = useSelector((store: RootState) => store.departure);
  const arrival = useSelector((store: RootState) => store.arrival);
  const [departureString, setDepartureString] = useState(departure);
  const [arrivalString, setArrivalString] = useState(arrival);
  const dispatch = useDispatch();

  const optionsRefined: City[] = response.map((el) =>
    (({ name, _id }) => ({
      _id,
      value: capitalize(name),
    }))(el)
  );

  const selectDeparture = (value: string) => {
    const obj = optionsRefined.find((o) => o.value === value);
    if (obj) {
      dispatch(setDeparture(obj));
    }
  };
  const selectArrival = (value: string) => {
    const obj = optionsRefined.find((o) => o.value === value);
    if (obj) {
      dispatch(setArrival(obj));
    }
  };
  const onChangeDep = (value: string) => {
    const obj = { value, _id: 0 };
    setDepartureString(obj);
  };
  const onChangeArr = (value: string) => {
    const obj = { value, _id: 0 };
    setArrivalString(obj);
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
          value={departureString.value}
          options={optionsRefined}
          placeholder="Откуда"
          onSelect={selectDeparture}
          onChange={onChangeDep}
        />
        <Button shape="circle" className={s.geoIcon} onClick={swapPoints}>
          <SwapBtn />
        </Button>
        <DestinationPickerUnit
          value={arrivalString.value}
          options={optionsRefined}
          placeholder="Куда"
          onSelect={selectArrival}
          onChange={onChangeArr}
        />
      </div>
    </div>
  );
});
