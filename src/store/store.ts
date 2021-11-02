import { configureStore } from '@reduxjs/toolkit';
import { experience } from 'src/store/experience';
import { token } from './token';
import { menu } from './menu';

export const store = configureStore({
  reducer: {
    menu,
    token,
    experience,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
