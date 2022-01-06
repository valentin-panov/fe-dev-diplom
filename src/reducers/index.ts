// Reducers
import { menu } from './menu';
import { lastTickets } from './lastTickets';
import { token } from './token';
import { getRoute } from './getRoute';
import { searchParams } from './searchParams';
import { subscribe } from './subrcribe';
import { appState } from './appState';

export const rootReducer = {
  menu,
  lastTickets,
  getRoute,
  searchParams,
  subscribe,
  appState,
  token,
};
