import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'ureng-ui';

import 'styles/main.scss';
import { App } from 'modules';
import { ErrorBoundry } from 'components';
import store from 'store';

ReactDOM.render(
  <Provider store={store}>
    <ErrorBoundry>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ErrorBoundry>
  </Provider>,
  document.getElementById('root')
);
