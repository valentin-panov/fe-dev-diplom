import React, { memo } from 'react';
import cn from 'clsx';
import s from './Logo.module.scss';

export type Props = {
  className?: string;
};

export const Logo = memo<Props>(({ className }) => <div className={cn(s.root, className)}>Лого</div>);
