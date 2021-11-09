import React, { memo } from 'react';
import cn from 'clsx';
import { useLocation } from 'react-router-dom';
import { DestinationPicker } from 'components/Pickers/DestinationPicker';
import { DatePickerOrigin } from 'components/Pickers/DatePickerOrigin';
import { Button } from 'antd';
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

        {activePreset.class === 'main' && (
          <div className={s.header__controls_main}>
            <div className={s.header__controls_col}>
              <div className={s.motto_holder}>
                <MSHeaderMotto />
              </div>
            </div>

            <div className={s.header__controls_col}>
              <div className={cn(s.picker_holder_main)}>
                <div className={s.picker_holder_main_destination_helper}>
                  <DestinationPicker />
                </div>
                <DatePickerOrigin />
                <div className={s.search_btn_holder}>
                  <Button className={s.searchBtn}>НАЙТИ БИЛЕТЫ</Button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activePreset.class === 'select' && (
          <>
            <div className={s.header__controls_select}>
              <div className={cn(s.picker_holder_select)}>
                <div className={s.picker_holder_select_row}>
                  <DestinationPicker />
                  <DatePickerOrigin />
                </div>
                <div className={s.search_btn_holder_select}>
                  <Button className={s.searchBtn}>НАЙТИ БИЛЕТЫ</Button>
                </div>
              </div>
            </div>
            <div className={s.progress}>
              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="26.5" stroke="white" strokeWidth="3" />
                <path d="M30.7441 42H25.6641V22.418L19.5996 24.2988V20.168L30.1992 16.3711H30.7441V42Z" fill="white" />
              </svg>

              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="26.5" stroke="white" strokeWidth="3" />
                <path
                  d="M36.9473 41H19.4043V37.5195L27.6836 28.6953C28.8203 27.4531 29.6582 26.3691 30.1973 25.4434C30.748 24.5176 31.0234 23.6387 31.0234 22.8066C31.0234 21.6699 30.7363 20.7793 30.1621 20.1348C29.5879 19.4785 28.7676 19.1504 27.7012 19.1504C26.5527 19.1504 25.6445 19.5488 24.9766 20.3457C24.3203 21.1309 23.9922 22.168 23.9922 23.457H18.8945C18.8945 21.8984 19.2637 20.4746 20.002 19.1855C20.752 17.8965 21.8066 16.8887 23.166 16.1621C24.5254 15.4238 26.0664 15.0547 27.7891 15.0547C30.4258 15.0547 32.4707 15.6875 33.9238 16.9531C35.3887 18.2188 36.1211 20.0059 36.1211 22.3145C36.1211 23.5801 35.793 24.8691 35.1367 26.1816C34.4805 27.4941 33.3555 29.0234 31.7617 30.7695L25.9434 36.9043H36.9473V41Z"
                  fill="white"
                />
              </svg>

              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="26.5" stroke="white" strokeWidth="3" />
                <path
                  d="M24.5723 25.9531H27.2793C28.5684 25.9531 29.5234 25.6309 30.1445 24.9863C30.7656 24.3418 31.0762 23.4863 31.0762 22.4199C31.0762 21.3887 30.7656 20.5859 30.1445 20.0117C29.5352 19.4375 28.6914 19.1504 27.6133 19.1504C26.6406 19.1504 25.8262 19.4199 25.1699 19.959C24.5137 20.4863 24.1855 21.1777 24.1855 22.0332H19.1055C19.1055 20.6973 19.4629 19.502 20.1777 18.4473C20.9043 17.3809 21.9121 16.5488 23.2012 15.9512C24.502 15.3535 25.9316 15.0547 27.4902 15.0547C30.1973 15.0547 32.3184 15.7051 33.8535 17.0059C35.3887 18.2949 36.1562 20.0762 36.1562 22.3496C36.1562 23.5215 35.7988 24.5996 35.084 25.584C34.3691 26.5684 33.4316 27.3242 32.2715 27.8516C33.7129 28.3672 34.7852 29.1406 35.4883 30.1719C36.2031 31.2031 36.5605 32.4219 36.5605 33.8281C36.5605 36.1016 35.7285 37.9238 34.0645 39.2949C32.4121 40.666 30.2207 41.3516 27.4902 41.3516C24.9355 41.3516 22.8438 40.6777 21.2148 39.3301C19.5977 37.9824 18.7891 36.2012 18.7891 33.9863H23.8691C23.8691 34.9473 24.2266 35.7324 24.9414 36.3418C25.668 36.9512 26.5586 37.2559 27.6133 37.2559C28.8203 37.2559 29.7637 36.9395 30.4434 36.3066C31.1348 35.6621 31.4805 34.8125 31.4805 33.7578C31.4805 31.2031 30.0742 29.9258 27.2617 29.9258H24.5723V25.9531Z"
                  fill="white"
                />
              </svg>

              <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="26.5" stroke="white" strokeWidth="3" />
                <path
                  d="M33.4336 31.3672H36.334V35.4629H33.4336V41H28.3535V35.4629H17.8594L17.6309 32.2637L28.3008 15.4062H33.4336V31.3672ZM22.6934 31.3672H28.3535V22.332L28.0195 22.9121L22.6934 31.3672Z"
                  fill="white"
                />
              </svg>
            </div>
          </>
        )}
      </div>

      <img className={s.back} src={activePreset.back} alt="header background" />
    </header>
  );
});
