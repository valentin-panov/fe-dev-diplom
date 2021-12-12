import React, { memo, useEffect, useMemo, useState } from 'react';
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
    const date = value ? value.format('YYYY-MM-DD') : null;
    if (dateType === 'forward') {
      dispatch(setDateForward(date));
    } else if (dateType === 'return') {
      dispatch(setDateReturn(date));
    }
  };

  useEffect(() => {
    if (returnStore && forwardStore && returnStore < forwardStore) {
      dispatch(setDateReturn(null));
      // TODO make warning popup
    }
  }, [returnStore, forwardStore, dispatch]);

  useMemo(() => {
    if (forwardStore) {
      setForwardMoment(moment(forwardStore, 'YYYY-MM-DD'));
    } else {
      setForwardMoment(undefined);
    }
  }, [forwardStore]);

  useMemo(() => {
    if (returnStore) {
      setReturnMoment(moment(returnStore, 'YYYY-MM-DD'));
    } else {
      setReturnMoment(undefined);
    }
  }, [returnStore]);

  return (
    <div className={cn(s.root, className)}>
      <span className={s.title}>Дата</span>
      <div className={s.input_holder}>
        <DatePickerOriginUnit
          dateType="forward"
          defaultValue={forwardMoment}
          disableDate={moment()}
          getDate={onChange}
          className="headerPicker"
        />
        <DatePickerOriginUnit
          dateType="return"
          defaultValue={returnMoment}
          disableDate={forwardMoment || moment()}
          getDate={onChange}
          className="headerPicker"
        />
      </div>
    </div>
  );
});
