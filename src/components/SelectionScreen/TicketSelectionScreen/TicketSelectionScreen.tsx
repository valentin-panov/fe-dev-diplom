import React, { memo, useEffect, useRef } from 'react';
import cn from 'clsx';
import { useSelector } from 'react-redux';
import { Button } from 'antd';
import s from './TicketSelectionScreen.module.scss';
import { RootState } from '../../../store';
import { SeatsCard } from './SeatsCard';
// import { trainsList } from '../ResultScreen/data';

export type Props = {
  className?: string;
};

export const TicketSelectionScreen = memo<Props>(({ className }) => {
  const title = useRef<HTMLDivElement>(document.createElement('div'));
  const selectedTrain = useSelector((store: RootState) => store.appState.trainOutbound);
  // const selectedTrain = trainsList[0][0];
  const selectedTrainReturn = useSelector((store: RootState) => store.appState.trainReturn);

  useEffect(() => {
    title.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <div className={cn(s.root, className)}>
      <h2 className={s.title} ref={title}>
        Выбор мест
      </h2>
      {selectedTrain && <SeatsCard type="outbound" data={selectedTrain} />}
      {selectedTrain && selectedTrainReturn && <SeatsCard type="return" data={selectedTrainReturn} />}
      <Button className={s.btn}>ДАЛЕЕ</Button>
    </div>
  );
});
