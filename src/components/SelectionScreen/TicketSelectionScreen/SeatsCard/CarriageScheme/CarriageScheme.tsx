import * as React from 'react';
import { HTMLAttributes, memo } from 'react';
import cn from 'clsx';
import s from './CarraigeScheme.module.scss';
import first from './img/1.png';
import second from './img/2.png';
import third from './img/3.png';
import fourth from './img/4.png';
import { Coach } from '../../../../../interfaces/Interfaces';
import './seatsGridAreas.css';

export type selectSeatsArgs = {
  coachId: number;
  seatId: number;
};

export type Props = HTMLAttributes<HTMLElement> & {
  children?: never;
  activeCarriage: Coach;
  selectSeats: (args: selectSeatsArgs) => void;
};

type Schemas = { [key: string]: string };

const schemas: Schemas = {
  first,
  second,
  third,
  fourth,
};

export const CarriageScheme = memo<Props>(({ activeCarriage, selectSeats }) => {
  const {
    seats,
    coach: { class_type: carriageType, _id: coachId },
  } = activeCarriage;

  const onSeatSelect = (idx: number) => {
    selectSeats({ coachId, seatId: idx });
  };

  return (
    <div className={s.root}>
      <img src={schemas[carriageType]} className={cn(s.schemeImg)} alt="carriage scheme" />
      <div className={s.schemeLayout}>
        <div className={s.carriageNumber}>{coachId}</div>
        <div className={s.scheme}>
          <div className={s[carriageType]}>
            {seats.map((seat) => (
              <button
                type="button"
                key={seat.index}
                className={cn(s.seat, `seat${seat.index}`, s.selected)}
                disabled={!seat.available}
                onClick={() => onSeatSelect(seat.index)}
              >
                {seat.index}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
});
