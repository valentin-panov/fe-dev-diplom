import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const limitSlice = createSlice({
  name: 'limit',
  initialState: 5,
  reducers: {
    limitSet: (_, action: PayloadAction<number>) => action.payload,
    limitReset: () => 5,
  },
});

export const { limitSet, limitReset } = limitSlice.actions;

export const limit = limitSlice.reducer;
