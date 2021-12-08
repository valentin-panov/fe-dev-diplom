// Reducers
import { menu } from './menu';
import { lastTickets } from './lastTickets';
import { experience } from './experience';
import { token } from './token';
import { departure } from './departure';
import { arrival } from './arrival';
import { getRoute } from './getRoute';

export const rootReducer = {
  menu,
  lastTickets,
  departure,
  arrival,
  getRoute,
  experience,
  token,
};
