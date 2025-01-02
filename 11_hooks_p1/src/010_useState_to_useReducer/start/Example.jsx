import { useState, useReducer } from 'react';
const State = () => {
  const [state, setState] = useState(0);
  const decrement = () => {
    setState((prev) => prev - 1);
  };
  return (
    <>
      <h2>State（単独の値ver）</h2>
      <h3>{state}</h3>
      <button
        onClick={() => {
          setState((prev) => prev + 1);
        }}
      >
        +
      </button>
      <button onClick={decrement}>-</button>
    </>
  );
};
const State2 = () => {
  const obj = {
    inc: '加算',
    dec: '減算',
    val: 0,
  };
  const [state, setState] = useState(obj);
  const inc = () => {
    setState((prev) => {
      return { ...prev, val: prev.val + 1 };
    });
  };
  const dec = () => {
    setState((prev) => {
      return { ...prev, val: prev.val - 1 };
    });
  };
  return (
    <>
      <h2>State（オブジェクトver）</h2>
      <h3>{state.val}</h3>
      <button onClick={inc}>{state.inc}</button>
      <button onClick={dec}>{state.dec}</button>
    </>
  );
};
const State3 = () => {
  const array = [
    {
      name: '加算',
      val: 0,
    },
    {
      name: '減算',
      val: 0,
    },
  ];
  const [state, setState] = useState(array);
  const calc = (e) => {
    switch (e.target.name) {
      case '加算': {
        const newArray = state.map((item) => {
          return { ...item, val: item.name === '加算' ? item.val + 1 : item.val };
        });
        setState(newArray);
        break;
      }
      case '減算': {
        const newArray = state.map((item) => {
          return { ...item, val: item.name === '減算' ? item.val - 1 : item.val };
        });
        setState(newArray);
        break;
      }
    }
  };
  return (
    <>
      <h2>State（配列ver）</h2>
      <h3>{state.reduce((a, b) => a + b.val, 0)}</h3>
      {state.map((item) => {
        return (
          <button
            key={item.name}
            name={item.name}
            onClick={(data) => {
              calc(data);
            }}
          >
            {item.name}
          </button>
        );
      })}
    </>
  );
};
const Reducer = () => {
  const [rstate, setRState] = useReducer((prev, action) => {
    return prev + action;
  }, 0);
  const inc = () => {
    setRState(1);
  };
  const dec = () => {
    setRState(-1);
  };
  return (
    <>
      <h2>Reducer（単独の値Ver）</h2>
      <h3>{rstate}</h3>
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </>
  );
};
const Reducer2 = () => {
  const obj = {
    a: 1,
    b: -1,
    val: 0,
  };
  const [rState, setRState] = useReducer((prev, action) => {
    return { ...obj, val: prev.val + action };
  }, obj);
  const inc = () => {
    setRState(rState.a);
  };
  const dec = () => {
    setRState(rState.b);
  };
  return (
    <>
      <h2>Reducer（オブジェトVer）</h2>
      <h3>{rState.val}</h3>
      <button onClick={inc}>+</button>
      <button onClick={dec}>-</button>
    </>
  );
};
const Reducer3 = () => {
  const ACTIONS = {
    ADD: '+',
    SUBTRACT: '-',
  };

  const array = [
    {
      name: ACTIONS.ADD,
      val: 0,
    },
    {
      name: ACTIONS.SUBTRACT,
      val: 0,
    },
  ];
  const [rState, dispatch] = useReducer((prev, { type }) => {
    switch (type) {
      case ACTIONS.ADD: {
        return prev.map((item) => {
          return item.name === type ? { ...item, val: item.val + 1 } : item;
        });
      }
      case ACTIONS.SUBTRACT: {
        return prev.map((item) => {
          return item.name === type ? { ...item, val: item.val - 1 } : item;
        });
      }
      default:
        return prev;
    }
  }, array);
  const inputVal = (e) => {
    dispatch({ type: e.target.name });
  };
  return (
    <>
      <h2>Reducer（配列Ver）</h2>
      <h3>
        {rState.reduce((a, b) => {
          return a + b.val;
        }, 0)}
      </h3>
      {rState.map((item) => {
        return (
          <button key={item.name} name={item.name} onClick={inputVal}>
            {item.name}
          </button>
        );
      })}
    </>
  );
};
const Example = () => {
  return (
    <>
      <Reducer />
      <hr></hr>
      <Reducer2 />
      <hr></hr>
      <Reducer3 />
      <hr></hr>
      <hr></hr>
      <State />
      <hr></hr>
      <State2 />
      <hr></hr>
      <State3 />
    </>
  );
};

export default Example;
