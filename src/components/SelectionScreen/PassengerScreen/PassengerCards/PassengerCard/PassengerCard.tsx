import React, { memo, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { Select } from 'antd';
import s from './PassengerCard.module.scss';
import { OrderSeat } from '../../../../../interfaces/Interfaces';

const { Option } = Select;

export type Props = {
  element: OrderSeat;
};
type AgeGroup = 'child' | 'toddler' | 'adult';

export const PassengerCard = memo<Props>(({ element }) => {
  const forward = useRef(null);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adult');

  useEffect(() => {
    if (element.is_child) {
      setAgeGroup('child');
    }
    if (element.include_children_seat) {
      setAgeGroup('toddler');
    }
  }, [element.include_children_seat, element.is_child]);

  return (
    <div className={s.cardBody} ref={forward}>
      <div className={cn(s.row)}>
        <div className={s.row_age}>
          <Select className={s.ageGroupSelect} defaultValue={ageGroup} disabled onChange={() => {}}>
            <Option value="adult">Взрослый</Option>
            <Option value="child">Детский</Option>
            <Option value="toddler">Младенец</Option>
          </Select>
        </div>
        <div className={s.row_personal}>personal data</div>
        <div className={s.row_gender}>gender</div>
        <div className={s.row_limited}>limited</div>
        <div className={s.row_paper}>paper</div>
        <div className={s.row_btn}>next</div>
      </div>
    </div>
  );
});
