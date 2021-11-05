import React, { memo } from 'react';
import cn from 'clsx';
import { AutoComplete, Button, Input } from 'antd';
import s from './DestinationPicker.module.scss';
import geoMark from './img/geo.svg';
import swapBtn from './img/swapBtn.png';

export type Props = {
  className?: string;
};

export const DestinationPicker = memo<Props>(({ className }) => {
  const options = [{ value: 'Burns Bay Road' }, { value: 'Downing Street' }, { value: 'Wall Street' }];

  return (
    <div className={cn(s.root, className)}>
      <span className={s.title}>Направление</span>
      <div className={s.input_holder}>
        <AutoComplete
          dropdownClassName={s.dropdown}
          dropdownMatchSelectWidth
          defaultOpen={false}
          backfill
          options={options}
          filterOption={(inputValue, option) => option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        >
          <Input
            className={s.autocomplete}
            placeholder="Откуда"
            suffix={
              <div className={s.geoIcon}>
                <img src={geoMark} alt="geo icon" />
              </div>
            }
          />
        </AutoComplete>
        <Button shape="circle" className={s.geoIcon} onClick={() => {}}>
          <img src={swapBtn} alt="swap points" className={s.swapBtn} />
        </Button>
        <AutoComplete
          dropdownMatchSelectWidth
          defaultOpen={false}
          backfill
          options={options}
          filterOption={(inputValue, option) => option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        >
          <Input
            className={s.autocomplete}
            placeholder="Куда"
            suffix={
              <div className={s.geoIcon}>
                <img src={geoMark} alt="geo icon" />
              </div>
            }
          />
        </AutoComplete>
      </div>
    </div>
  );
});
