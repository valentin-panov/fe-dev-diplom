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
}

export interface Services {
  have_wifi: boolean;
  is_express: boolean;
  have_air_conditioning: boolean;
}

export interface PointX {
  city: string;
  station: string;
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

// LEGACY

export interface ICard {
  id: number;
  category: number;
  title: string;
  images: [string];
  sku: string;
  manufacturer: string;
  color: string;
  material: string;
  reason: string;
  season: string;
  heelSize: string;
  price: number;
  sizes: { size: string; avalible: boolean }[];
}

export interface IInitialStateTopSales extends Status {
  topSales: ICard[];
}

export interface IInitialStateCatalog extends Status {
  catalog: ICard[];
  haveMore: boolean;
  category: number;
}

export interface SearchState {
  searchString: string;
}

export interface Category {
  id: number;
  title: string;
}

export interface Categories extends Status {
  categories: Category[];
}

export interface ProductCard extends Status {
  item: ICard;
}

export interface Cart {
  items: { item: ICard; size: string; quantity: number }[];
}

export interface Order {
  owner: { phone: string; address: string };
  items: { id: number; price: number; count: number; size: string }[];
}

export interface IOrder extends Status {
  order: Order;
}
