import { AutoComplete, Input } from 'antd';
import React, { memo } from 'react';
import s from './DestinationPicker.module.scss';
import geoMark from '../../../svg/icon_geo.svg';
import { City } from '../../../interfaces/Interfaces';

export type Props = {
  className?: string;
  placeholder: string;
  options: City[];
  value: string;
  onSelect: (value: string, option: unknown) => void;
  onChange: (value: string, option: unknown) => void;
  onFocus: () => void;
};

export const DestinationPickerUnit = memo<Props>(
  ({ className, value, onFocus, options, placeholder, onSelect, onChange }) => (
    <AutoComplete
      value={value}
      dropdownClassName={s.dropdown}
      dropdownMatchSelectWidth
      defaultOpen={false}
      backfill
      options={options}
      filterOption={(inputValue, option) => option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      onSelect={onSelect}
      onChange={onChange}
      className={className}
      onFocus={onFocus}
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
  )
);
