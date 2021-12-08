import React, { memo, useEffect, useMemo, useState } from 'react';
import cn from 'clsx';
import { CascaderValueType } from 'rc-cascader/lib/interface';
import { useDispatch, useSelector } from 'react-redux';
import s from './ResultScreen.module.scss';
import { SortFilter } from './SortFilter';
import { ResultsLimit } from './ResultsLimit';
import { TrainCard } from './TrainCard';
import { PaginationOrigin } from '../PaginationOrigin';
// import { trainsList } from './data';
import { RootState } from '../../../store';
import { getRouteFetchData } from '../../../reducers/getRoute';

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

export const ResultScreen = memo<Props>(({ className }) => {
  const [activeSort, setActiveSort] = useState<CascaderValueType>(['time']);
  const [activeLimit, setActiveLimit] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  // eslint-disable-next-line no-underscore-dangle
  const departureId = useSelector((store: RootState) => store.departure._id);
  // eslint-disable-next-line no-underscore-dangle
  const arrivalId = useSelector((store: RootState) => store.arrival._id);
  const totalCount = useSelector((store: RootState) => store.getRoute.data.totalCount);
  const trainsList = useSelector((store: RootState) => store.getRoute.data.items);

  const dispatch = useDispatch();

  const params = useMemo(
    () => ({
      departure: departureId,
      arrival: arrivalId,
    }),
    [departureId, arrivalId]
  );

  useEffect(() => {
    dispatch(getRouteFetchData(params));
  }, [dispatch, params]);

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
        <div>найдено&nbsp;{totalCount}</div>
        <div>
          сортировать по:
          <SortFilter onChange={onChangeSort} active={activeSort} options={options} />
        </div>
        <div>
          показывать по:&nbsp;
          <ResultsLimit variants={[5, 10, 20]} active={activeLimit} onClick={onClickLimit} />
        </div>
      </div>
      <div className={s.trainList}>
        {trainsList.map((trainsPair) => {
          // eslint-disable-next-line no-underscore-dangle
          const key = trainsPair[0].departure.train._id;
          return <TrainCard trains={trainsPair} key={key} />;
        })}
      </div>
      <div className={s.pagination}>
        <PaginationOrigin
          data={{ current: currentPage, total: totalCount, pageSize: activeLimit, onChange: setCurrentPage }}
        />
      </div>
    </section>
  );
});
