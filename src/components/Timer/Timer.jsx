import './Timer.css';

const Timer = ({ date }) => {
  return (
    <div className='timer-container'>
      <h2>Hora actual:</h2>
      <p>{date.toLocaleTimeString()}</p>
    </div>
  );
};

export default Timer;
