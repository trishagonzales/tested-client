import React, { useReducer } from 'react';
import { globalReducer } from '../reducers/global.reducer';
import { initialGlobalState, GlobalProvider } from './providers';

export interface ProvidersProps {}

export const Providers: React.FC<ProvidersProps> = ({ children }) => {
  const [globalState, globalDispatch] = useReducer(globalReducer, initialGlobalState);

  console.log('global state: ', globalState);

  return <GlobalProvider value={{ globalState, globalDispatch }}>{children}</GlobalProvider>;
};
