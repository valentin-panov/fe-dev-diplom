import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const sortSlice = createSlice({
  name: 'sort',
  initialState: 'date',
  reducers: {
    sortSet: (_, action: PayloadAction<string>) => action.payload,
    sortReset: () => 'date',
  },
});

export const { sortSet, sortReset } = sortSlice.actions;

export const sort = sortSlice.reducer;
