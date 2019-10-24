import React, {useState, useContext} from 'react';
import {AppContext, Store} from './store';

const AddFast: React.SFC = () => {
  const {addFast} = useContext(AppContext);
  const [start, setStart] = useState(new Date());
  const [length, setLength] = useState(16);

  return (
    <>
      <button onClick={() => addFast(Date.now().toString(), start, length * 3600000)}>Add new fast</button>
      <label>
        Fast begins at:
        <input type='datetime-local' value={start.toISOString().slice(0, -1)} onChange={e => setStart(new Date(e.target.value))} />
      </label>
      <label>
        Fast length (hours):
        <input type='number' min='0' value={length} onChange={e => setLength(+e.target.value)} />
      </label>
    </>
  )
}

const CurrentFast: React.SFC = () => {
  const {state} = useContext(AppContext);

  if (!state.currentFast) {
    return (
      <div>
        <h2>Not fasting currently</h2>
      </div>
    );
  }

  return (
    <div>
      <h2>Current fast</h2>
      Started at {state.fasts[state.currentFast].start.toISOString()}, lasts {state.fasts[state.currentFast].length / 3600000} hours.
    </div>
  );
}

const FastList: React.SFC = () => {
  const {state} = useContext(AppContext);
  return (
    <ul>
      {
        Object.values(state.fasts).map((fast: any) => (
          <li key={fast.id}>{fast.id}: from {fast.start.toISOString()}, {fast.length / 3600000} hours</li>
        ))
      }
    </ul>
  );
}

export default () => {
  return (
    <Store>
      <h1>Hello world!</h1>
      <AddFast />
      <CurrentFast />
      <FastList />
    </Store>
  );
};
