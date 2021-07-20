import { useContext } from 'react';
import { GlobalStateContext } from '../../providers/contexts/GlobalState.context';

export function useGlobal() {
  const { globalState, globalDispatch } = useContext(GlobalStateContext);
  return { globalState, globalDispatch };
}
