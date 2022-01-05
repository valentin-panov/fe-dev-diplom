import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, Filters, SearchParams } from '../interfaces/Interfaces';

const initialState: SearchParams = {
  cityDeparture: { _id: 0, value: '' },
  cityArrival: { _id: 0, value: '' },
  dateOutbound: null,
  dateReturn: null,
  filters: {
    have_first_class: false,
    have_second_class: true,
    have_third_class: true,
    have_fourth_class: false,
    have_wifi: false,
    is_express: false,
    price_from: 0,
    price_to: 10000,
  },
  limit: 5,
  sort: 'date',
};

export const searchParamsSlice = createSlice({
  name: 'searchParams',
  initialState,
  reducers: {
    searchParamsReset: () => initialState,
    searchParamsCityDepartureSet: (state, action: PayloadAction<City>) => ({
      ...state,
      cityDeparture: action.payload,
    }),
    searchParamsCityDepartureClear: (state) => ({ ...state, cityDeparture: initialState.cityDeparture }),
    searchParamsCityArrivalSet: (state, action: PayloadAction<City>) => ({
      ...state,
      cityArrival: action.payload,
    }),
    searchParamsCityArrivalClear: (state) => ({ ...state, cityArrival: initialState.cityArrival }),
    searchParamsDateOutboundSet: (state, action: PayloadAction<string | null>) => ({
      ...state,
      dateOutbound: action.payload,
    }),
    searchParamsDateOutboundClear: (state) => ({ ...state, dateOutbound: null }),
    searchParamsDateReturnSet: (state, action: PayloadAction<string | null>) => ({
      ...state,
      dateReturn: action.payload,
    }),
    searchParamsDateReturnClear: (state) => ({ ...state, dateReturn: null }),
    searchParamsFiltersSet: (state, action: PayloadAction<Filters>) => ({
      ...state,
      filters: { ...state.filters, ...action.payload },
    }),
    searchParamsFiltersClear: (state) => ({ ...state, filters: initialState.filters }),
    searchParamsLimitSet: (state, action: PayloadAction<number>) => ({ ...state, limit: action.payload }),
    searchParamsSortSet: (state, action: PayloadAction<string>) => ({ ...state, sort: action.payload }),
  },
});

export const {
  searchParamsReset,
  searchParamsCityDepartureSet,
  searchParamsCityDepartureClear,
  searchParamsCityArrivalSet,
  searchParamsCityArrivalClear,
  searchParamsDateOutboundSet,
  searchParamsDateOutboundClear,
  searchParamsDateReturnSet,
  searchParamsDateReturnClear,
  searchParamsFiltersSet,
  searchParamsFiltersClear,
  searchParamsLimitSet,
  searchParamsSortSet,
} = searchParamsSlice.actions;

export const searchParams = searchParamsSlice.reducer;
