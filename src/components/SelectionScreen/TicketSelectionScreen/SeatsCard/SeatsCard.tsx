/* eslint-disable no-underscore-dangle */
import React, { memo, useEffect, useState } from 'react';
import cn from 'clsx';
import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
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
import { trainSeatsReset } from '../../../../reducers/getSeats';
import { TrainData } from './TrainData';
import { TicketsCount } from './TicketsCount';
import { RootState } from '../../../../store';

export type Props = {
  className?: string;
  type: 'outbound' | 'return';
  data: Train;
};

export type CarriageType = undefined | 'first' | 'second' | 'third' | 'fourth';

export const SeatsCard = memo<Props>(({ className, type, data }) => {
  const dispatch = useDispatch();

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
  const [carriageNumber, setCarriageNumber] = useState<number>(0);
  const [ticketsCount, setTicketsCount] = useState({ adultCount: 0, childrenCount: 0, toddlerCount: 0 });

  const trainSeats = useSelector((store: RootState) => store.trainSeats.items);

  const anotherTrain = (arg: string) => {
    if (arg === 'outbound') {
      dispatch(appStateResetTrainOutbound());
    } else if (arg === 'return') {
      dispatch(appStateResetTrainReturn());
    }
    dispatch(trainSeatsReset());
  };

  const chooseCarriageType = (value: CarriageType) => {
    setCarriageType(value);

    setTotalPrice(7000);
  };

  useEffect(() => {
    const firstCoach = trainSeats
      .filter((coach) => coach.coach.class_type === carriageType)
      .find((coach) => coach.coach._id);
    if (firstCoach) {
      setCarriageNumber(firstCoach.coach._id);
    }
  }, [carriageType, trainSeats]);

  const getTicketsCount = (adultCount: number, childrenCount: number, toddlerCount: number) => {
    setTicketsCount({ adultCount, childrenCount, toddlerCount });
    // eslint-disable-next-line no-console
    console.log(trainSeats, ticketsCount.adultCount + ticketsCount.childrenCount);
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

      <TrainData data={{ type, trainId, pointA, stationA, timeA, pointB, stationB, timeB, duration }} />

      <TicketsCount getTicketsCount={getTicketsCount} />

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
              {trainSeats
                .filter((coach) => coach.coach.class_type === carriageType)
                .map((coach) => (
                  <CarriageNumberButton
                    buttonNumber={coach.coach._id}
                    toggleCarriage={setCarriageNumber}
                    activeCarriage={carriageNumber}
                  />
                ))}
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
                      {carriageType === 'first' && <></>}
                      {carriageType === 'second' && (
                        <>
                          <div className={s.seatsType}>
                            Верхние
                            <span className={s.seatsTypeNumber}>{data.departure.available_seats_info.second}</span>
                          </div>
                          <div className={s.seatsType}>
                            Нижние
                            <span className={s.seatsTypeNumber}>{data.departure.available_seats_info.second}</span>
                          </div>
                        </>
                      )}
                      {carriageType === 'third' && (
                        <>
                          <div className={s.seatsType}>
                            Верхние
                            <span className={s.seatsTypeNumber}>{data.departure.available_seats_info.third}</span>
                          </div>
                          <div className={s.seatsType}>
                            Нижние
                            <span className={s.seatsTypeNumber}>{data.departure.available_seats_info.third}</span>
                          </div>
                          <div className={s.seatsType}>
                            Боковые
                            <span className={s.seatsTypeNumber}>{data.departure.available_seats_info.third}</span>
                          </div>
                        </>
                      )}
                      {carriageType === 'fourth' && <></>}
                    </div>
                    <div>
                      <div>Стоимость</div>
                      {carriageType === 'first' && data.departure.price_info.first && (
                        <div className={s.price}>
                          {getBeautifulNumber(data.departure.price_info.first.price)}
                          <div className={s.rub}>{iconsCollection.rub}</div>
                        </div>
                      )}
                      {carriageType === 'second' && data.departure.price_info.second && (
                        <>
                          <div className={s.price}>
                            {getBeautifulNumber(data.departure.price_info.second.top_price)}
                            <div className={s.rub}>{iconsCollection.rub}</div>
                          </div>
                          <div className={s.price}>
                            {getBeautifulNumber(data.departure.price_info.second.bottom_price)}
                            <div className={s.rub}>{iconsCollection.rub}</div>
                          </div>
                        </>
                      )}
                      {carriageType === 'third' && data.departure.price_info.third && (
                        <>
                          <div className={s.price}>
                            {getBeautifulNumber(data.departure.price_info.third.top_price)}
                            <div className={s.rub}>{iconsCollection.rub}</div>
                          </div>
                          <div className={s.price}>
                            {getBeautifulNumber(data.departure.price_info.third.bottom_price)}
                            <div className={s.rub}>{iconsCollection.rub}</div>
                          </div>
                          <div className={s.price}>
                            {getBeautifulNumber(data.departure.price_info.third.side_price)}
                            <div className={s.rub}>{iconsCollection.rub}</div>
                          </div>
                        </>
                      )}
                      {carriageType === 'fourth' && data.departure.price_info.fourth && (
                        <div className={s.price}>
                          {getBeautifulNumber(data.departure.price_info.fourth.top_price)}
                          <div className={s.rub}>{iconsCollection.rub}</div>
                        </div>
                      )}
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
