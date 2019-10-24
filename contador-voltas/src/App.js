import React, { useState, useEffect } from 'react';

import './styles.css'

import MostraVoltas from './MostraVoltas'
import MostraTempo from './MostraTempo'
import Button from './Button'

function App() {
  const [numVoltas, setNumVoltas] = useState(0)
  const [running, setRunning] = useState(false)
  const [tempo, setTempo] = useState(0)

  const toggleRunning = () => {
    setRunning(!running)
  }

  const reset = () => {
    setTempo(0)
    setNumVoltas(0)
  }

  const increment = () => {
    setNumVoltas(numVoltas + 1)
  }

  const decrement = () => {
    if(numVoltas > 0){
      setNumVoltas(numVoltas - 1)
    }
  }

  useEffect(() => {
    let timer = null
    if(running) {
      timer = setInterval(() => {
        setTempo(old => old + 1)
      }, 1000)
    }

    return () => {
      if(timer) {
        clearInterval(timer)
      }
    }
  }, [running])

  return (
    <div className='App'>
      <MostraVoltas voltas={numVoltas} />
      <Button text='+' className='bigger' onClick={increment} />
      <Button text='-' className='bigger' onClick={decrement} />
      {
        numVoltas > 0 &&
        <MostraTempo tempo={Math.round(tempo / numVoltas)} />
      }
      <Button text={running ? 'Pause' : 'Iniciar'} onClick={toggleRunning} />
      <Button text='Reiniciar' onClick={reset} />
    </div>
  );
}

export default App;
