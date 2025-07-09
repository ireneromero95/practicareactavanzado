import './App.css';
import Calculator from './components/Calculator/Calculator';

import Timer from './components/Timer/Timer';
import useCurrentTime from './customHooks/useCurrentTime';

const App = () => {
  const currentDate = useCurrentTime();

  return (
    <div>
      <h1 className='app-title'>Temporizador</h1>
      <Timer date={currentDate} />
      <Calculator />
    </div>
  );
};

export default App;
