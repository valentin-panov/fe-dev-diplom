import React, { memo, useState } from 'react';
import cn from 'clsx';
import { CascaderValueType } from 'rc-cascader/lib/interface';
import s from './ResultScreen.module.scss';
import { SortFilter } from './SortFilter';
import { ResultsLimit } from './ResultsLimit';

export type Props = {
  className?: string;
};

export type Options = { value: string; label: string }[];

const options: Options = [
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
const found = 20;

export const ResultScreen = memo<Props>(({ className }) => {
  const [activeSort, setActiveSort] = useState<CascaderValueType>(['time']);
  const [activeLimit, setActiveLimit] = useState(5);

  const onClickLimit = (el: number) => {
    setActiveLimit(el);
  };
  const onChangeSort = (value: CascaderValueType) => {
    // console.log(value);
    setActiveSort(value);
  };

  return (
    <section className={cn(s.root, className)}>
      <div className={s.header}>
        <div>найдено&nbsp;{found}</div>
        <div>
          сортировать по:
          <SortFilter onChange={onChangeSort} active={activeSort} options={options} />
        </div>
        <div>
          показывать по:&nbsp;
          <ResultsLimit variants={[5, 10, 20]} active={activeLimit} onClick={onClickLimit} />
        </div>
      </div>
    </section>
  );
});
