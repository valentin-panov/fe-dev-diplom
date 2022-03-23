import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPersonalData, IOrder, IOrderSeat, ISelectedSeat } from '../interfaces/Interfaces';

const initialState: IOrder = {
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
    orderSet: (_, action: PayloadAction<IOrder>) => action.payload,
    orderAddRoute: (state, action: PayloadAction<string>) => ({
      ...state,
      departure: {
        ...state.departure,
        route_direction_id: action.payload,
      },
    }),
    orderAddSeat: (state, action: PayloadAction<ISelectedSeat>) => ({
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
    orderSetSeats: (state, action: PayloadAction<IOrderSeat[]>) => ({
      ...state,
      departure: {
        ...state.departure,
        seats: action.payload,
      },
    }),
    orderSetPD: (state, action: PayloadAction<IPersonalData>) => ({
      ...state,
      user: action.payload,
    }),
  },
});

export const { orderReset, orderSet, orderAddRoute, orderAddSeat, orderSetSeats, orderSetPD } = orderSlice.actions;

export const order = orderSlice.reducer;
