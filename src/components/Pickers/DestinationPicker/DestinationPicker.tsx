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
import { City } from '../../../interfaces/Interfaces';

export type Props = {
  className?: string;
};

export const DestinationPicker = memo<Props>(({ className }) => {
  const dispatch = useDispatch();
  const departureStore = useSelector((store: RootState) => store.departure);
  const arrivalStore = useSelector((store: RootState) => store.arrival);
  const [points, setPoints] = useState({ departure: departureStore, arrival: arrivalStore });

  const selectPoint = (value: City, departureFlag: boolean) => {
    if (departureFlag) {
      setPoints({ ...points, departure: value });
      dispatch(setDeparture(value));
    } else {
      setPoints({ ...points, arrival: value });
      dispatch(setArrival(value));
    }
  };

  const swapPoints = () => {
    setPoints({ departure: points.arrival, arrival: points.departure });
    dispatch(setArrival(departureStore));
    dispatch(setDeparture(arrivalStore));
  };

  const unitDeparture = (
    <DestinationPickerUnit
      departureFlag
      defaultValue={departureStore.value}
      placeholder="Откуда"
      onSelect={selectPoint}
    />
  );
  const unitArrival = (
    <DestinationPickerUnit
      departureFlag={false}
      defaultValue={arrivalStore.value}
      placeholder="Куда"
      onSelect={selectPoint}
    />
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
