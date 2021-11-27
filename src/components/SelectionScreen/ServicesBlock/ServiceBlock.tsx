import React, { memo } from 'react';
import cn from 'clsx';
import s from './ServiceBlock.module.scss';
import { Services } from '../../../global';
import { serviceCollection } from '../../../Collections/collections';

export type Props = {
  className: string;
  services: Services;
};

export const ServiceBlock = memo<Props>(({ className, services }) => {
  const services2render: string[] = Object.entries(services)
    .filter((el) => el[1])
    .map((el) => `${el[0]}`);
  return (
    <div className={cn(s.root, s[className])}>
      {services2render.map((el) => (
        <div className={s.service__icon} key={el}>
          {serviceCollection.get(el)}
        </div>
      ))}
    </div>
  );
});
