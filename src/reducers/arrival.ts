/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = '';

export const arrivalSlice = createSlice({
  name: 'arrival',
  initialState,
  reducers: {
    setArrival: (state: string, action: PayloadAction<string>) => action.payload,
  },
});

export const arrival = arrivalSlice.reducer;
export const { setArrival } = arrivalSlice.actions;
