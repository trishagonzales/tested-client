import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Providers } from './providers/Providers';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './pages/App';
import { Loading } from './components/common/Loading';
import ErrorBoundary from './components/common/ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <ErrorBoundary>
        <Providers>
          <Suspense fallback={<Loading />}>
            <App />
          </Suspense>
        </Providers>
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
