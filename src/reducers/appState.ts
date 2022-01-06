/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  stage: 0,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    appStateSetStage: (state, action: PayloadAction<number>) => {
      state.stage = action.payload;
    },
  },
});

export const { appStateSetStage } = appStateSlice.actions;

export const appState = appStateSlice.reducer;
