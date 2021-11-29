import { createSlice } from '@reduxjs/toolkit';

const initialState: string | undefined = undefined;

export const dateToSlice = createSlice({
  name: 'dateTo',
  initialState,
  reducers: {
    // dateToSet: (_, action: PayloadAction<string>) => action.payload,
    dateToReset: () => undefined,
  },
});

export const { dateToReset } = dateToSlice.actions;

export const dateTo = dateToSlice.reducer;
