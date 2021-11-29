import React, { memo } from 'react';
import cn from 'clsx';
import { Link } from 'react-router-dom';
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
      <Link to="/">
        <div className={cn(s.container)}>
          <Circle1 />
          <span>Билеты</span>
        </div>
      </Link>
    </div>

    <div className={cn(s.progress__item)}>
      <Link to="/">
        <div className={cn(s.container)}>
          <Circle2 />
          <span>Пассажиры</span>
        </div>
      </Link>
    </div>

    <div className={cn(s.progress__item)}>
      <Link to="/">
        <div className={cn(s.container)}>
          <Circle3 />
          <span>Оплата</span>
        </div>
      </Link>
    </div>

    <div className={cn(s.progress__item)}>
      <Link to="/">
        <div className={cn(s.container)}>
          <Circle4 />
          <span>Проверка</span>
        </div>
      </Link>
    </div>
  </div>
));
