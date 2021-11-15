import React, { memo } from 'react';
import { ConfigProvider, DatePicker } from 'antd';
// eslint-disable-next-line camelcase
import ru_RU from 'antd/lib/locale/ru_RU';

import moment from 'moment';
import 'moment/locale/ru';

import cn from 'clsx';
import s from './DatePickerOrigin.module.scss';

moment.locale('ru');

export type Props = {
  className?: string;
  dateFormat: string;
  placeholder: string;
  getDate: (value: unknown, dateString: string) => void;
};

export const DatePickerOriginUnit = memo<Props>(({ className, dateFormat, placeholder, getDate }) => (
  // eslint-disable-next-line camelcase
  <ConfigProvider locale={ru_RU}>
    <DatePicker
      onChange={getDate}
      className={cn(s.inputItem, className)}
      allowClear
      format={dateFormat}
      placeholder={placeholder}
      dropdownClassName={s.dropDown}
    />
  </ConfigProvider>
));
