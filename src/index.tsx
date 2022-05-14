// Core
import React from 'react';
import { Provider } from 'react-redux';
import { createRoot } from 'react-dom/client';

// Store
import { store } from './store';

// Components
import App from './App';

const rootContainer = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(rootContainer!);

root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
