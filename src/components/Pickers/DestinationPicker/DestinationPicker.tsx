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

  // const unitDeparture = React.createRef();
  // const unitArrival = React.createRef();

  const selectPoint = (value: City, departureFlag: boolean) => {
    if (departureFlag) {
      setPoints({ ...points, departure: value });
      dispatch(setDeparture(value));
    } else {
      setPoints({ ...points, arrival: value });
      dispatch(setArrival(value));
    }
  };

  // const onChangePoint = (value: string, departureFlag: boolean) => {
  //   const obj = { value, _id: 0 };
  //   if (departureFlag) {
  //     setPoints({ ...points, departure: obj });
  //     dispatch(clearDeparture());
  //   } else {
  //     setPoints({ ...points, arrival: obj });
  //     dispatch(clearArrival());
  //   }
  // };

  const swapPoints = () => {
    setPoints({ departure: points.arrival, arrival: points.departure });
    dispatch(setArrival(departureStore));
    dispatch(setDeparture(arrivalStore));
  };

  return (
    <div className={cn(s.root, className)}>
      <span className={s.title}>Направление</span>
      <div className={s.input_holder}>
        <DestinationPickerUnit
          departureFlag
          defaultValue={departureStore.value}
          placeholder="Откуда"
          onSelect={selectPoint}
          // ref={unitDeparture}
        />
        <Button shape="circle" className={s.geoIcon} onClick={swapPoints}>
          <SwapBtn />
        </Button>
        <DestinationPickerUnit
          departureFlag={false}
          defaultValue={arrivalStore.value}
          placeholder="Куда"
          onSelect={selectPoint}
          // ref={unitArrival}
        />
      </div>
    </div>
  );
});
