import React, { memo } from 'react';
import cn from 'clsx';
import s from './ServiceBlock.module.scss';
import { Services } from '../../../global';
import { serviceCollection } from '../../../collections/collections';

export type Props = {
  className: string;
  services: Services;
};

export const ServiceBlock = memo<Props>(({ className, services }) => {
  const services2render: [string, boolean][] = Object.entries(services).map((el) => [`${el[0]}`, el[1]]);
  // .filter((el) => el[1])

  return (
    <div className={cn(s.root, s[className])}>
      {services2render.map((el) => (
        <div className={cn(s.service__icon, el[1] ? s.active : '')} key={el[0]}>
          {serviceCollection.get(el[0])}
        </div>
      ))}
    </div>
  );
});
