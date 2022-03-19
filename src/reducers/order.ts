import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, SelectedSeat } from '../interfaces/Interfaces';

const initialState: Order = {
  user: {
    first_name: '',
    last_name: '',
    patronymic: '',
    phone: '',
    email: '',
    payment_method: 'cash',
  },
  departure: {
    route_direction_id: '',
    seats: [],
  },
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderReset: () => initialState,
    orderSet: (_, action: PayloadAction<Order>) => action.payload,
    orderAddRoute: (state, action: PayloadAction<string>) => ({
      ...state,
      departure: {
        ...state.departure,
        route_direction_id: action.payload,
      },
    }),
    orderAddSeat: (state, action: PayloadAction<SelectedSeat>) => ({
      ...state,
      departure: {
        ...state.departure,
        seats: [
          ...state.departure.seats,
          {
            price: action.payload.price || '',
            coach_id: action.payload.coach_id || '',
            seat_number: action.payload.seat_number || '',
            is_child: action.payload.is_child,
            include_children_seat: action.payload.include_children_seat,
          },
        ],
      },
    }),
  },
});

export const { orderReset, orderSet, orderAddRoute, orderAddSeat } = orderSlice.actions;

export const order = orderSlice.reducer;
