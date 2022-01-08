import React, { memo } from 'react';
import cn from 'clsx';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import s from './SeatsCard.module.scss';
import './reant.css';
import { Train } from '../../../../interfaces/Interfaces';
import { iconsCollection } from '../../../../collections/collections';
import { capitalize } from '../../../../utils/capitalize';
import { sec2hhmm } from '../../../../utils/sec2hhmm';
import { secToDateTime } from '../../../../utils/secToDateTime';
import { appStateResetTrainOutbound, appStateResetTrainReturn } from '../../../../reducers/appState';

export type Props = {
  className?: string;
  type: 'outbound' | 'return';
  data: Train;
};

export const SeatsCard = memo<Props>(({ className, type, data }) => {
  const dispatch = useDispatch();

  // eslint-disable-next-line no-underscore-dangle
  const trainId = data.departure.train._id;
  const pointA = capitalize(data.departure.from.city.name);
  const pointB = capitalize(data.departure.to.city.name);
  const stationA = capitalize(data.departure.from.railway_station_name);
  const stationB = capitalize(data.departure.to.railway_station_name);
  const timeA = secToDateTime(data.departure.from.datetime);
  const timeB = secToDateTime(data.departure.to.datetime);
  const duration = sec2hhmm(data.departure.duration);

  const anotherTrain = (arg: string) => {
    if (arg === 'outbound') {
      dispatch(appStateResetTrainOutbound());
    } else if (arg === 'return') {
      dispatch(appStateResetTrainReturn());
    }
  };

  return (
    <section className={cn(s.root, className)}>
      <div className={s.header}>
        {type === 'outbound' && iconsCollection.forwardBig}
        {type === 'return' && iconsCollection.backwardBig}
        <Button className={s.btnHeader} onClick={() => anotherTrain(type)}>
          Выбрать другой поезд
        </Button>
      </div>
      <div className={s.trainData}>
        <div className={s.index}>
          <div className={s.icon}>{iconsCollection.trainSmall}</div>

          <div className={s.textIndex}>
            <div className={s.trainId}>{trainId}</div>
            <div>
              <div className={s.textContainer}>
                {pointA}&nbsp;
                {iconsCollection.arrowRB}
              </div>
              <div className={s.textContainer}>{pointB}</div>
            </div>
          </div>
        </div>

        <div className={s.points}>
          <div className={s.col1}>
            <div className={s.time}>{timeA}</div>
            <div className={s.city}>{pointA}</div>
            <div className={s.station}>{stationA}</div>
          </div>
          <div className={s.col2}>{type === 'outbound' ? iconsCollection.arrowRY : iconsCollection.arrowLY}</div>
          <div className={s.col1}>
            <div className={s.time}>{timeB}</div>
            <div className={s.city}>{pointB}</div>
            <div className={s.station}>{stationB}</div>
          </div>
        </div>
        <div className={s.duration}>
          {iconsCollection.clock}
          <div className={s.durationText}>
            <div>{duration.hours}</div>
            <div>{duration.minutes}</div>
          </div>
        </div>
      </div>
      <div className={s.ticketsCountTitle}>Количество билетов</div>
      <Form className={s.ticketsTypeRow}>
        <Form.Item className={s.inputCard}>
          <Input type="number" prefix="Взрослых — " defaultValue={0} min={0} max={5} className={s.input} />
          <div>Можно добавить еще 3 пассажиров</div>
        </Form.Item>
        <Form.Item className={s.inputCard}>
          <Input type="number" prefix="Детских — " defaultValue={0} min={0} className={s.input} id="kids" />
          <div>
            Можно добавить еще 3 детей до 10 лет. Свое место в вагоне, как у взрослых, но дешевле в среднем на 50-65%
          </div>
        </Form.Item>
        <Form.Item className={s.inputCard}>
          <Input type="number" prefix="Детских «без места» — " defaultValue={0} min={0} className={s.input} />
        </Form.Item>
      </Form>
      <div className={s.divider} />

      <div className={s.carriageTypeTitle}>Тип вагона</div>
      <div className={s.carriageTypeIcons}>
        <div className={s.carriageTypeIcon}>
          {iconsCollection.bigSeat}
          <div className={s.carriageTypeSubtitle}>сидячий</div>
        </div>
        <div className={s.carriageTypeIcon}>
          {iconsCollection.bigPlatz}
          <div className={s.carriageTypeSubtitle}>плацкарт</div>
        </div>
        <div className={s.carriageTypeIcon}>
          {iconsCollection.bigCoupe}
          <div className={s.carriageTypeSubtitle}>купе</div>
        </div>
        <div className={s.carriageTypeIcon}>
          {iconsCollection.bigLux}
          <div className={s.carriageTypeSubtitle}>люкс</div>
        </div>
      </div>
      <div className={s.carriageList}>
        <div>Вагоны</div>
        <div>07 09</div>
        <div>Нумерация вагонов начинается с головы поезда</div>
      </div>
      <div>Selected Carriage</div>
      <div>DIVIDER - 11 человек выбирают места в этом поезде</div>
      <div>CARRIAGE SCHEME</div>
      <div>Total Price</div>
    </section>
  );
});
