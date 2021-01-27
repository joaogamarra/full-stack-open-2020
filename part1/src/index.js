import React from 'react'
import ReactDOM from 'react-dom'

import Header from "./components/Header";
import Content from "./components/Content";
import Total from "./components/Total";

const App = () => {
  const course = 'Half Stack application development';
  const parts = ['Fundamentals of React', 'Using props to pass data', 'State of a component'];
  const exercises = [10, 7, 14];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} exercises={exercises} />
      <Total exercises={exercises} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))