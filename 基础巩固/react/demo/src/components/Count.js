import { useState, useEffect, useReducer } from 'react'
const initialState = {
    step: 1,
    count: 0,
}
function reducer(state, action) {
    // setInterval(() => {
    //     state.count = state.count + 1 + state.step
    // }, 2000)
    console.log('=>11', state)
    console.log('=>222', action)
    if (action.type === 'tick') {
        return {
            count: state.count + state.step,
            step: state.step,
        }
    } else if (action.type === 'step') {
        return {
            ...state,
            step: action.payload,
        }
    }
}

export default function Counter() {
    // const [count, setCount] = useState(0)
    // const [step, setStep] = useState(1)
    const [state, dispatch] = useReducer(reducer, initialState)

    console.log('=>state', state)
    console.log('=>', '渲染了')
    useEffect(() => {
        console.log('=>', 'effect执行了')
        // let timer = setInterval(() => {
        //     dispatch({
        //         type: 'tick',
        //     })
        // }, 1000)
        // return () => {
        //     clearInterval(timer)
        // }
    }, [])

    return (
        <>
            <h1>{state.count}</h1>
            <input
                value={state.step}
                onChange={e =>
                    dispatch({
                        type: 'step',
                        payload: Number(e.target.value),
                    })
                }
            />
        </>
    )
}
