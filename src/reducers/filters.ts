import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filters } from '../interfaces/Interfaces';

const initialState: Filters = {
  have_first_class: false,
  have_second_class: true,
  have_third_class: true,
  have_fourth_class: false,
  have_wifi: false,
  is_express: false,
  price_from: Number.NEGATIVE_INFINITY,
  price_to: Number.POSITIVE_INFINITY,
};

export const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    filtersSet: (state, action: PayloadAction<Filters>) => ({ ...state, ...action.payload }),
    filtersReset: () => initialState,
  },
});

export const { filtersSet, filtersReset } = filtersSlice.actions;

export const filters = filtersSlice.reducer;
