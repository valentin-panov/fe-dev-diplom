import React, { memo, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { Button, Select } from 'antd';
import s from './PassengerCard.module.scss';
import { OrderSeat } from '../../../../../interfaces/Interfaces';

const { Option } = Select;

export type Props = {
  element: OrderSeat;
  nextPassengerHandler: (data: OrderSeat, nextKey: string) => void;
  activeKey: string;
};
type AgeGroup = 'child' | 'toddler' | 'adult';

export const PassengerCard = memo<Props>(({ element, nextPassengerHandler, activeKey }) => {
  const forward = useRef(null);
  const [ageGroup, setAgeGroup] = useState<AgeGroup>('adult');
  const nextKey = (Number(activeKey) + 1).toString();
  const data: OrderSeat = { ...element };

  useEffect(() => {
    const { is_child: child, include_children_seat: toddler } = element;
    if (child) {
      setAgeGroup('child');
    }
    if (toddler) {
      setAgeGroup('toddler');
    }
  }, [element]);

  return (
    <div className={s.cardBody} ref={forward}>
      <div className={cn(s.row)}>
        <div className={cn(s.row_age, s.row_padding)}>
          <Select className={s.ageGroupSelect} value={ageGroup} disabled onChange={() => {}}>
            <Option value="adult">Взрослый</Option>
            <Option value="child">Детский</Option>
            <Option value="toddler">Младенец</Option>
          </Select>
        </div>
        <div className={cn(s.row_personal, s.row_padding)}>personal data</div>
        <div className={cn(s.row_gender, s.row_padding)}>gender</div>
        <div className={cn(s.row_limited, s.row_padding)}>limited</div>
        <div className={cn(s.row_paper, s.row_padding)}>paper</div>
        <div className={cn(s.row_btn, s.row_padding)}>
          <Button className={s.btn} onClick={() => nextPassengerHandler(data, nextKey)}>
            Следующий пассажир
          </Button>
        </div>
      </div>
    </div>
  );
});
