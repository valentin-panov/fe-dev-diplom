// Reducers
import { menu } from './menu';
import { lastTickets } from './lastTickets';
import { token } from './token';
import { departure } from './departure';
import { arrival } from './arrival';
import { getRoute } from './getRoute';
import { dateForward } from './dateForward';
import { dateReturn } from './dateReturn';
import { limit } from './limit';
import { sort } from './sort';

export const rootReducer = {
  menu,
  lastTickets,
  departure,
  arrival,
  getRoute,
  dateForward,
  dateReturn,
  limit,
  sort,
  token,
};
