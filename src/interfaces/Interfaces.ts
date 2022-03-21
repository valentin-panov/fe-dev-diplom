/* eslint-disable camelcase */

import { ReactElement } from 'react';

export interface Status {
  status: 'idle' | 'pending' | 'success' | 'error';
  error: string;
}

export interface Menu {
  id: number;
  title: string;
  pathName: string;
}

export interface City {
  _id: number;
  value: string;
}

export interface LastTickets extends Status {
  items: Train[];
}

export interface GetRouteData {
  total_count: number;
  items: Train[];
}

export interface GetRoute extends Status {
  data: {
    totalCount: number;
    items: Train[][];
  };
}

export interface DestOptions extends Status {
  items: City[];
}

export interface FilterItem {
  [index: string]: {
    element: ReactElement;
    title: string;
  };
}

export interface Services {
  have_wifi: boolean;
  is_express: boolean;
  have_air_conditioning: boolean;
}

export interface Train {
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  is_express: boolean;
  min_price: number;
  available_seats: number;
  available_seats_info: SeatsSpectre;
  departure: {
    _id: number;
    have_first_class: boolean;
    have_second_class: boolean;
    have_third_class: boolean;
    have_fourth_class: boolean;
    have_wifi: boolean;
    have_air_conditioning: boolean;
    is_express: boolean;
    min_price: number;
    duration: number;
    available_seats: number;
    available_seats_info: SeatsSpectre;
    train: {
      _id: number;
      name: string;
    };
    from: {
      railway_station_name: string;
      city: {
        _id: number;
        name: string;
      };
      datetime: number;
    };
    to: {
      railway_station_name: string;
      city: {
        _id: number;
        name: string;
      };
      datetime: number;
    };
    price_info: PriceInfo;
  };
}

export interface PriceInfo {
  first?: {
    price: number;
    top_price?: number;
    bottom_price?: number;
  };
  second?: {
    top_price: number;
    bottom_price: number;
  };
  third?: {
    top_price: number;
    bottom_price: number;
    side_price: number;
  };
  fourth?: {
    top_price: number;
    bottom_price: number;
  };
}

export interface SeatsSpectre {
  first?: number;
  second?: number;
  third?: number;
  fourth?: number;
}

export interface SortOption {
  value: string;
  label: string;
}

export type SortOptions = SortOption[];

// export carriageType sortVariants = 'date' | 'price_min' | 'duration';

export interface SearchParams {
  cityDeparture: City;
  cityArrival: City;
  dateOutbound: string | null;
  dateReturn: string | null;
  filters: Filters;
  limit: number;
  sort: string;
  offset: number;
}

export interface Filters {
  have_first_class?: boolean;
  have_second_class?: boolean;
  have_third_class?: boolean;
  have_fourth_class?: boolean;
  have_wifi?: boolean;
  is_express?: boolean;
  have_air_conditioning?: boolean;
  price_from?: number;
  price_to?: number;
  start_departure_hour_from?: number;
  start_departure_hour_to?: number;
  start_arrival_hour_from?: number;
  start_arrival_hour_to?: number;
  end_departure_hour_from?: number;
  end_departure_hour_to?: number;
  end_arrival_hour_from?: number;
  end_arrival_hour_to?: number;
}

export interface SeatsQuery {
  id: number;
  have_first_class?: boolean;
  have_second_class?: boolean;
  have_third_class?: boolean;
  have_fourth_class?: boolean;
  have_wifi?: boolean;
  have_air_conditioning?: boolean;
  have_express?: boolean;
}

export interface SeatAvailability {
  index: number;
  available: boolean;
}

export interface SeatsResponse {
  _id: number;
  name: string;
  class_type: string;
  have_first_class: boolean;
  have_second_class: boolean;
  have_third_class: boolean;
  have_fourth_class: boolean;
  have_wifi: boolean;
  have_air_conditioning: boolean;
  have_express: boolean;
  price?: number; // Цена за место (Люкс)
  top_price?: number; // Цена верхнего места
  bottom_price?: number; // Цена нижнего места
  side_price?: number; // Цена бокового места
  linens_price?: number; // Цена постельного белья
  wifi_price?: number; // Цена услуги Wi-Fi
  avaliable_seats?: number; // Количество свободных мест в вагоне
  is_linens_included?: number; // Стоимость белья включена в стоимость билета и не может быть исключена (true/false)
  seats: SeatAvailability[];
}

export interface SeatsState extends Status {
  data: SeatsResponse;
}

export interface Seat {
  index: number;
  available: boolean;
}

export interface Coach {
  coach: {
    _id: number;
    name: string;
    class_type: string;
    have_wifi: boolean;
    have_air_conditioning: boolean;
    price?: number;
    top_price?: number;
    bottom_price?: number;
    side_price?: number;
    linens_price: number;
    wifi_price: number;
    is_linens_included: boolean;
    available_seats: number;
    train: number;
  };
  seats: Seat[];
}

export interface TrainSeatsData extends Status {
  items: Coach[];
}

export interface Service {
  isSelected: boolean;
  price: number;
}

export interface SelectedSeat {
  route_direction_id: string;
  price: string;
  coach_id: string;
  seat_number: string;
  is_child: boolean;
  include_children_seat: boolean;
}

export interface PersonInfo {
  is_adult: boolean;
  first_name: string;
  last_name: string;
  patronymic: string;
  gender: boolean;
  birthday: string;
  document_type: 'паспорт' | 'свидетельство о рождениии';
  document_data: string;
}

export interface OrderSeat {
  price: string;
  coach_id: string;
  seat_number: string;
  person_info?: PersonInfo;
  is_child?: boolean;
  include_children_seat?: boolean;
}

export interface Order {
  user?: {
    first_name: string;
    last_name: string;
    patronymic: string;
    phone: string;
    email: string;
    payment_method: 'cash' | 'online';
  };
  departure: {
    route_direction_id: string;
    seats: OrderSeat[];
  };
}

export interface Orders {
  items: Order[] | [];
}
