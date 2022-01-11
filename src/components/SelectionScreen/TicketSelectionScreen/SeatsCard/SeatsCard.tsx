import React, { memo, useState } from 'react';
import cn from 'clsx';
import { Button, Form, Input } from 'antd';
import { useDispatch } from 'react-redux';
import s from './SeatsCard.module.scss';
import './reant.css';
import { Train } from '../../../../interfaces/Interfaces';
import { filtersCollection, iconsCollection } from '../../../../collections/collections';
import { capitalize } from '../../../../utils/capitalize';
import { sec2hhmm } from '../../../../utils/sec2hhmm';
import { secToDateTime } from '../../../../utils/secToDateTime';
import { appStateResetTrainOutbound, appStateResetTrainReturn } from '../../../../reducers/appState';
import { getBeautifulNumber } from '../../../../utils/getBeatifulNumber';
import { CarriageTypeButton } from './CarriageTypeButton';
import { CarriageScheme } from './CarriageScheme';
import { CarriageNumberButton } from './CarriageNumberButton';

export type Props = {
  className?: string;
  type: 'outbound' | 'return';
  data: Train;
};

export type CarriageType = undefined | 'first' | 'second' | 'third' | 'fourth';

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

  const [carriageType, setCarriageType] = useState<CarriageType>(undefined);
  const [totalPrice, setTotalPrice] = useState<number>(8080);
  const [carriageNumber, setCarriageNumber] = useState<number>(22);

  const anotherTrain = (arg: string) => {
    if (arg === 'outbound') {
      dispatch(appStateResetTrainOutbound());
    } else if (arg === 'return') {
      dispatch(appStateResetTrainReturn());
    }
  };

  const chooseCarriageType = (value: CarriageType) => {
    setCarriageType(value);
    setTotalPrice(7000);
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
        <CarriageTypeButton
          carriageType="fourth"
          toggleType={chooseCarriageType}
          available={data.departure.have_fourth_class}
        />
        <CarriageTypeButton
          carriageType="third"
          toggleType={chooseCarriageType}
          available={data.departure.have_third_class}
        />
        <CarriageTypeButton
          carriageType="second"
          toggleType={chooseCarriageType}
          available={data.departure.have_second_class}
        />
        <CarriageTypeButton
          carriageType="first"
          toggleType={chooseCarriageType}
          available={data.departure.have_first_class}
        />
      </div>
      {carriageType !== undefined && (
        <>
          <div className={s.carriageList}>
            <div className={s.carriages}>Вагоны</div>
            <div className={s.carriagesNumbers}>
              <CarriageNumberButton
                buttonNumber={7}
                toggleCarriage={setCarriageNumber}
                activeCarriage={carriageNumber}
              />
              <CarriageNumberButton
                buttonNumber={22}
                toggleCarriage={setCarriageNumber}
                activeCarriage={carriageNumber}
              />
            </div>
            <div className={s.carriages}>Нумерация вагонов начинается с головы поезда</div>
          </div>
          <div className={s.selectedCarriage}>
            <div className={s.selectedCarriageNumber}>
              <div className={s.number}>{carriageNumber}</div>
              <div className={s.subNumber}>вагон</div>
            </div>
            <div className={s.selectedCarriageInfoBox}>
              <div className={s.selectedCarriageInfo}>
                <div className={s.sciBlock}>
                  <div className={s.seatsPrice}>
                    <div>
                      <div>
                        Места <span className={s.seatsCount}>{data.available_seats_info[carriageType]}</span>
                      </div>
                      <div className={s.seatsType}>
                        Верхние <span className={s.seatsTypeNumber}>{10}</span>
                      </div>
                      <div className={s.seatsType}>
                        Нижние <span className={s.seatsTypeNumber}>{11}</span>
                      </div>
                    </div>
                    <div>
                      <div>Стоимость</div>
                      <div className={s.price}>
                        {getBeautifulNumber(1920)}
                        <div className={s.rub}>{iconsCollection.rub}</div>
                      </div>
                      <div className={s.price}>
                        {getBeautifulNumber(1920)}
                        <div className={s.rub}>{iconsCollection.rub}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={s.sciBlock}>
                  <div>Обслуживание ФПК</div>
                  <div className={s.sciBlockServices}>
                    {data.departure.have_air_conditioning && (
                      <div>{filtersCollection.have_air_conditioning.element}</div>
                    )}
                    {data.departure.have_wifi && <div>{filtersCollection.have_wifi.element}</div>}
                    <div>{filtersCollection.linen.element}</div>
                    <div>{filtersCollection.cup.element}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={s.preSchemeDivider}>
            <div className={s.preSchemeDividerTooltip}>{11} человек выбирают места в этом поезде</div>
          </div>
          <div className={s.carriageScheme}>
            <CarriageScheme carriageType={carriageType} />
          </div>

          {totalPrice !== 0 && (
            <>
              <div className={s.totalPrice}>
                <div className={s.totalPriceNumbers}>{getBeautifulNumber(totalPrice)}</div>
                <div className={s.totalPriceSymbol}>{iconsCollection.rub}</div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
});
