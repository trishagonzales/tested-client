import React, { useReducer } from 'react';
import { globalStateReducer } from '../reducers/globalState.reducer';
import { GlobalStateContext, initialGlobalState } from './contexts/GlobalState.context';

export interface GlobalStateProviderProps {}

export const GlobalStateProvider: React.FC<GlobalStateProviderProps> = ({ children }) => {
  const [globalState, globalDispatch] = useReducer(globalStateReducer, initialGlobalState);

  return (
    <GlobalStateContext.Provider value={{ globalState, globalDispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
