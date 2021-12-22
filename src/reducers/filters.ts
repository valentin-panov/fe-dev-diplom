import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Filters } from '../interfaces/Interfaces';

const initialState: Filters = {
  have_first_class: true,
  have_second_class: true,
  have_third_class: true,
  have_fourth_class: true,
  have_wifi: true,
  is_express: true,
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
