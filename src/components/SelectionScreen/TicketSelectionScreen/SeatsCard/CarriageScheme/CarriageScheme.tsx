import * as React from 'react';
import { HTMLAttributes, memo } from 'react';
import cn from 'clsx';
import first from './img/1.png';
import second from './img/2.png';
import third from './img/3.png';
import fourth from './img/4.png';

export type Props = HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: never;
  carriageType: 'first' | 'second' | 'third' | 'fourth';
};

const schemas = {
  first,
  second,
  third,
  fourth,
};

export const CarriageScheme = memo<Props>(({ carriageType, className }) => (
  <img src={schemas[carriageType]} className={cn(className)} alt="carriage scheme" />
));
