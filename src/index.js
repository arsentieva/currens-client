import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import AppWithContext from './AppWithContext';

ReactDOM.render((
  // TODO check if BrowserRouter component is necessary
  <BrowserRouter>
    <AppWithContext />
  </BrowserRouter>
), document.getElementById('root'));

// TODO is serviceWorker needed?
serviceWorker.unregister();
