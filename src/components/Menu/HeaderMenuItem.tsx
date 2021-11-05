import { HashLink as Link } from 'react-router-hash-link';
import React, { ReactElement } from 'react';
import smoothscroll from 'smoothscroll-polyfill';

export type Props = {
  id: number;
  className: string;
  title: string;
  pathName: string;
};

// kick off the polyfill!
smoothscroll.polyfill();

export const HeaderMenuItem = ({ className, title, pathName }: Props): ReactElement => (
  <li>
    <Link smooth className={className} to={`/${pathName}`}>
      {title}
    </Link>
  </li>
);
