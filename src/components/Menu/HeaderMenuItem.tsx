import { Link } from 'react-router-dom';
import React, { ReactElement } from 'react';

export type Props = {
  id: number;
  className: string;
  title: string;
  pathName: string;
};

export const HeaderMenuItem = ({ className, title, pathName }: Props): ReactElement => (
  <li>
    <Link className={className} to={`/${pathName}`}>
      {title}
    </Link>
  </li>
);
