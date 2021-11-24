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
