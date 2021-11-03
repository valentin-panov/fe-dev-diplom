import React, { memo } from 'react';
import cn from 'clsx';
import s from './Wrapper.module.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';

export type Props = {
  className?: string;
  children: React.ReactChildren | React.ReactNode;
};

export const Wrapper = memo<Props>(({ className, children }) => (
  <div className={cn(s.root, className)}>
    <Header />
    <main>{children}</main>
    <Footer />
  </div>
));
