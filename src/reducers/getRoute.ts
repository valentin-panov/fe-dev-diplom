/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Interfaces
import { GetRoute, GetRouteData } from '../interfaces/Interfaces';

// Server
import { serverURL } from '../App';

const initialState: GetRoute = {
  status: 'idle',
  error: '',
  data: {
    totalCount: 0,
    items: [],
  },
};

export type optionsGetTrains = { departure: number; arrival: number };

export const getRouteFetchData = createAsyncThunk('getRoute/FetchingData', async (options: optionsGetTrains) => {
  const { departure, arrival } = options;
  const reqURL = `${serverURL}/routes?from_city_id=${departure}&to_city_id=${arrival}`;
  const response = await fetch(reqURL);
  if (!response.ok) {
    throw new Error(`request error: ${reqURL}`);
  }
  return response.json();
});

export const getRouteSlice = createSlice({
  name: 'getRoute',
  initialState,
  reducers: {
    getRouteSet: (state, action) => {
      state.data.items = action.payload;
    },
    getRouteReset: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getRouteFetchData.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(getRouteFetchData.fulfilled, (state, action: PayloadAction<GetRouteData>) => {
      state.data.totalCount = action.payload.total_count;
      state.data.items = [...action.payload.items].map((el) => [el]);
      state.status = 'success';
    });
    builder.addCase(getRouteFetchData.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export const { getRouteSet, getRouteReset } = getRouteSlice.actions;

export const getRoute = getRouteSlice.reducer;
