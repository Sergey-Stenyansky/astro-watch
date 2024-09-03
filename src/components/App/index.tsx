import { useState, useCallback } from "react";
import "./styles.css";
import { increment, decrement, set } from "../../reducers/counter/counter";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store";
import { Link } from "react-router-dom";

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const count = useSelector<RootState, number>((state) => state.counter.value);
  const [newValue, setNewValue] = useState(count);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => setNewValue(+e.target.value),
    [],
  );

  return (
    <>
      <h1>Astro watch</h1>
      <Link to="/test">Test page link</Link>
      <div className="card">
        <button onClick={() => dispatch(decrement())}>-</button>
        Count is {count}
        <button onClick={() => dispatch(increment())}>+</button>
        <p />
        <input type="number" value={newValue} onChange={onChange} />
        <button
          onClick={() => {
            dispatch(set(newValue));
          }}
        >
          Set
        </button>
        <p>This is a basic app shell for Astro-watch</p>
      </div>
    </>
  );
}

export default App;
