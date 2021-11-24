import React, { memo } from 'react';
import cn from 'clsx';
import s from './ResultScreen.module.scss';
import { SortFilter } from './SortFilter';

export type Props = {
  className?: string;
};

const found = 20;

export const ResultScreen = memo<Props>(({ className }) => (
  <section className={cn(s.root, className)}>
    <div className={s.header}>
      <div>найдено&nbsp;{found}</div>
      <div>
        сортировать по:&nbsp;
        <SortFilter />
      </div>
      <div>показывать по:&nbsp;</div>
    </div>
  </section>
));
