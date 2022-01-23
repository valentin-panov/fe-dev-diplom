import * as React from 'react';
import { memo } from 'react';
import s from './CarraigeScheme.module.scss';
import { Coach } from '../../../../../interfaces/Interfaces';

export type Props = {
  activeCarriage: Coach;
};

export const FourthClassScheme = memo<Props>(({ activeCarriage }) => {
  const { coach } = activeCarriage;
  // eslint-disable-next-line no-console
  console.log(coach);
  return <div className={s.third} />;
});
