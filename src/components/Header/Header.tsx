import React, { memo } from 'react';
import cn from 'clsx';
import s from './Header.module.scss';
import { Logo } from '../Logo';
import { HeaderMenu } from '../Menu';
import { MSHeaderMotto } from './MSHeaderMotto';

export type Props = {
  className?: string;
};

export const Header = memo<Props>(({ className }) => (
  <header className={cn(s.root, className)}>
    <Logo />
    <HeaderMenu />
    <div className="row">
      <div className="col">
        <MSHeaderMotto />
      </div>
      <div className="col">
        <MSHeaderMotto />
      </div>
    </div>
  </header>
));
