import React, { memo } from 'react';
import cn from 'clsx';
import s from './ResultsLimit.module.scss';

export type Props = {
  className?: string;
};

export const ResultsLimit = memo<Props>(({ className }) => <section className={cn(s.root, className)} />);
