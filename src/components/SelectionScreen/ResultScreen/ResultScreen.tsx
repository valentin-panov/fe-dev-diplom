import React, { memo } from 'react';
import cn from 'clsx';
import s from './ResultScreen.module.scss';
import { SortFilter } from './SortFilter';
import { ResultsLimit } from './ResultsLimit';

export type Props = {
  className?: string;
};

const found = 20;

export const ResultScreen = memo<Props>(({ className }) => (
  <section className={cn(s.root, className)}>
    <div className={s.header}>
      <div>найдено&nbsp;{found}</div>
      <div>
        сортировать по:
        <SortFilter />
      </div>
      <div>
        показывать по:&nbsp;
        <ResultsLimit />
      </div>
    </div>
  </section>
));
