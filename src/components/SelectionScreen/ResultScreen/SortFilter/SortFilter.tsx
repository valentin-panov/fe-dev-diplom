import React, { memo } from 'react';
import cn from 'clsx';
import { Select } from 'antd';
import './reant.css';
// import { CascaderValueType } from 'rc-cascader/lib/interface';
import s from './SortFilter.module.scss';
import { ISortOptions } from '../../../../interfaces/Interfaces';

export type Props = {
  className?: string;
  active: unknown;
  options: ISortOptions;
  onChange: (value: unknown) => void;
};

export const SortFilter = memo<Props>(({ className, onChange, active, options }) => (
  <Select
    className={cn(s.root, className)}
    dropdownClassName={cn(s.dropdown, 'sort')}
    options={options}
    onChange={onChange}
    allowClear={false}
    bordered={false}
    defaultValue={active}
  />
));
