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

function disabledDate(current: Moment) {
  // Restricts select days before today
  return current && current < moment().startOf('day');
}

const dateFormat = 'DD/MM/YY';
const placeholder = 'ДД/ММ/ГГ';

export type Props = {
  className: string;
  defaultValue?: moment.Moment;
  getDate: (value: unknown, dateString: string) => void;
};

export const DatePickerOriginUnit = memo<Props>(({ className, defaultValue, getDate }) => (
  // eslint-disable-next-line camelcase
  <ConfigProvider locale={ru_RU}>
    <DatePicker
      className={cn(s.inputItem, s[className])}
      dropdownClassName={s.dropDown}
      onChange={getDate}
      defaultValue={defaultValue}
      format={dateFormat}
      placeholder={placeholder}
      disabledDate={disabledDate}
      allowClear
    />
  </ConfigProvider>
));
