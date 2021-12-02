/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City } from '../interfaces/Interfaces';

const initialState: City = { _id: 0, value: '' };

export const departureSlice = createSlice({
  name: 'departure',
  initialState,
  reducers: {
    setDeparture: (state: City, action: PayloadAction<City>) => action.payload,
    clearDeparture: () => initialState,
  },
});

export const departure = departureSlice.reducer;
export const { setDeparture, clearDeparture } = departureSlice.actions;
