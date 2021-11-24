import React, { memo } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import s from './ResultsLimit.module.scss';

export type Props = {
  className?: string;
};

export const ResultsLimit = memo<Props>(({ className }) => (
  <div className={cn(s.root, className)}>
    <Button>5</Button>
    <Button>10</Button>
    <Button>20</Button>
  </div>
));
