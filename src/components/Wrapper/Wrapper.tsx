import React, { memo } from 'react';
import cn from 'clsx';
import s from './Wrapper.module.scss';
import { Header } from '../Header';
import { Footer } from '../Footer';

export type Props = {
  className?: string;
};

export const Wrapper = memo<Props>(({ className }) => (
  <div className={cn(s.root, className)}>
    <Header />
    <main />
    <Footer />
  </div>
));
