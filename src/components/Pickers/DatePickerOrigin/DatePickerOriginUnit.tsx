import React, { memo } from 'react';
import { DatePicker } from 'antd';
import locale from 'antd/es/date-picker/locale/ru_RU';
import s from './DatePickerOrigin.module.scss';

export type Props = {
  className?: string;
  dateFormat: string;
  placeholder: string;
  getDate: (value: unknown, dateString: string) => void;
};

export const DatePickerOriginUnit = memo<Props>(({ className, dateFormat, placeholder, getDate }) => (
  <DatePicker
    onChange={getDate}
    className={s.inputItem}
    locale={locale}
    allowClear
    format={dateFormat}
    placeholder={placeholder}
    dropdownClassName={className}
  />
));
