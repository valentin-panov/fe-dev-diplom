import React, { memo } from 'react';
import cn from 'clsx';
import s from './DatePicker.module.scss';

export type Props = {
  className?: string;
};

export const DatePicker = memo<Props>(({ className }) => (
  <div className={cn(s.root, className)}>
    <p>HELLO</p>
  </div>
));
