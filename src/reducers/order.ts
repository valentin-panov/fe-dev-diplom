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
    seats: [
      {
        price: '',
        coach_id: '',
        seat_number: '',
        person_info: {
          is_adult: true,
          first_name: '',
          last_name: '',
          patronymic: '',
          gender: true,
          birthday: '',
          document_type: 'паспорт',
          document_data: '',
        },
        is_child: true,
        include_children_seat: true,
      },
    ],
  },
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    orderReset: () => initialState,
    orderSet: (_, action: PayloadAction<Order>) => action.payload,
    orderAdd: (state, action: PayloadAction<SelectedSeat>) => ({
      ...state,
      departure: {
        route_direction_id: action.payload.route_direction_id,
        seats: [
          ...state.departure.seats,
          // {
          //   price: action.payload.price,
          //   coach_id: action.payload.coach_id,
          //   seat_number: action.payload.seat_number,
          // },
        ],
      },
    }),
  },
});

export const { orderReset, orderSet, orderAdd } = orderSlice.actions;

export const order = orderSlice.reducer;
