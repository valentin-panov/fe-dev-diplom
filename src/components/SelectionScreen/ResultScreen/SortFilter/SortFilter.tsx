import React, { memo } from 'react';
import cn from 'clsx';
import { Cascader } from 'antd';
import './reant.css';
import { CascaderValueType, DataNode } from 'rc-cascader/lib/interface';
import s from './SortFilter.module.scss';
import { Options } from '../ResultScreen';

export type Props = {
  className?: string;
  active: CascaderValueType;
  options: Options;
  onChange: (value: CascaderValueType, selectOptions?: DataNode[]) => void;
};

export const SortFilter = memo<Props>(({ className, onChange, active, options }) => (
  <Cascader
    className={cn(s.root, className)}
    dropdownClassName={s.dropdown}
    options={options}
    onChange={onChange}
    allowClear={false}
    bordered={false}
    defaultValue={[active]}
    multiple={false}
    expandIcon={null}
  />
));
