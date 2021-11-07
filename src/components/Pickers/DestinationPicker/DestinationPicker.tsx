import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import s from './DestinationPicker.module.scss';
import swapBtn from './img/swapBtn.png';
import { DestinationPickerUnit } from './DestinationPickerUnit';

export type Props = {
  className?: string;
};

export const DestinationPicker = memo<Props>(({ className }) => {
  const options = [{ value: 'Москва' }, { value: 'Санкт-Петербург' }, { value: 'Владивосток' }];
  const getDest = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  return (
    <div className={cn(s.root, className)}>
      <span className={s.title}>Направление</span>
      <div className={s.input_holder}>
        <DestinationPickerUnit options={options} placeholder="Откуда" onSelect={getDest} />
        <Button shape="circle" className={s.geoIcon} onClick={() => {}}>
          <img src={swapBtn} alt="swap points" className={s.swapBtn} />
        </Button>
        <DestinationPickerUnit options={options} placeholder="Куда" onSelect={getDest} />
      </div>
    </div>
  );
});
