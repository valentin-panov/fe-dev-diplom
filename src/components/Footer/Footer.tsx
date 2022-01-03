import React, { memo, useEffect, useState } from 'react';
import cn from 'clsx';
import { Button, Form, Input, message } from 'antd';
import { FieldData } from 'rc-field-form/lib/interface';

import { useDispatch, useSelector } from 'react-redux';
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
import { postSubscription } from '../../reducers/subrcribe';
import { RootState } from '../../store';

export type Props = {
  className?: string;
};

export const Footer = memo<Props>(({ className }) => {
  const [submitBtnActive, setSubmitBtnActive] = useState<boolean>(false);
  const status = useSelector((store: RootState) => store.subscribe.status);

  const dispatch = useDispatch();

  const checkSubmittable = (allFields: FieldData[]) => {
    setSubmitBtnActive(allFields.every((i) => i.value));
  };

  const onFinish = (values: { email: string }) => {
    dispatch(postSubscription(values.email));
  };

  useEffect(() => {
    if (status === 'pending') {
      message
        .loading({
          content: 'ожидаем ответ сервера..',
          style: {
            marginTop: '40vh',
          },
          key: 'pending',
          duration: 0,
        })
        .then();
    }
    if (status === 'success' || status === 'error') {
      message.destroy('pending');
    }
  }, [status]);

  return (
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
          <Form
            id="subscription"
            name="subscription"
            className={s.subscriptionForm}
            onFieldsChange={checkSubmittable}
            onFinish={onFinish}
          >
            <Form.Item name="email">
              <Input placeholder="e-mail" className={s.emailInput} type="email" inputMode="email" />
            </Form.Item>
            <Button className={s.btn} htmlType="submit" disabled={!submitBtnActive}>
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
  );
});
