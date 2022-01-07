import React, { memo } from 'react';
import cn from 'clsx';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import s from './TicketSelectionScreen.module.scss';
import { RootState } from '../../../store';
import { SeatsCard } from './SeatsCard';

export type Props = {
  className?: string;
};

export const TicketSelectionScreen = memo<Props>(({ className }) => {
  const selectedTrain = useSelector((store: RootState) => store.appState.trainOutbound);
  const selectedTrainReturn = useSelector((store: RootState) => store.appState.trainReturn);

  return (
    <div className={cn(s.root, className)}>
      <h2 className={s.title}>Выбор мест</h2>
      {selectedTrain && <SeatsCard type="outbound" data={selectedTrain} />}
      {selectedTrain && selectedTrainReturn && <SeatsCard type="return" data={selectedTrainReturn} />}
      <Button className={s.btn}>ДАЛЕЕ</Button>
    </div>
  );
});
