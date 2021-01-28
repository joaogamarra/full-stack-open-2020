import React, { useState } from 'react'

function App({anecdotes}) {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array.apply(null, new Array(6)).map(Number.prototype.valueOf,0));
  const [mostVotes, setMostVotes] = useState(0)
  
  const nextClick = () => {
    let randomInt;

    do {
      randomInt = Math.floor(Math.random() * 6);
    } while (randomInt === selected)

    setSelected(randomInt);
  }
  const voteClick = () => {
    const votesClone = [...votes];
    votesClone[selected] +=1;

    setVotes(votesClone);
    setMostVotes(votesClone.indexOf(Math.max(...votesClone)))
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteClick}>vote</button>
      <button onClick={nextClick}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <p>{anecdotes[mostVotes]}</p>
      <p>has {votes[mostVotes]} votes</p>
    </div>
  )
}

export default App;