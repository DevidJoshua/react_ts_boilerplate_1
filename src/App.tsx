import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import ContextProvider from '@context/index';
import Routes from './routes';
import './styles';

function App() {
  const history = createBrowserHistory();

  return (
    <ContextProvider>
      <Router history={history}>
        <Routes />
      </Router>
    </ContextProvider>
  );
}

export default App;
