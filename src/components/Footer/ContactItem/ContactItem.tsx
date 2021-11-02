import { Link } from 'react-router-dom';
import React, { memo } from 'react';
import cn from 'clsx';
import s from './ContactItem.module.scss';

export type Props = {
  className?: string;
  connectLink: string;
  connectIconSrc: string;
  connectIconAlt: string;
  connectText: string;
};

export const ContactItem = memo<Props>(({ className, connectIconAlt, connectLink, connectIconSrc, connectText }) => {
  const textArr = connectText.split('<br>');
  return (
    <li>
      <Link to={connectLink} className={cn(s.root, className)}>
        <div className={s.icon__container}>
          <img src={connectIconSrc} alt={connectIconAlt} className={s.icon__image} />
        </div>
        <div className={s.text__container}>
          {textArr.map((el) => (
            <span className={s.connection__text} key={el}>
              {el}
            </span>
          ))}
        </div>
      </Link>
    </li>
  );
});
