// import Count from './components/Count'
// import UseMyState from './components/UseMyState'

import { useState, useEffect, memo } from 'react'
// 父组件
export default function Father() {
    const [count, forceUpdate] = useState(0)

    const daphnisli = { name: 'alex' }

    return (
        <div>
            <Child name={daphnisli.name} />
            <div onClick={() => forceUpdate(count + 1)}>Count {count}</div>
        </div>
    )
}
// 子组件

const Child = props => {
    console.log('=>Child', props)
    useEffect(() => {
        console.log('daphnisli', props.name)
    }, [props.name])

    return <div>{props.name}</div>
}
