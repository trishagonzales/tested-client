import { useContext } from 'react';
import { GlobalContext } from '../../providers/providers';

export function useGlobal() {
  const { globalState, globalDispatch } = useContext(GlobalContext);
  return { globalState, globalDispatch };
}
