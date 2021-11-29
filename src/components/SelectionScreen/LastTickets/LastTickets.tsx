import React, { memo, useEffect } from 'react';
import cn from 'clsx';
import { useDispatch, useSelector } from 'react-redux';
import s from './LastTickets.module.scss';
import { LastTicketCard } from './LastTicketCard';
import { RootState } from '../../../store';
import { asyncFetchData } from '../../../reducers/lastTickets';

export type Props = {
  className?: string;
};

export const LastTickets = memo<Props>(({ className }) => {
  const status = useSelector((store: RootState) => store.lastTickets.status);
  const items = useSelector((store: RootState) => store.lastTickets.items);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncFetchData());
  }, [dispatch]);

  return (
    <section className={cn(s.root, className)}>
      {status === 'success' && (
        <>
          <div className={s.lastTicketsTitle}>последние билеты</div>
          {items.map((el) => (
            // eslint-disable-next-line no-underscore-dangle
            <LastTicketCard train={el} key={el.departure._id} />
          ))}
        </>
      )}
    </section>
  );
});
