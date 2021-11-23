import { AutoComplete, Input } from 'antd';
import React, { memo } from 'react';
import s from './DestinationPicker.module.scss';
import geoMark from '../../../svg/icon_geo.svg';

export type Destination = {
  value: string;
};

export type Props = {
  className?: string;
  placeholder: string;
  options: Destination[];
  onSelect: (value: string, option: unknown) => void;
};

export const DestinationPickerUnit = memo<Props>(({ className, options, placeholder, onSelect }) => (
  <AutoComplete
    dropdownClassName={s.dropdown}
    dropdownMatchSelectWidth
    defaultOpen={false}
    backfill
    options={options}
    filterOption={(inputValue, option) => option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
    onSelect={onSelect}
    className={className}
  >
    <Input
      className={s.autocomplete}
      placeholder={placeholder}
      suffix={
        <div className={s.geoIcon}>
          <img src={geoMark} alt="geo icon" />
        </div>
      }
    />
  </AutoComplete>
));
