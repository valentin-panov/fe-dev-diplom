import { createSlice } from '@reduxjs/toolkit';

const initialState: string | null = null;

export const dateForwardSlice = createSlice({
  name: 'dateForward',
  initialState,
  reducers: {
    setDateForward: (_, action) => action.payload,
    resetDateForward: () => initialState,
  },
});

export const { setDateForward, resetDateForward } = dateForwardSlice.actions;

export const dateForward = dateForwardSlice.reducer;
