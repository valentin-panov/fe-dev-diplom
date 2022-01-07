/* eslint-disable no-param-reassign */

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Train } from '../interfaces/Interfaces';

type InitialState = {
  progress: number;
  trainOutbound?: Train;
  trainReturn?: Train;
};

const initialState: InitialState = {
  progress: 0,
};

export const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    appStateSetProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload;
    },
    appStateSetTrainOutbound: (state, action: PayloadAction<Train>) => {
      state.trainOutbound = action.payload;
    },
    appStateResetTrainOutbound: (state) => {
      state.trainOutbound = undefined;
    },
    appStateSetTrainReturn: (state, action: PayloadAction<Train>) => {
      state.trainReturn = action.payload;
    },
    appStateResetTrainReturn: (state) => {
      state.trainReturn = undefined;
    },
  },
});

export const {
  appStateSetProgress,
  appStateSetTrainOutbound,
  appStateResetTrainOutbound,
  appStateSetTrainReturn,
  appStateResetTrainReturn,
} = appStateSlice.actions;

export const appState = appStateSlice.reducer;
