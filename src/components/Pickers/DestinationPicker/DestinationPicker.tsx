import React, { memo, useState } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import s from './DestinationPicker.module.scss';
import { ReactComponent as SwapBtn } from '../../../svg/swapBtn.svg';

import { DestinationPickerUnit } from './DestinationPickerUnit';
import { RootState } from '../../../store';
import { clearArrival, setArrival } from '../../../reducers/arrival';
import { clearDeparture, setDeparture } from '../../../reducers/departure';
import { clearPointsArray, fetchPointsArray } from '../../../reducers/pointsArray';

export type Props = {
  className?: string;
};

export const DestinationPicker = memo<Props>(({ className }) => {
  const departureStore = useSelector((store: RootState) => store.departure);
  const arrivalStore = useSelector((store: RootState) => store.arrival);
  const [departureString, setDepartureString] = useState(departureStore);
  const [arrivalString, setArrivalString] = useState(arrivalStore);
  const pointsArray = useSelector((store: RootState) => store.pointsArray.items);

  const dispatch = useDispatch();

  const selectDeparture = (value: string) => {
    const obj = pointsArray.find((o) => o.value === value);
    if (obj) {
      dispatch(setDeparture(obj));
    }
  };

  const selectArrival = (value: string) => {
    const obj = pointsArray.find((o) => o.value === value);
    if (obj) {
      dispatch(setArrival(obj));
    }
  };

  const onChangeDep = (value: string) => {
    if (value) {
      dispatch(fetchPointsArray(value));
    }
    const obj = { value, _id: 0 };
    setDepartureString(obj);
    dispatch(clearDeparture());
  };

  const onChangeArr = (value: string) => {
    if (value) {
      dispatch(fetchPointsArray(value));
    }
    const obj = { value, _id: 0 };
    setArrivalString(obj);
    dispatch(clearArrival());
  };

  const onFocus = () => dispatch(clearPointsArray());

  const swapPoints = () => {
    setArrivalString(departureStore);
    setDepartureString(arrivalStore);
    dispatch(setArrival(departureStore));
    dispatch(setDeparture(arrivalStore));
  };

  return (
    <div className={cn(s.root, className)}>
      <span className={s.title}>Направление</span>
      <div className={s.input_holder}>
        <DestinationPickerUnit
          value={departureString.value}
          options={pointsArray}
          placeholder="Откуда"
          onSelect={selectDeparture}
          onChange={onChangeDep}
          onFocus={onFocus}
        />
        <Button shape="circle" className={s.geoIcon} onClick={swapPoints}>
          <SwapBtn />
        </Button>
        <DestinationPickerUnit
          value={arrivalString.value}
          options={pointsArray}
          placeholder="Куда"
          onSelect={selectArrival}
          onChange={onChangeArr}
          onFocus={onFocus}
        />
      </div>
    </div>
  );
});
