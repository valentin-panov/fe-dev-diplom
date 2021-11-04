import React, { memo } from 'react';
import cn from 'clsx';
import { useLocation } from 'react-router-dom';
import s from './Header.module.scss';
import { Logo } from '../Logo';
import { HeaderMenu } from '../Menu';
import { MSHeaderMotto } from './MSHeaderMotto';
import headerMain from './img/header_main.png';
import headerTrain from './img/header_train.png';
import headerSuccess from './img/header_success.png';
import { appURL } from '../../App';

export type Props = {
  className?: string;
};

export const Header = memo<Props>(({ className }) => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation: string = pathname.replace(appURL, '').split('/')[1];

  const activePreset: {
    class: string;
    back: string;
  } = { class: 'main', back: headerMain };

  switch (splitLocation) {
    case 'select':
      activePreset.class = 'select';
      activePreset.back = headerTrain;
      break;
    case 'success':
      activePreset.class = 'success';
      activePreset.back = headerSuccess;
      break;
    default:
      activePreset.class = 'main';
      activePreset.back = headerMain;
      break;
  }

  return (
    <header className={cn(s.root, className, s[activePreset.class])}>
      <div className={s.content}>
        <div className={s.logo_holder}>
          <Logo />
        </div>
        <HeaderMenu location={splitLocation} />
        <div className={s.header__controls}>
          <div className={s.header__controls_col}>
            <div className={s.motto_holder}>
              <MSHeaderMotto />
            </div>
          </div>
          <div className={s.header__controls_col}>
            <Logo />
          </div>
        </div>
      </div>
      <img className={s.back} src={activePreset.back} alt="header background" />
    </header>
  );
});
