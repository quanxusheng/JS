import { useState, useEffect } from 'react'

export default function Count() {
    const [count, setCount] = useState(0)
    console.log('=>渲染开始', count)
    const handleBtn = e => {
        // setCount(count => count + 1)
        setCount(count + 10)
        setTimeout(() => {
            console.log('=>setCount', count)
        }, 3000)
    }
    useEffect(() => {
        console.log('=>useEffect', count)
    })
    return (
        <button data-index="99" onClick={handleBtn}>
            click {count}
        </button>
    )
}
