import { useState, useEffect, useReducer } from 'react'

export default function Counter() {
    const [count, setCount] = useState(0)
    // const [step, setStep] = useState(1)

    useEffect(() => {
        console.log('=>', 'effect执行了')
        let timer = setInterval(() => {
            setCount(c => c + 1)
        }, 1000)
        return () => {
            clearInterval(timer)
        }
    }, [])

    console.log('=>', '渲染了' + count)
    // useEffect(() => {
    //     // const id = setInterval(() => {
    //     //     setCount(c => c + step)
    //     // }, 1000)
    //     // return () => clearInterval(id)
    // }, [step])

    return (
        <>
            <h1>{count}</h1>
        </>
    )
}
