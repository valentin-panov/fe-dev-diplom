import { AutoComplete, Input } from 'antd';
import React, { memo, useState } from 'react';
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
import s from './DestinationPicker.module.scss';
import geoMark from '../../../svg/icon_geo.svg';
import { City } from '../../../interfaces/Interfaces';
import { capitalize } from '../../../utils/capitalize';

export type Props = {
  className?: string;
  placeholder: string;
  defaultValue: string;
  param: boolean;
  onSelect: (value: City, param: boolean) => void;
};

export type ResponseOptions = { _id: number; name: string }[] | { error: boolean; message: string };

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

export const autocomplete =
  (time: number, selector: (arg: string) => Observable<ResponseOptions>) =>
  (source$: Observable<string>): Observable<City[]> =>
    source$.pipe(
      debounceTime(time),
      filter((str) => str.trim() !== ''),
      switchMap((arg: string) => selector(arg).pipe(takeUntil(source$.pipe(skip(1))))),
      map(refineResponseOptions)
    );

export const $fetch = (term: string): Observable<ResponseOptions> =>
  fromFetch(`https://fe-diplom.herokuapp.com/routes/cities?name=${term}`).pipe(
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

export const DestinationPickerUnit = memo<Props>(({ className, placeholder, defaultValue, onSelect, param }) => {
  const [options, setOptions] = useState<City[]>([]);
  const term$ = new BehaviorSubject<string>('');
  const results$ = term$.pipe(autocomplete(1000, (term: string): Observable<ResponseOptions> => $fetch(term)));

  const returnSelectedCity = (value: string) => {
    const obj: City | undefined = options.find((el) => el.value === value);
    if (obj) {
      onSelect(obj, param);
    }
  };

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
      dropdownClassName={s.dropdown}
      dropdownMatchSelectWidth
      defaultOpen={false}
      backfill
      defaultValue={defaultValue}
      options={options}
      filterOption={(inputValue, option) => option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
      onSelect={returnSelectedCity}
      onChange={(value) => term$.next(value)}
      className={className}
    >
      <Input
        className={s.autocomplete}
        placeholder={placeholder}
        suffix={
          <div className={s.geoIcon}>
            <img src={geoMark} alt="geo icon" />
          </div>
        }
      />
    </AutoComplete>
  );
});
