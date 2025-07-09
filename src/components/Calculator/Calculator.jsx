import React, { useReducer, useMemo } from 'react';

const initialState = {
  firstNumber: null,
  secondNumber: '',
  operation: null,
  result: null,
  history: []
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIRST_NUMBER':
      return {
        ...state,
        firstNumber: action.payload,
        secondNumber: '',
        result: null
      };
    case 'SET_SECOND_NUMBER':
      return { ...state, secondNumber: action.payload };
    case 'SET_OPERATION':
      return { ...state, operation: action.payload };
    case 'CALCULATE':
      if (
        state.firstNumber === null ||
        state.operation === null ||
        state.secondNumber === ''
      ) {
        return state; // no calcular si falta algo
      }
      const a = state.firstNumber;
      const b = Number(state.secondNumber);
      let res;
      switch (state.operation) {
        case '+':
          res = a + b;
          break;
        case '-':
          res = a - b;
          break;
        case '*':
          res = a * b;
          break;
        case '/':
          res = b !== 0 ? a / b : 'Error';
          break;
        default:
          res = 'Error';
      }
      return {
        ...state,
        result: res,
        history:
          res !== 'Error'
            ? [...state.history, res].sort((x, y) => x - y)
            : state.history,
        firstNumber: null,
        secondNumber: '',
        operation: null
      };
    case 'CLEAR':
      return initialState;
    default:
      return state;
  }
}

const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const memoResult = useMemo(() => {
    if (
      state.firstNumber === null ||
      state.operation === null ||
      state.secondNumber === ''
    ) {
      return null;
    }
    const a = state.firstNumber;
    const b = Number(state.secondNumber);
    switch (state.operation) {
      case '+':
        return a + b;
      case '-':
        return a - b;
      case '*':
        return a * b;
      case '/':
        return b !== 0 ? a / b : 'Error';
      default:
        return 'Error';
    }
  }, [state.firstNumber, state.secondNumber, state.operation]);

  return (
    <div
      className='calculator'
      style={{ maxWidth: 300, margin: 'auto', textAlign: 'center' }}
    >
      <input
        type='number'
        placeholder={
          state.firstNumber === null
            ? 'Ingresa primer número'
            : 'Ingresa segundo número'
        }
        value={state.secondNumber}
        onChange={(e) =>
          dispatch({ type: 'SET_SECOND_NUMBER', payload: e.target.value })
        }
        disabled={state.firstNumber === null ? false : false}
        style={{ width: '100%', padding: 10, marginBottom: 10, fontSize: 18 }}
      />

      {state.firstNumber === null ? (
        <div className='buttons' style={{ marginBottom: 10 }}>
          <button
            onClick={() =>
              dispatch({
                type: 'SET_FIRST_NUMBER',
                payload: Number(state.secondNumber)
              })
            }
            disabled={state.secondNumber === ''}
          >
            Guardar número
          </button>
        </div>
      ) : (
        <div
          className='buttons'
          style={{
            display: 'flex',
            justifyContent: 'space-around',
            marginBottom: 10
          }}
        >
          {['+', '-', '*', '/'].map((op) => (
            <button
              key={op}
              onClick={() => dispatch({ type: 'SET_OPERATION', payload: op })}
            >
              {op}
            </button>
          ))}
          <button onClick={() => dispatch({ type: 'CALCULATE' })}>=</button>
        </div>
      )}

      {memoResult !== null && (
        <div>
          <strong>Resultado (en vivo):</strong> {memoResult}
        </div>
      )}

      {state.result !== null && (
        <div style={{ marginTop: 15 }}>
          <strong>Último resultado:</strong> {state.result}
        </div>
      )}

      {state.history.length > 0 && (
        <div style={{ marginTop: 15, textAlign: 'left' }}>
          <strong>Historial ordenado:</strong>
          <ul>
            {state.history.map((res, i) => (
              <li key={i}>{res}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => dispatch({ type: 'CLEAR' })}
        style={{
          marginTop: 20,
          backgroundColor: '#f44336',
          color: 'white',
          border: 'none',
          padding: '10px',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        Reiniciar
      </button>
    </div>
  );
};

export default Calculator;
