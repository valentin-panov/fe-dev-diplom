import React, { memo } from 'react';
import cn from 'clsx';
import { Cascader } from 'antd';
import './reant.css';
import s from './SortFilter.module.scss';

export type Props = {
  className?: string;
};

const options = [
  {
    value: 'time',
    label: 'времени',
  },
  {
    value: 'price',
    label: 'стоимости',
  },
  {
    value: 'duration',
    label: 'длительности',
  },
];

function onChange(value: unknown) {
  console.log(value);
}

export const SortFilter = memo<Props>(({ className }) => (
  <Cascader
    className={cn(s.root, className)}
    dropdownClassName={s.dropdown}
    options={options}
    onChange={onChange}
    allowClear={false}
    bordered={false}
    defaultValue={['time']}
    multiple={false}
    expandIcon={null}
  />
));
