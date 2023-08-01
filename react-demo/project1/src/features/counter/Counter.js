import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from './conterSlice'

export default function Counter() {
    const count = useSelector(state => state.counter.value)
    const dispatch = useDispatch()
    const [incrementAmount, setIncrementAmount] = useState(2)

    const incrementValue = incrementAmount || 0
    return (
        <>
            <div>
                <button onClick={() => dispatch(decrement())}>-</button>
                <span>{count}</span>
                <button onClick={() => dispatch(increment())}>+</button>
            </div>
            <div>
                <input value={incrementValue} onChange={e => setIncrementAmount(e.target.value)}></input>
                <span>add amount</span>
                <span>add Async</span>
            </div>
        </>
    )
}
