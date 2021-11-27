/* eslint-disable camelcase */
export type serviceList = 'express' | 'wifi' | 'platz' | 'cup' | 'coupe' | 'seat' | 'lux';
export type Services = Array<serviceList>;
export type PointX = { city: string; station: string };
export type LastTicketData = {
  id: number;
  pointA: PointX;
  pointB: PointX;
  price: number;
  services: Services;
};

export type Train = {
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
    price_info: {
      first?: PriceSpectre;
      second?: PriceSpectre;
      third?: PriceSpectre;
      fourth?: PriceSpectre;
    };
  };
};

export type PriceSpectre = {
  price?: number;
  top_price?: number;
  bottom_price?: number;
  side_price?: number;
};

export type SeatsSpectre = {
  first?: number;
  second?: number;
  third?: number;
  fourth?: number;
};