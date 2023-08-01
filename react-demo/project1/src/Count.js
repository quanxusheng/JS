import { useState } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0)
    console.log('=>', count)
    return (
        <button
            onClick={() => {
                // setCount(count => count + 1)
                // setCount(count => count + 1)
                // setCount(count => count + 1)
                setCount(count + 5)
                setCount(42)
                setCount(n => n + 1)

                alert(count)
            }}>
            {count}
        </button>
    )
}
