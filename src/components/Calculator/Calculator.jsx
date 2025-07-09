import { useRef, useReducer } from 'react';
import './Calculator.css';

const forceUpdateReducer = (x) => x + 1;

const Calculator = () => {
  const inputRef = useRef(null);
  const firstNumberRef = useRef(null);
  const operationRef = useRef(null);
  const lastResultRef = useRef(null);
  const historyRef = useRef([]);
  const [, forceUpdate] = useReducer(forceUpdateReducer, 0); // para forzar render

  const chooseOperation = (op) => {
    const val = Number(inputRef.current.value);
    if (isNaN(val)) return;

    firstNumberRef.current = val;
    operationRef.current = op;
    inputRef.current.value = '';
  };

  const calculate = () => {
    const secondVal = Number(inputRef.current.value);
    const firstVal = firstNumberRef.current;
    const op = operationRef.current;

    if (isNaN(secondVal) || firstVal === null || !op) return;

    let result;
    switch (op) {
      case '+':
        result = firstVal + secondVal;
        break;
      case '-':
        result = firstVal - secondVal;
        break;
      case '*':
        result = firstVal * secondVal;
        break;
      case '/':
        result = secondVal !== 0 ? firstVal / secondVal : 'Error';
        break;
      default:
        result = 'Error';
    }

    if (result !== 'Error') {
      historyRef.current.push(result);
      historyRef.current.sort((a, b) => a - b);
    }

    lastResultRef.current = result;
    inputRef.current.value = '';
    firstNumberRef.current = null;
    operationRef.current = null;

    forceUpdate(); // fuerza el render para ver los cambios
  };

  return (
    <div className='calculator'>
      <input type='number' ref={inputRef} placeholder='Ingresa un número' />

      <div className='buttons'>
        <button onClick={() => chooseOperation('+')}>+</button>
        <button onClick={() => chooseOperation('-')}>-</button>
        <button onClick={() => chooseOperation('*')}>*</button>
        <button onClick={() => chooseOperation('/')}>/</button>
        <button onClick={calculate}>=</button>
      </div>

      {lastResultRef.current !== null && (
        <div className='result'>
          <strong>Último resultado:</strong> {lastResultRef.current}
        </div>
      )}

      {historyRef.current.length > 0 && (
        <div className='history'>
          <strong>Historial ordenado:</strong>
          <ul>
            {historyRef.current.map((res, i) => (
              <li key={i}>{res}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Calculator;
