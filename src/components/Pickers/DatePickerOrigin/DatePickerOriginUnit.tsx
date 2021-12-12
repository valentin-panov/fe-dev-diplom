import React, { memo } from 'react';
import { ConfigProvider, DatePicker } from 'antd';
// eslint-disable-next-line camelcase
import ru_RU from 'antd/lib/locale/ru_RU';

import moment, { Moment } from 'moment';
import 'moment/locale/ru';

import cn from 'clsx';
import s from './DatePickerOrigin.module.scss';
import './replaceAntd.css';

moment.locale('ru');

const dateFormat = 'DD/MM/YY';
const placeholder = 'ДД/ММ/ГГ';

export type DateType = 'forward' | 'return';

export type Props = {
  className: string;
  defaultValue?: moment.Moment;
  disableDate: moment.Moment;
  dateType: DateType;
  getDate: (value: moment.Moment | null, dateType: DateType) => void;
};

export const DatePickerOriginUnit = memo<Props>(({ className, defaultValue, disableDate, getDate, dateType }) => {
  const disabledDate = (current: Moment) =>
    // Restricts select days before today
    current && current < disableDate.startOf('day');

  return (
    // eslint-disable-next-line camelcase
    <ConfigProvider locale={ru_RU}>
      <DatePicker
        className={cn(s.inputItem, s[className])}
        dropdownClassName={s.dropDown}
        onChange={(value) => getDate(value, dateType)}
        value={defaultValue}
        format={dateFormat}
        placeholder={placeholder}
        disabledDate={disabledDate}
        allowClear
      />
    </ConfigProvider>
  );
});
