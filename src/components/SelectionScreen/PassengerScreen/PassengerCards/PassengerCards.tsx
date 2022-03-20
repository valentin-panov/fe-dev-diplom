import React, { memo, useEffect, useRef, useState } from 'react';
import cn from 'clsx';
import { useSelector } from 'react-redux';
import { Button, Collapse } from 'antd';
import s from './PassengerCards.module.scss';
import { RootState } from '../../../../store';
import { PassengerCard } from './PassengerCard';
import { ReactComponent as Minus } from '../../../../svg/passCardMinus.svg';
import { ReactComponent as Plus } from '../../../../svg/passCardPlus.svg';
import './reant.css';
import { OrderSeat } from '../../../../interfaces/Interfaces';

const { Panel } = Collapse;

export type Props = {
  className?: string;
};

export const PassengerCards = memo<Props>(({ className }) => {
  const order = useSelector((store: RootState) => store.order);
  const title = useRef<HTMLDivElement>(document.createElement('div'));
  const [activeKey, setActiveKey] = useState<string>('0');

  const nextPassengerHandler = (data: OrderSeat, nextKey: string) => {
    setActiveKey(nextKey);
    // eslint-disable-next-line no-console
    console.log(data);
  };

  useEffect(() => {
    title.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className={cn(s.root, className, 'PassengerCard')} ref={title}>
      <Collapse
        accordion
        activeKey={activeKey}
        ghost
        destroyInactivePanel={false}
        expandIconPosition="left"
        expandIcon={({ isActive }) => (isActive ? <Minus /> : <Plus />)}
      >
        {order.departure.seats.map((el, index) => (
          <Panel
            key={index.toString()}
            className={s.panel}
            header={
              <button
                type="button"
                onClick={() => {
                  setActiveKey(index.toString());
                }}
                className={s.title}
              >
                Пассажир {index + 1}
              </button>
            }
          >
            <PassengerCard element={el} activeKey={activeKey} nextPassengerHandler={nextPassengerHandler} />
          </Panel>
        ))}
      </Collapse>
      <Button className={s.btn} disabled onClick={() => {}}>
        ДАЛЕЕ
      </Button>
    </div>
  );
});