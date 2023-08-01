// import Count from './components/Count'
// import UseMyState from './components/UseMyState'

import useMyState from './components/useMyState.js'
import { useState } from 'react'

function ComA() {
    const [counter, setCount] = useMyState(0)
    const handleSetCount = () => {
        setCount(counter => counter + 1)
    }
    return <button onClick={handleSetCount}>{counter}</button>
}
function ComB() {
    const [message, setMessage] = useMyState('hello')
    const handleSetMessage = () => {
        const n = Math.random()
        setMessage('world' + n)
    }
    return <button onClick={handleSetMessage}>{message}</button>
}

function App() {
    return (
        <div className="App">
            {/* <Count /> */}
            <ComA />
            <ComB />
        </div>
    )
}

export default App
