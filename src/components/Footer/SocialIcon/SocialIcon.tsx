import { Link } from 'react-router-dom';
import React, { memo } from 'react';
import cn from 'clsx';
import s from './SocialIcon.module.scss';

export type Props = {
  className?: string;
  iconLink: string;
  iconSrc: string;
  iconAlt: string;
};

export const SocialIcon = memo<Props>(({ className, iconAlt, iconLink, iconSrc }) => (
  <li className={cn(s.root, className)}>
    <Link to={iconLink}>
      <div className={s.socials__image}>
        <img src={iconSrc} alt={iconAlt} />
      </div>
    </Link>
  </li>
));
