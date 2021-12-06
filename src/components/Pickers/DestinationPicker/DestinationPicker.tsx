import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import s from './DestinationPicker.module.scss';
import { ReactComponent as SwapBtn } from '../../../svg/swapBtn.svg';

import { DestinationPickerUnit, Point } from './DestinationPickerUnit';
import { RootState } from '../../../store';
import { setArrival } from '../../../reducers/arrival';
import { setDeparture } from '../../../reducers/departure';
import { City } from '../../../interfaces/Interfaces';

export type Props = {
  className?: string;
};

export const DestinationPicker = memo<Props>(({ className }) => {
  const dispatch = useDispatch();
  const departureStore = useSelector((store: RootState) => store.departure);
  const arrivalStore = useSelector((store: RootState) => store.arrival);

  const selectPoint = (value: City, point: Point) => {
    if (point === 'departure') {
      dispatch(setDeparture(value));
    } else {
      dispatch(setArrival(value));
    }
  };

  const swapPoints = () => {
    dispatch(setArrival(departureStore));
    dispatch(setDeparture(arrivalStore));
  };

  const unitDeparture = (
    <DestinationPickerUnit point="departure" defaultValue={departureStore.value} onSelect={selectPoint} />
  );
  const unitArrival = (
    <DestinationPickerUnit point="arrival" defaultValue={arrivalStore.value} onSelect={selectPoint} />
  );

  return (
    <div className={cn(s.root, className)}>
      <span className={s.title}>Направление</span>
      <div className={s.input_holder}>
        {unitDeparture}
        <Button shape="circle" className={s.geoIcon} onClick={swapPoints}>
          <SwapBtn />
        </Button>
        {unitArrival}
      </div>
    </div>
  );
});
