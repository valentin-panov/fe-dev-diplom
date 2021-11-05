import React, { memo } from 'react';
import cn from 'clsx';
import { Button, Form, Input } from 'antd';
import s from './Footer.module.scss';
import { ContactItem } from './ContactItem';
import { SocialIcon } from './SocialIcon';
import { Logo } from '../Logo';
import iconCall from './img/iconCall.svg';
import iconMail from './img/iconMail.svg';
import iconSkype from './img/iconSkype.svg';
import iconGeo from './img/iconGeo.svg';
import fb from './img/fb.svg';
import youtube from './img/youtube.svg';
import gPlus from './img/gPlus.svg';
import twt from './img/twt.svg';
import linkedIn from './img/linkedIn.svg';
import btnUp from './img/btnUp.svg';
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
          <ContactItem
            connectLink="/"
            connectIconSrc={iconCall}
            connectIconAlt="iconCall"
            connectText="8 (800) 000 00 00"
          />
          <ContactItem
            connectLink="/"
            connectIconSrc={iconMail}
            connectIconAlt="iconMail"
            connectText="inbox@mail.ru"
          />
          <ContactItem
            connectLink="/"
            connectIconSrc={iconSkype}
            connectIconAlt="iconSkype"
            connectText="tu.train.tickets"
          />
          <ContactItem
            connectLink="/"
            connectIconSrc={iconGeo}
            connectIconAlt="iconGeo"
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
          <SocialIcon iconSrc={youtube} iconLink="/" iconAlt="youtube" />
          <SocialIcon iconSrc={linkedIn} iconLink="/" iconAlt="linkedIn" />
          <SocialIcon iconSrc={gPlus} iconLink="/" iconAlt="gPlus" />
          <SocialIcon iconSrc={fb} iconLink="/" iconAlt="fb" />
          <SocialIcon iconSrc={twt} iconLink="/" iconAlt="twt" />
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
        <img src={btnUp} alt={btnUp} />
      </Button>
      <span className={s.date}>2018 Web</span>
    </div>
  </footer>
));
