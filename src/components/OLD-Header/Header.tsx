import React, { memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import cn from 'clsx';

import Menu from './Menu/Menu';
import s from './Header.module.scss';

export type Props = {
  className?: string;
};

export const Header = memo<Props>(({ className }) => {
  const location = useLocation();
  const { pathname } = location;
  const splitLocation: string = pathname.split('/')[1];

  return (
    <Menu className={cn(s.root, className)}>
      <header className="container">
        <div className="row">
          <div className="col">
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <Link className="navbar-brand" to="/">
                Лого
              </Link>
              <div className="collapse navbar-collapse" id="navbarMain">
                <ul className="navbar-nav mr-auto">
                  <li className="nav-item ">
                    <Link className={`nav-link ${splitLocation === '' ? 'active' : ''}`} to="/">
                      Главная
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className={`nav-link ${splitLocation === 'catalog.html' ? 'active' : ''}`} to="/catalog.html">
                      Каталог
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link className={`nav-link ${splitLocation === 'about.html' ? 'active' : ''}`} to="/about.html">
                      О магазине
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      className={`nav-link ${splitLocation === 'contacts.html' ? 'active' : ''}`}
                      to="/contacts.html"
                    >
                      Контакты
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </Menu>
  );
});
