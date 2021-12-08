import { Train } from '../global';

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
  // eslint-disable-next-line camelcase
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
