import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import { ApolloProvider } from '@apollo/client';
import { client } from './api/client';
import { Providers } from './providers/Providers';
import '@fortawesome/fontawesome-free/css/all.css';

import { App } from './pages/App';
import { Loading } from './components/common/Loading';
import ErrorBoundary from './components/common/ErrorBoundary';

ReactDOM.render(
  <React.StrictMode>
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <BrowserRouter>
          <ToastProvider placement='top-center' autoDismiss={true}>
            <ApolloProvider client={client}>
              <Providers>
                <App />
              </Providers>
            </ApolloProvider>
          </ToastProvider>
        </BrowserRouter>
      </Suspense>
    </ErrorBoundary>
  </React.StrictMode>,
  document.getElementById('root')
);
