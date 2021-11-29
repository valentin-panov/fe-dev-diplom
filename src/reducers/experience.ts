import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const experienceSlice = createSlice({
  name: 'experience',
  initialState: 0,
  reducers: {
    experienceSet: (_, action: PayloadAction<number>) => action.payload,
    experienceIncrease: (state, action: PayloadAction<number>) => state + action.payload,
    experienceDecrease: (state, action: PayloadAction<number>) => state - action.payload,
    experienceReset: () => 0,
  },
});

export const { experienceSet, experienceIncrease, experienceDecrease, experienceReset } = experienceSlice.actions;

export const experience = experienceSlice.reducer;
