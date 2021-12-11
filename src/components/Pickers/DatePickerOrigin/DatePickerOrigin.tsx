import React, { memo, useMemo, useState } from 'react';
import cn from 'clsx';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import s from './DatePickerOrigin.module.scss';
import { DatePickerOriginUnit, DateType } from './DatePickerOriginUnit';
import { RootState } from '../../../store';
import { setDateForward } from '../../../reducers/dateForward';
import { setDateReturn } from '../../../reducers/dateReturn';

export type Props = {
  className?: string;
};

export type TimeObj = moment.Moment | undefined;

export const DatePickerOrigin = memo<Props>(({ className }) => {
  const dispatch = useDispatch();
  const [forwardMoment, setForwardMoment] = useState<TimeObj>(undefined);
  const [returnMoment, setReturnMoment] = useState<TimeObj>(undefined);
  const forwardStore = useSelector((store: RootState) => store.dateForward);
  const returnStore = useSelector((store: RootState) => store.dateReturn);

  const onChange = (value: moment.Moment | null, dateType: DateType) => {
    if (value) {
      const date = value.format('YYYY-MM-DD');

      if (dateType === 'forward') {
        dispatch(setDateForward(date));
      } else if (dateType === 'return') {
        dispatch(setDateReturn(date));
      }
    }
  };

  useMemo(() => {
    if (forwardStore) {
      setForwardMoment(moment(forwardStore, 'YYYY-MM-DD'));
    }
  }, [forwardStore]);
  useMemo(() => {
    if (returnStore) {
      setReturnMoment(moment(returnStore, 'YYYY-MM-DD'));
    }
  }, [returnStore]);

  return (
    <div className={cn(s.root, className)}>
      <span className={s.title}>Дата</span>
      <div className={s.input_holder}>
        <DatePickerOriginUnit
          dateType="forward"
          defaultValue={forwardMoment}
          getDate={onChange}
          className="headerPicker"
        />
        <DatePickerOriginUnit
          dateType="return"
          defaultValue={returnMoment}
          getDate={onChange}
          className="headerPicker"
        />
      </div>
    </div>
  );
});
