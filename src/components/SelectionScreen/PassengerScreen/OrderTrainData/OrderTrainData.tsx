/* eslint-disable camelcase */

import React, { memo, ReactElement, useRef } from 'react';
import { useSelector } from 'react-redux';
import cn from 'clsx';
import { Collapse } from 'antd';

import { ReactComponent as Plus } from '../../../../svg/icon_dest_plus.svg';
import { ReactComponent as Minus } from '../../../../svg/icon_dest_minus.svg';

import s from './OrderTrainData.module.scss';
import './rewrite.css';
import { RootState } from '../../../../store';

const { Panel } = Collapse;

export type Props = {
  className?: string;
  icon: ReactElement;
  type: 'outbound' | 'return';
};

export type MindedParams = {
  outbound: {
    title: 'Туда';
  };
  return: {
    title: 'Обратно';
  };
};

export const OrderTrainData = memo<Props>(({ className, icon, type }) => {
  const forward = useRef(null);
  const selectedSeats = useSelector((store: RootState) => store.selectedSeats);

  const text: MindedParams = {
    outbound: {
      title: 'Туда',
    },
    return: {
      title: 'Обратно',
    },
  };

  // eslint-disable-next-line no-console
  console.log(selectedSeats);

  return (
    <div className={cn(s.root, className)}>
      <Collapse ghost expandIconPosition="right" expandIcon={({ isActive }) => (isActive ? <Minus /> : <Plus />)}>
        <Panel
          header={
            <div className={s.header}>
              <div className={s.icon}>{icon}</div>
              <div className={s.sideSelection__title}>{text[type].title}</div>
            </div>
          }
          key={1}
        >
          <div className={s.timePickerPanel} ref={forward}>
            <div className={cn(s.timePickerSubTitle, s.firstST)}>Время отбытия</div>
            <div className={cn(s.timePickerSubTitle, s.secondST)}>Время прибытия</div>
          </div>
        </Panel>
      </Collapse>
    </div>
  );
});
