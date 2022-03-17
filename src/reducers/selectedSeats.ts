import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SelectedSeat } from '../interfaces/Interfaces';

const initialState: SelectedSeat[] = [];

export const selectedSeatsSlice = createSlice({
  name: 'selectedSeats',
  initialState,
  reducers: {
    selectedSeatsReset: () => initialState,
    selectedSeatsSet: (_, action: PayloadAction<SelectedSeat[]>) => action.payload,
    selectedSeatsAdd: (state, action: PayloadAction<SelectedSeat>) => [...state, action.payload],
  },
});

export const { selectedSeatsReset, selectedSeatsSet, selectedSeatsAdd } = selectedSeatsSlice.actions;

export const selectedSeats = selectedSeatsSlice.reducer;
