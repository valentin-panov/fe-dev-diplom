import * as React from 'react';
import { HTMLAttributes, memo } from 'react';
import cn from 'clsx';
import s from './CarraigeScheme.module.scss';
import first from './img/1.png';
import second from './img/2.png';
import third from './img/3.png';
import fourth from './img/4.png';
import { Coach } from '../../../../../interfaces/Interfaces';

export type Props = HTMLAttributes<HTMLElement> & {
  children?: never;
  activeCarriage: Coach;
};

type Schemas = { [key: string]: string };

const schemas: Schemas = {
  first,
  second,
  third,
  fourth,
};

export const CarriageScheme = memo<Props>(({ activeCarriage }) => {
  const {
    coach: { class_type: carriageType },
  } = activeCarriage;
  return (
    <div className={s.root}>
      <img src={schemas[carriageType]} className={cn(s.schemeImg)} alt="carriage scheme" />
      <div className={s.schemeLayout}>
        <div className={s.scheme}>123</div>
      </div>
    </div>
  );
});
