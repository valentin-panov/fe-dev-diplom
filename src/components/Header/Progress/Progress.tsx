import React, { memo } from 'react';
import cn from 'clsx';
import s from './Progress.module.scss';
import { ReactComponent as Circle1 } from './svg/1.svg';
import { ReactComponent as Circle2 } from './svg/2.svg';
import { ReactComponent as Circle3 } from './svg/3.svg';
import { ReactComponent as Circle4 } from './svg/4.svg';

export type Props = {
  className?: string;
};

export const Progress = memo<Props>(({ className }) => (
  <div className={cn(s.root, className)}>
    <div className={cn(s.progress__item, s.progress__item_active)}>
      <Circle1 />
      <span>Билеты</span>
    </div>
    <div className={s.progress__item}>
      <Circle2 />
      <span>Пассажиры</span>
    </div>

    <div className={s.progress__item}>
      <Circle3 />
      <span>Оплата</span>
    </div>

    <div className={s.progress__item}>
      <Circle4 />
      <span>Проверка</span>
    </div>
  </div>
));
