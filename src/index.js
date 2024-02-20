import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom/';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from 'redux-persist';

const root = document.getElementById('root');

// Create a persistor for Redux Persist
const persistor = persistStore(store);

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <PersistGate  persistor={persistor}>
          <App />
        </PersistGate>
      </Router>
    </Provider>
  </React.StrictMode>
);
