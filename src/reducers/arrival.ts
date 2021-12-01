/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../interfaces/Interfaces';

const initialState: City = { _id: 0, value: '' };

export const arrivalSlice = createSlice({
  name: 'arrival',
  initialState,
  reducers: {
    setArrival: (state: City, action: PayloadAction<City>) => action.payload,
  },
});

export const arrival = arrivalSlice.reducer;
export const { setArrival } = arrivalSlice.actions;
