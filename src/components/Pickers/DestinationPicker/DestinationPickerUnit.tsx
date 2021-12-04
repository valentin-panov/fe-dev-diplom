import { AutoComplete, Input } from 'antd';
import React, { memo, useRef, useState } from 'react';
import {
  BehaviorSubject,
  catchError,
  debounceTime,
  filter,
  map,
  Observable,
  of,
  skip,
  switchMap,
  takeUntil,
} from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { LoadingOutlined } from '@ant-design/icons';
import s from './DestinationPicker.module.scss';
import { ReactComponent as GeoMark } from '../../../svg/icon_geo.svg';
import { City } from '../../../interfaces/Interfaces';
import { capitalize } from '../../../utils/capitalize';
import { serverURL } from '../../../App';

export type Props = {
  className?: string;
  placeholder: string;
  defaultValue: string;
  departureFlag: boolean;
  onSelect: (value: City, param: boolean) => void;
};

// THROTTLING
export type ResponseOptions = { _id: number; name: string }[] | { error: boolean; message: string };

// Here we convert server response into antd-autocomplete-compatible array
export const refineResponseOptions = (responseArray: ResponseOptions): City[] => {
  if (Array.isArray(responseArray)) {
    return responseArray.map((el) =>
      (({ name, _id }) => ({
        _id,
        value: capitalize(name),
      }))(el)
    );
  }
  return [];
};

// It's a HOO, it receives time of debounce,function for getting
// list of suggestions from server, and source stream. It denounces
// function and returns result only if source stream really stops
export const autocomplete =
  (time: number, selector: (arg: string) => Observable<ResponseOptions>) =>
  (source$: Observable<string>): Observable<City[]> =>
    source$.pipe(
      debounceTime(time),
      filter((str) => str.trim() !== ''),
      switchMap((arg: string) => selector(arg).pipe(takeUntil(source$.pipe(skip(1))))),
      map(refineResponseOptions)
    );

// COMPONENT ITSELF
export const DestinationPickerUnit = memo<Props>(
  ({ className, placeholder, defaultValue, onSelect, departureFlag }) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [options, setOptions] = useState<City[]>([]);
    const inputField = useRef(null);
    const term$ = new BehaviorSubject<string>('');

    // This is a function for getting list of suggestions from the server
    const $fetch = (term: string): Observable<ResponseOptions> =>
      fromFetch(`${serverURL}/routes/cities?name=${term}`).pipe(
        switchMap((response) => {
          if (response.ok) {
            // OK return data
            return response.json();
          }
          // Server is returning a status requiring the client to try something else.
          return of({ error: true, message: `Error ${response.status}` });
        }),
        catchError((err) => {
          // Network or other error, handle appropriately
          // eslint-disable-next-line no-console
          console.error(err);
          return of({ error: true, message: err.message });
        })
      );

    const results$ = term$.pipe(autocomplete(1000, (term: string): Observable<ResponseOptions> => $fetch(term)));

    // return selected option to parent component
    const returnSelectedCity = (value: string) => {
      const obj: City | undefined = options.find((el) => el.value === value);
      if (obj) {
        onSelect(obj, departureFlag);
      }
      setLoading(false);
    };

    // Try to update strings in input components
    React.useEffect(() => {
      // eslint-disable-next-line no-console
      console.log('DEFAULT UPDATED ', departureFlag, defaultValue);
      // TODO Реализовать ререндер значений в инпутах

      // useImperativeHandle(ref, () => ({
      //   changeValue: () => {
      //     inputField.current.value = defaultValue;
      //   },
      // }));
    }, [defaultValue, departureFlag]);

    // TODO !!! если здесь добавить какой-либо функционал, поток не отрабатывает.
    //  Была задумка реализовать через setLoading показ иконки загрузки в строке ввода
    const innerOnChange = (value: string) => {
      // setLoading(true);
      term$.next(value);
    };

    // Subscription to the input stream
    React.useEffect(() => {
      const subscription = results$.subscribe({
        next: (term) => {
          // store new value in the state
          setOptions(term);
        },
        error: (err) => {
          // handle error here
          // eslint-disable-next-line no-console
          console.log(err);
          return of(err);
        },
      });
      return () => subscription.unsubscribe();
    }, [results$]);

    return (
      <AutoComplete
        backfill
        dropdownClassName={s.dropdown}
        dropdownMatchSelectWidth
        defaultOpen={false}
        defaultValue={defaultValue}
        options={options}
        filterOption={(inputValue, option) => option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        onSelect={returnSelectedCity}
        onChange={innerOnChange}
        className={className}
        notFoundContent="введите название города"
      >
        <Input
          ref={inputField}
          className={s.autocomplete}
          placeholder={placeholder}
          suffix={<div className={s.geoIcon}>{loading ? <LoadingOutlined /> : <GeoMark />}</div>}
        />
      </AutoComplete>
    );
  }
);
