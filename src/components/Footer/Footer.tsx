import React, { memo } from 'react';
import cn from 'clsx';
import { Button, Form, Input } from 'antd';
import s from './Footer.module.scss';
import { ContactItem } from './ContactItem';
import { Logo } from '../Logo';
import { ReactComponent as IconCall } from './img/iconCall.svg';
import { ReactComponent as IconMail } from './img/iconMail.svg';
import { ReactComponent as IconSkype } from './img/iconSkype.svg';
import { ReactComponent as IconGeo } from './img/iconGeo.svg';
import { ReactComponent as Fb } from './img/fb.svg';
import { ReactComponent as Youtube } from './img/youtube.svg';
import { ReactComponent as GPlus } from './img/gPlus.svg';
import { ReactComponent as Twt } from './img/twt.svg';
import { ReactComponent as LinkedIn } from './img/linkedIn.svg';
import { ReactComponent as BtnUp } from './img/btnUp.svg';

import { FooterTitle } from './FooterTitle';
import { FooterSubtitle } from './FooterSubtitle';

export type Props = {
  className?: string;
};

export const Footer = memo<Props>(({ className }) => (
  <footer className={cn(s.root, className)} id="contacts">
    <div className={s.top}>
      <section className={s.topSection}>
        <FooterTitle text="Свяжитесь с нами" />
        <ul className={s.connectBlockContainer}>
          <ContactItem connectLink="/" connectIconSrc={<IconCall />} connectText="8 (800) 000 00 00" />
          <ContactItem connectLink="/" connectIconSrc={<IconMail />} connectText="inbox@mail.ru" />
          <ContactItem connectLink="/" connectIconSrc={<IconSkype />} connectText="tu.train.tickets" />
          <ContactItem
            connectLink="/"
            connectIconSrc={<IconGeo />}
            connectText="г. Москва<br>ул. Московская 27-35<br>555 555"
          />
        </ul>
      </section>
      <section className={s.topSection}>
        <FooterTitle text="Подписка" />
        <FooterSubtitle text="Будьте в курсе событий" />
        <Form className={s.subscriptionForm}>
          <Input placeholder="e-mail" className={s.emailInput} />
          <Button className={s.btn} htmlType="submit">
            ОТПРАВИТЬ
          </Button>
        </Form>
        <FooterTitle text="Подписывайтесь на нас" />
        <ul className={s.socials__imageContainer}>
          <Youtube />
          <LinkedIn />
          <GPlus />
          <Fb />
          <Twt />
        </ul>
      </section>
    </div>
    <div className={s.bottom}>
      <Logo />
      <Button
        shape="circle"
        className={s.upBtn}
        onClick={() =>
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          })
        }
      >
        <BtnUp />
      </Button>
      <span className={s.date}>2018 Web</span>
    </div>
  </footer>
));
