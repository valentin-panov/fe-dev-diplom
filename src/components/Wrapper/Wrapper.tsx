import React, { ReactElement } from 'react';
import cn from 'clsx';
import s from './Wrapper.module.scss';

export type Props = {
  className?: string;
  children: React.ReactChildren | React.ReactNode;
};

export const Wrapper = ({ className, children }: Props): ReactElement => (
  <div className={cn(s.root, className)}>{children}</div>
);
