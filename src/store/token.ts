import { createSlice } from '@reduxjs/toolkit';
import { CaseReducer } from '@reduxjs/toolkit/src/createReducer';
import { PayloadAction } from '@reduxjs/toolkit/src/createAction';

export const tokenSlice = createSlice<string, { set: CaseReducer<string, PayloadAction<string>> }, 'token'>({
  name: 'token',
  initialState: '',
  reducers: {
    set: (_, action) => action.payload,
  },
});

export const { set } = tokenSlice.actions;

export const token = tokenSlice.reducer;
