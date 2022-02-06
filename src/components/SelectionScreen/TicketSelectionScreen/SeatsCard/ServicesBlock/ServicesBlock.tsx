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
  // console.log(data);
  return (
    <div className={s.sciBlock}>
      <div>Обслуживание ФПК</div>
      <div className={s.sciBlockServices}>
        {ac && (
          <button type="button" disabled className={cn(s.serviceIcon)}>
            {filtersCollection.have_air_conditioning.element}
          </button>
        )}
        {wifi && (
          <button type="button" className={s.serviceIcon}>
            {filtersCollection.have_wifi.element}
          </button>
        )}
        <button type="button" disabled={linensInc} className={cn(s.serviceIcon, linensInc ? s.included : '')}>
          {filtersCollection.linen.element}
        </button>
        <button type="button" disabled className={cn(s.serviceIcon)}>
          {filtersCollection.cup.element}
        </button>
      </div>
    </div>
  );
});
