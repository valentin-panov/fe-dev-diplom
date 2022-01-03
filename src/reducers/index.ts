// Reducers
import { menu } from './menu';
import { lastTickets } from './lastTickets';
import { token } from './token';
import { getRoute } from './getRoute';
import { limit } from './limit';
import { sort } from './sort';
import { searchParams } from './searchParams';
import { subscribe } from './subrcribe';

export const rootReducer = {
  menu,
  lastTickets,
  limit,
  sort,
  getRoute,
  searchParams,
  subscribe,
  token,
};
