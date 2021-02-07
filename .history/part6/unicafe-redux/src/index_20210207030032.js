import React, { useState } from 'react'
import ReactDOM from 'react-dom'

import Button from "./components/Button";
import Statistics from "./components/Statistics";


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all =  good + bad + neutral
  
  const average = () => {
    const calc = ((good * 1) + (bad * -1)) / all

    return calc.toFixed(2);
  }

  const positive = () => {
    const calc = (all - bad - neutral) * 100 / all

    return calc.toFixed(2);
  }

  const statistics = {
    title: 'statistics',
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    average: average(),
    positive: positive()
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />
      <Statistics statistics={statistics} />
    </div>
  )
}


ReactDOM.render(<App />, 
  document.getElementById('root')
)