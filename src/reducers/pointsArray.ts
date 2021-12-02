/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// Server
import { serverURL } from '../App';
// Interfaces
import { City, DestOptions } from '../interfaces/Interfaces';
// Utils
import { capitalize } from '../utils/capitalize';

const initialState: DestOptions = {
  status: 'idle',
  error: '',
  items: [],
};

const refineResponseOptions = (responseArray: { _id: number; name: string }[]): City[] =>
  responseArray.map((el) =>
    (({ name, _id }) => ({
      _id,
      value: capitalize(name),
    }))(el)
  );

export const fetchPointsArray = createAsyncThunk('pointsArray/FetchingData', async (query: string) => {
  if (!query) {
    throw new Error('Empty request');
  }
  const request = await fetch(`${serverURL}/routes/cities?name=${query}`);
  if (!request.ok) {
    throw new Error('Something went wrong');
  }
  const response = await request.json();
  return refineResponseOptions(response);
});

export const pointsArraySlice = createSlice({
  name: 'pointsArray',
  initialState,
  reducers: {
    setPointsArray: (state, action: PayloadAction<City[]>) => {
      state.items = action.payload;
    },
    clearPointsArray: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPointsArray.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(fetchPointsArray.fulfilled, (state, action: PayloadAction<City[]>) => {
      state.items = [...action.payload];
      state.status = 'success';
    });
    builder.addCase(fetchPointsArray.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export const pointsArray = pointsArraySlice.reducer;
export const { setPointsArray, clearPointsArray } = pointsArraySlice.actions;
