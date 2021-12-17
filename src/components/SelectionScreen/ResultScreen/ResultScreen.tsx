import React, { memo, useMemo, useState } from 'react';
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
import ZeroFound from '../../ZeroFound/ZeroFound';
import { limitSet } from '../../../reducers/limit';
import { SortOptions } from '../../../global';
import { getRouteFetchData } from '../../../reducers/getRoute';
import { sortSet } from '../../../reducers/sort';

export type Props = {
  className?: string;
};

export const sortOptions: SortOptions = [
  {
    value: 'date',
    label: 'времени',
  },
  {
    value: 'price_min',
    label: 'стоимости',
  },
  {
    value: 'duration',
    label: 'длительности',
  },
];

export const ResultScreen = memo<Props>(({ className }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const totalCount = useSelector((store: RootState) => store.getRoute.data.totalCount);
  const trainsList = useSelector((store: RootState) => store.getRoute.data.items);

  // eslint-disable-next-line no-underscore-dangle
  const departureId = useSelector((store: RootState) => store.departure._id);
  // eslint-disable-next-line no-underscore-dangle
  const arrivalId = useSelector((store: RootState) => store.arrival._id);
  const dateForward = useSelector((store: RootState) => store.dateForward);
  const dateReturn = useSelector((store: RootState) => store.dateReturn);

  const limit = useSelector((store: RootState) => store.limit);

  const sort = useSelector((store: RootState) => store.sort);
  const [activeSort, setActiveSort] = useState<CascaderValueType>([sort]);

  const params = useMemo(() => {
    // eslint-disable-next-line no-console
    console.log('MEMO');
    return {
      departureId,
      arrivalId,
      dateForward,
      dateReturn,
      limit,
      sort,
    };
  }, [departureId, arrivalId, dateForward, dateReturn, limit, sort]);

  // useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   // console.log(params);
  //   // const timeoutId = setTimeout(() => {
  //   dispatch(getRouteFetchData(params));
  //   // }, 3000);
  //   // return () => {
  //   //   clearTimeout(timeoutId);
  //   // };
  // }, [dispatch, params]);

  // console.log(params);

  const onClickLimit = (el: number) => {
    dispatch(limitSet(el));
    dispatch(getRouteFetchData({ ...params, limit: el }));
  };

  const onChangeSort = (value: CascaderValueType) => {
    setActiveSort(value);
    const valueStr = `${value}`;
    dispatch(sortSet(valueStr));
    dispatch(getRouteFetchData({ ...params, sort: valueStr }));
  };

  return (
    <section className={cn(s.root, className)}>
      <div className={s.header}>
        <div>найдено&nbsp;{totalCount}</div>
        <div>
          сортировать по:
          <SortFilter onChange={onChangeSort} active={activeSort} options={sortOptions} />
        </div>
        <div>
          показывать по:&nbsp;
          <ResultsLimit variants={[5, 10, 20]} active={limit} onClick={onClickLimit} />
        </div>
      </div>
      {totalCount !== 0 && (
        <>
          <div className={s.trainList}>
            {trainsList.map((trainsPair) => {
              // eslint-disable-next-line no-underscore-dangle
              const key = trainsPair[0].departure.train._id;
              return <TrainCard trains={trainsPair} key={key} />;
            })}
          </div>
          <div className={s.pagination}>
            <PaginationOrigin
              data={{ current: currentPage, total: totalCount, pageSize: limit, onChange: setCurrentPage }}
            />
          </div>
        </>
      )}
      {!totalCount && <ZeroFound />}
    </section>
  );
});
