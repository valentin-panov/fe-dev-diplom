import { Link } from 'react-router-dom';
import React, { memo } from 'react';

export type Props = {
  id: number;
  className: string;
  title: string;
  pathName: string;
};

export const HeaderMenuItem = memo<Props>(({ className, title, pathName }) => (
  <li className="nav-item">
    <Link className={className} to={`/${pathName}`}>
      {title}
    </Link>
  </li>
));
