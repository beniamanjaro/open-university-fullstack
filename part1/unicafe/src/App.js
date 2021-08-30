import React, { useState } from 'react'

const Header = ({text}) => {
  return(
    <h1>{text}</h1>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick} >
      {text}
    </button>
  )
}

const Stats = ({text, value}) => {
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, bad, neutral, all}) => {
  if (all === 0){
    return (
      <p>No feedback given</p>
    )
  }
  return(
    <table>
      <tbody>
        <Stats text="good" value={good} />
        <Stats text="neutral" value={neutral} />
        <Stats text="bad" value={bad} />
        <Stats text="all" value={good + neutral + bad} />
        <Stats text="average" value={(good - bad)/all} />
        <Stats text="positive" value={good/all} />
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodFeedback = () => {
    setGood(good + 1)
  }

  const handleNeutralFeedback = () => {
    setNeutral(neutral + 1)
  }

  const handleBadFeedback = () => {
    setBad(bad + 1)
  }
  
  let all = good + neutral + bad

  return (
    <div>
      <Header text={"give feedback"} />
      <Button handleClick={handleGoodFeedback} text="good" />
      <Button handleClick={handleNeutralFeedback} text="neutral" />
      <Button handleClick={handleBadFeedback} text="bad" />
      <Header text="statistics" />
      <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </div>
  )
}

export default App