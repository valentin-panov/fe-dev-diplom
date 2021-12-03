import { AutoComplete, Input } from 'antd';
import React, { memo, useState } from 'react';
import { BehaviorSubject, Observable, of } from 'rxjs';
import s from './DestinationPicker.module.scss';
import geoMark from '../../../svg/icon_geo.svg';
import { City } from '../../../interfaces/Interfaces';
import { $fetch, autocomplete, ResponseOptions } from '../../../utils/trottling';

export type Props = {
  className?: string;
  placeholder: string;
  defaultValue: string;
  departureFlag: boolean;
  onSelect: (value: City, param: boolean) => void;
  // givenValue: string;
  // onChangePoint: (value: string, departureFlag: boolean) => void;
};

export const DestinationPickerUnit = memo<Props>(
  ({ className, placeholder, defaultValue, onSelect, departureFlag }) => {
    const [options, setOptions] = useState<City[]>([]);
    const term$ = new BehaviorSubject<string>('');
    const results$ = term$.pipe(autocomplete(1000, (term: string): Observable<ResponseOptions> => $fetch(term)));

    const returnSelectedCity = (value: string) => {
      const obj: City | undefined = options.find((el) => el.value === value);
      if (obj) {
        onSelect(obj, departureFlag);
      }
    };

    const innerOnChange = (value: string) => {
      term$.next(value);
      // onChangePoint(value, departureFlag);
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
        backfill
        dropdownClassName={s.dropdown}
        dropdownMatchSelectWidth
        defaultOpen={false}
        defaultValue={defaultValue}
        // value={givenValue}
        options={options}
        filterOption={(inputValue, option) => option?.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
        onSelect={returnSelectedCity}
        onChange={innerOnChange}
        className={className}
        notFoundContent="введите название города"
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
  }
);
