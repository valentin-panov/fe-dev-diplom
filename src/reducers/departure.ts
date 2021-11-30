/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = '';

export const departureSlice = createSlice({
  name: 'departure',
  initialState,
  reducers: {
    setDeparture: (state: string, action: PayloadAction<string>) => action.payload,
  },
});

export const departure = departureSlice.reducer;
export const { setDeparture } = departureSlice.actions;
