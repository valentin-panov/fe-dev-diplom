import React, { memo } from 'react';
import cn from 'clsx';
import s from './TrainCard.module.scss';
import { Train } from '../../../../global';
import { ReactComponent as Icon } from '../../../../svg/train_icon.svg';
import { iconsCollection } from '../../../../Collections/collections';
import { capitalize } from '../../../../utils/capitalize';

export type Props = {
  className?: string;
  train: Train;
};

export const TrainCard = memo<Props>(({ className, train }) => {
  // eslint-disable-next-line no-underscore-dangle
  const trainId = train.departure.train._id;
  const pointA = capitalize(train.departure.from.city.name);
  const pointB = capitalize(train.departure.to.city.name);
  const trainName = train.departure.train.name;
  return (
    <div className={cn(s.root, className)}>
      <div className={s.general}>
        <div className={s.icon}>
          <Icon />
        </div>
        <div className={s.general__txt}>
          <div className={s.trainId}>{trainId}</div>
          <div>
            <div className={s.textContainer}>
              {pointA}&nbsp;
              {iconsCollection.arrowRB}
            </div>
            <div className={s.textContainer}>{pointB}</div>
            {trainName && <div className={s.textContainer}>&laquo;{trainName}&raquo;</div>}
          </div>
        </div>
      </div>
      <div className={s.params}>PARAMS</div>;
    </div>
  );
});
