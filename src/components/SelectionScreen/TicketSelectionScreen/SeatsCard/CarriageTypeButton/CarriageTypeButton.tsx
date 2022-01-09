import * as React from 'react';
import { HTMLAttributes, memo } from 'react';
import { iconsCollection } from '../../../../../collections/collections';
import s from './CarraigeTypeButton.module.scss';
import { CarriageType } from '../SeatsCard';

export type Props = HTMLAttributes<HTMLElement> & {
  className?: string;
  children?: never;
  carriageType: 'first' | 'second' | 'third' | 'fourth';
  toggleType: (value: CarriageType) => void;
  available: boolean;
};

const carriageTypes = {
  first: { element: iconsCollection.bigLux, title: 'люкс' },
  second: { element: iconsCollection.bigCoupe, title: 'купе' },
  third: { element: iconsCollection.bigPlatz, title: 'плацкарт' },
  fourth: { element: iconsCollection.bigSeat, title: 'сидячий' },
};

export const CarriageTypeButton = memo<Props>(({ carriageType, toggleType, available }) => (
  <button type="button" className={s.carriageTypeIcon} onClick={() => toggleType(carriageType)} disabled={!available}>
    {carriageTypes[carriageType].element}
    <div className={s.carriageTypeSubtitle}>{carriageTypes[carriageType].title}</div>
  </button>
));
