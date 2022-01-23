/* eslint-disable no-underscore-dangle */
import React, { memo } from 'react';
import cn from 'clsx';
import s from './ServicesBlock.module.scss';
import { Coach } from '../../../../../interfaces/Interfaces';
import { filtersCollection } from '../../../../../collections/collections';

export type Props = {
  data: Coach;
  // handleServices: () => void;
};

export const ServicesBlock = memo<Props>(({ data }) => {
  const { have_air_conditioning: ac, have_wifi: wifi, is_linens_included: linensInc } = data.coach;
  return (
    <div className={s.sciBlock}>
      <div>Обслуживание ФПК</div>
      <div className={s.sciBlockServices}>
        {ac && <div className={s.serviceIcon}>{filtersCollection.have_air_conditioning.element}</div>}
        {wifi && <div className={s.serviceIcon}>{filtersCollection.have_wifi.element}</div>}
        <div className={cn(s.serviceIcon, linensInc ? s.included : '')}>{filtersCollection.linen.element}</div>
        <div className={cn(s.serviceIcon)}>{filtersCollection.cup.element}</div>
      </div>
    </div>
  );
});
