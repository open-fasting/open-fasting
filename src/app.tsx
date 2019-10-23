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

export const AppContext = createContext<AppState>(initialState);

export default () => {
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

  const [start, setStart] = useState(new Date());
  const [length, setLength] = useState(16);

  return (
    <AppContext.Provider value={state}>
      <h1>Hello world!</h1>
      <button onClick={() => addFast(Date.now().toString(), start, length * 3600000)}>Add new fast</button>
      <label>
        Fast begins at:
        <input type='datetime-local' value={start.toISOString().slice(0, -1)} onChange={e => setStart(new Date(e.target.value))} />
      </label>
      <label>
        Fast length (hours):
        <input type='number' min='0' value={length} onChange={e => setLength(+e.target.value)} />
      </label>
      {
        state.currentFast ? (
          <div>
            <h2>Current fast</h2>
            Started at {state.fasts[state.currentFast].start.toISOString()}, lasts {state.fasts[state.currentFast].length / 3600000} hours.
          </div>
        ) : (
          <div>
            <h2>Not fasting currently</h2>
          </div>
        )
      }
      <ul>
        {
          Object.values(state.fasts).map((fast: any) => (
            <li key={fast.id}>{fast.id}: from {fast.start.toISOString()}, {fast.length / 3600000} hours</li>
          ))
        }
      </ul>
    </AppContext.Provider>
  );
};
