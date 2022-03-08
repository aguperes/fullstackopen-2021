import { useState } from 'react';

const StatisticLine = ({ text, value }) => {
  return (
    <tbody>
      <tr>
        <td>{text}</td>
        <td>{value}</td>
      </tr>
    </tbody>
  );
};

const Statistics = ({ good, neutral, bad, total }) => {
  const average = () => {
    const result = (good - bad) / total;
    return isNaN(result) ? null : result;
  };

  const positive = () => {
    const result = (good * 100) / total;
    return isNaN(result) ? null : result + '%';
  };
  return (
    <>
      <table>
        <StatisticLine text='good' value={good}></StatisticLine>
        <StatisticLine text='neutral' value={neutral}></StatisticLine>
        <StatisticLine text='bad' value={bad}></StatisticLine>
        <StatisticLine text='all' value={total}></StatisticLine>
        <StatisticLine text='average' value={average()}></StatisticLine>
        <StatisticLine text='positive' value={positive()}></StatisticLine>
      </table>
    </>
  );
};

const Button = ({ onClick, text }) => {
  return <button onClick={onClick}>{text}</button>;
};

const App = () => {
  //State
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  //Handler functions
  const handleGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  };

  const handleNeutral = () => {
    setNeutral(neutral + 1);
    setTotal(total + 1);
  };

  const handleBad = () => {
    setBad(bad + 1);
    setTotal(total + 1);
  };

  return (
    <>
      <h2>give feedback</h2>
      <Button text='good' onClick={handleGood} />
      <Button text='neutral' onClick={handleNeutral} />
      <Button text='bad' onClick={handleBad} />
      <h2>statistics</h2>
      {total ? (
        <Statistics good={good} neutral={neutral} bad={bad} total={total} />
      ) : (
        'No feedback given'
      )}
    </>
  );
};

export default App;
