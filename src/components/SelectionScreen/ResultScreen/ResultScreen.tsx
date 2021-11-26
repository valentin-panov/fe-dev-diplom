import React, { memo, useState } from 'react';
import cn from 'clsx';
import { CascaderValueType } from 'rc-cascader/lib/interface';
import s from './ResultScreen.module.scss';
import { SortFilter } from './SortFilter';
import { ResultsLimit } from './ResultsLimit';
import { Train } from '../../../global';
import { TrainCard } from './TrainCard';

export type Props = {
  className?: string;
};

export type Options = { value: string; label: string }[];

const options: Options = [
  {
    value: 'time',
    label: 'времени',
  },
  {
    value: 'price',
    label: 'стоимости',
  },
  {
    value: 'duration',
    label: 'длительности',
  },
];

const trains: Train[] = [
  {
    have_first_class: false,
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_wifi: false,
    have_air_conditioning: false,
    is_express: false,
    min_price: 1638,
    available_seats: 129,
    available_seats_info: {
      first: 18,
      second: 64,
      third: 48,
    },
    departure: {
      _id: 6398,
      have_first_class: true,
      have_second_class: true,
      have_third_class: true,
      have_fourth_class: false,
      have_wifi: true,
      have_air_conditioning: true,
      is_express: false,
      min_price: 1638,
      duration: 221340,
      available_seats: 129,
      available_seats_info: {
        first: 18,
        second: 64,
        third: 48,
      },
      train: {
        _id: 1397,
        name: 'Перун - 87',
      },
      from: {
        railway_station_name: 'Московский',
        city: {
          _id: 1492,
          name: 'нижний новгород',
        },
        datetime: 1616772581,
      },
      to: {
        railway_station_name: 'Ярославский',
        city: {
          _id: 1491,
          name: 'москва',
        },
        datetime: 1616993921,
      },
      price_info: {
        first: {
          price: 2520,
          top_price: 3110,
          bottom_price: 4555,
        },
        second: {
          top_price: 1731,
          bottom_price: 1638,
        },
        third: {
          top_price: 2910,
          bottom_price: 3350,
          side_price: 2775,
        },
      },
    },
  },
  {
    have_first_class: false,
    have_second_class: false,
    have_third_class: false,
    have_fourth_class: false,
    have_wifi: false,
    have_air_conditioning: false,
    is_express: false,
    min_price: 1845,
    available_seats: 81,
    available_seats_info: {
      first: 18,
      second: 64,
    },
    departure: {
      _id: 8696,
      have_first_class: true,
      have_second_class: true,
      have_third_class: false,
      have_fourth_class: false,
      have_wifi: true,
      have_air_conditioning: true,
      is_express: false,
      min_price: 1845,
      duration: 196140,
      available_seats: 81,
      available_seats_info: {
        first: 18,
        second: 64,
      },
      train: {
        _id: 1156,
        name: 'Иволга - 35',
      },
      from: {
        railway_station_name: 'Московский',
        city: {
          _id: 1492,
          name: 'санкт-петербург',
        },
        datetime: 1616900834,
      },
      to: {
        railway_station_name: 'Киевский',
        city: {
          _id: 1491,
          name: 'москва',
        },
        datetime: 1617096974,
      },
      price_info: {
        first: {
          price: 3360,
          top_price: 3840,
          bottom_price: 2785,
        },
        second: {
          top_price: 2352,
          bottom_price: 1845,
        },
      },
    },
  },
];

const found = 20;

export const ResultScreen = memo<Props>(({ className }) => {
  const [activeSort, setActiveSort] = useState<CascaderValueType>(['time']);
  const [activeLimit, setActiveLimit] = useState(5);

  const onClickLimit = (el: number) => {
    setActiveLimit(el);
  };
  const onChangeSort = (value: CascaderValueType) => {
    // console.log(value);
    setActiveSort(value);
  };

  return (
    <section className={cn(s.root, className)}>
      <div className={s.header}>
        <div>найдено&nbsp;{found}</div>
        <div>
          сортировать по:
          <SortFilter onChange={onChangeSort} active={activeSort} options={options} />
        </div>
        <div>
          показывать по:&nbsp;
          <ResultsLimit variants={[5, 10, 20]} active={activeLimit} onClick={onClickLimit} />
        </div>
      </div>
      <div className={s.trainList}>
        {trains.map((train) => {
          // eslint-disable-next-line no-underscore-dangle
          const key = train.departure.train._id;
          return <TrainCard train={train} key={key} />;
        })}
      </div>
    </section>
  );
});
