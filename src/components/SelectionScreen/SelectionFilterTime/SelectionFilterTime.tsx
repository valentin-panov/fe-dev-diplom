import React, { memo, ReactElement, useRef } from 'react';
import cn from 'clsx';
import { Collapse } from 'antd';

import { ReactComponent as Plus } from '../../../svg/icon_dest_plus.svg';
import { ReactComponent as Minus } from '../../../svg/icon_dest_minus.svg';

import s from './SelectionFilterTime.module.scss';
import './rewrite.css';
import { SelectionFilterTimeOrigin } from './SelectionFilterTimeOrigin';

const { Panel } = Collapse;

export type Props = {
  className?: string;
  icon: ReactElement;
  type: 'outbound' | 'return';
};

const text = {
  outbound: { title: 'Туда', first: 'start_departure', second: 'start_arrival' },
  return: { title: 'Обратно', first: 'end_departure', second: 'end_arrival' },
};

export const SelectionFilterTime = memo<Props>(({ className, icon, type }) => {
  const forward = useRef(null);

  // TODO pluck ranges from store

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
            <SelectionFilterTimeOrigin initialRange={[0, 1440]} type={text[type].first} />
            <div className={cn(s.timePickerSubTitle, s.secondST)}>Время прибытия</div>
            <SelectionFilterTimeOrigin initialRange={[0, 1440]} type={text[type].second} />
          </div>
        </Panel>
      </Collapse>
    </div>
  );
});
