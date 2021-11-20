import React, { memo, ReactElement } from 'react';
import cn from 'clsx';
import { Switch } from 'antd';
import s from './SelectionFilterItem.module.scss';
import './reant.css';

export type Props = {
  className?: string;
  icon: ReactElement;
  text: string;
};

export const SelectionFilterItem = memo<Props>(({ className, icon, text }) => (
  <li className={cn(s.root, className)}>
    <div className={s.icon}>{icon}</div>
    <div className={s.txt}>{text}</div>
    <div className={s.switch}>
      <Switch defaultChecked />
    </div>
  </li>
));
