import React, {useState, createContext} from 'react';

interface AppState {
  fasts: {
    [id: string]: Fast;
  };
  currentFast: string | null
}

interface Fast {
  id: string;
  start: Date;
  length: number;
}

const initialState: AppState = {
  fasts: {},
  currentFast: null,
};

interface API {
  state: AppState;
  setState: React.Dispatch<React.SetStateAction<AppState>>;
  addFast: (id: string, start: Date, length: number) => void;
}

export const AppContext = createContext<API>(undefined as any);

export const Store: React.SFC = (props) => {
  const [state, setState] = useState<AppState>(initialState);

  function addFast(id: string, start: Date, length: number) {
    const currentFast = start.getTime() < Date.now() && start.getTime() + length > Date.now() ? id : state.currentFast;
    setState((state) => ({
      ...state,
      currentFast,
      fasts: {
        ...state.fasts,
        [id]: {
          id,
          start,
          length,
        }
      },
    }));
  }

  return (
    <AppContext.Provider value={{state, setState, addFast}}>
      {props.children}
    </AppContext.Provider>
  )
}
