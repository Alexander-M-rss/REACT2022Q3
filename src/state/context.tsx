import React, { useReducer, createContext } from 'react';
import reducer, { IAction, IGlobalState, initialGlobalState } from './reducer';

interface IGlobalStateContext {
  globalState: IGlobalState;
  dispatch: React.Dispatch<IAction>;
}

const GlobalStateContext = createContext<IGlobalStateContext>({
  globalState: initialGlobalState,
  dispatch: () => null,
});

export function GlobalStatePovider({ children }: { children: React.ReactNode }) {
  const [globalState, dispatch] = useReducer(reducer, initialGlobalState);

  return (
    <GlobalStateContext.Provider value={{ globalState, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
}

export default GlobalStateContext;
