import React, { memo } from 'react';
import cn from 'clsx';
import { useSelector } from 'react-redux';
import s from './HeaderMenu.module.scss';
import { RootState } from '../../store';
import { HeaderMenuItem } from './HeaderMenuItem';
import { Menu } from '../../interfaces/Interfaces';

export type Props = {
  className?: string;
  location: string;
};

export const HeaderMenu = memo<Props>(({ className, location }) => {
  const { menu } = useSelector((store: RootState) => store);

  return (
    <div className={cn(s.root, className)}>
      <nav className={s.navBar}>
        <ul className={s.navBar}>
          {menu.map((item: Menu) => {
            const active = location === item.pathName ? s.active : '';
            return <HeaderMenuItem key={item.id} {...item} className={cn(s.navLink, active)} />;
          })}
        </ul>
      </nav>
    </div>
  );
});
