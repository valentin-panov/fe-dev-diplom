import { createSlice } from '@reduxjs/toolkit';

const initialState: string | null = null;

export const dateReturnSlice = createSlice({
  name: 'dateReturn',
  initialState,
  reducers: {
    setDateReturn: (_, action) => action.payload,
    resetDateReturn: () => initialState,
  },
});

export const { setDateReturn, resetDateReturn } = dateReturnSlice.actions;

export const dateReturn = dateReturnSlice.reducer;
