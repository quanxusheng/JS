import useSelfState from './hooks/useSelfState'

export default function Counter() {
    let [count, setCount] = useSelfState(0)
    let [words, setWords] = useSelfState('hello')
    const increment = () => {
        setCount(count + 1)
        // setCount(prev => prev + 1)
    }
    const decrement = () => {
        setCount(prev => prev - 1)
    }

    const changeCount = () => {
        setWords(Math.random())
    }
    return (
        <div>
            <span>count: {count}</span>
            <button onClick={increment}>increment</button>
            <button onClick={decrement}>decrement</button>
            <div></div>
            <span>words: {words}</span>
            <button onClick={changeCount}>change</button>
        </div>
    )
}
