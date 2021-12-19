import React, { memo } from 'react';
import cn from 'clsx';
import { Select } from 'antd';
import './reant.css';
import { CascaderValueType } from 'rc-cascader/lib/interface';
import s from './SortFilter.module.scss';
import { SortOptions } from '../../../../global';

export type Props = {
  className?: string;
  active: CascaderValueType;
  options: SortOptions;
  onChange: (value: CascaderValueType) => void;
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
