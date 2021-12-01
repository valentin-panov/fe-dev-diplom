/* eslint-disable no-param-reassign */

// Core
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// Server
import { serverURL } from '../App';
// Interfaces
import { City, DestOptions } from '../interfaces/Interfaces';

const initialState: DestOptions = {
  status: 'idle',
  error: '',
  items: [],
};

export const destOptionsFetch = createAsyncThunk('destOptions/FetchingData', async (query: string) => {
  const request = await fetch(`${serverURL}/routes/cities?name=<${query}>`);
  if (!request.ok) {
    throw new Error('Something went wrong');
  }
  const response = await request.json();
  return response;
});

export const destOptionsSlice = createSlice({
  name: 'destOptions',
  initialState,
  reducers: {
    destOptionsSet: (state, action: PayloadAction<City[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(destOptionsFetch.pending, (state) => {
      state.status = 'pending';
      state.error = '';
    });
    builder.addCase(destOptionsFetch.fulfilled, (state, action: PayloadAction<City[]>) => {
      state.items = [...action.payload];
      state.status = 'success';
    });
    builder.addCase(destOptionsFetch.rejected, (state, action) => {
      state.status = 'error';
      state.error = String(action.error.message);
    });
  },
});

export const destOptions = destOptionsSlice.reducer;
export const { destOptionsSet } = destOptionsSlice.actions;
