import React, { useEffect } from 'react';
import { ToastProvider } from 'react-toast-notifications';
import { ApolloCustomProvider } from './ApolloCustom.provider';
import { GlobalStateProvider } from './GlobalState.provider';

export interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  return (
    <ToastProvider placement='top-center' autoDismiss={true}>
      <GlobalStateProvider>
        <ApolloCustomProvider>{children}</ApolloCustomProvider>
      </GlobalStateProvider>
    </ToastProvider>
  );
};
