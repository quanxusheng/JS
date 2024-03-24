import React, { useState, useMemo, useEffect, useLayoutEffect } from 'react'

// 父组件
const Example = () => {
    const [time, setTime] = useState<number>(0)
    const [random, setRandom] = useState<number>(0)

    let time2 = null
    useLayoutEffect(() => {
        time2 = time + Math.random()
        console.log('=>time2', time2)
    }, [time])


    // useMemo(() => {
    //     console.log('=time>', time)
    //     console.log('=>', 'excuted')
    //     time2 = random + Math.random()
    // }, [random])
    return (
        <div>
            <button onClick={() => setTime(new Date().getTime())}>获取当前时间</button>
            <button onClick={() => setRandom(Math.random())}>获取当前随机数</button>
            <p>time2: {time2}</p>
            <Show time={time}>{random}</Show>
        </div>
    )
}

type Data = {
    time: number
}

// 子组件
const Show: React.FC<Data> = ({ time, children }) => {

    const newTime = useMemo(() => {
        console.log('changeTime excuted...')
        return new Date(time).toISOString()
    }, [time])

    // let newTime = null
    // useEffect(() => {
    //     console.log('changeTime excuted...')
    //     newTime = new Date(time).toISOString()
    //     console.log('=newTime>', newTime)
    // }, [time])

    return (
        <div>
            <p>Time is: {newTime}</p>
            <p>time: {time}</p>
            <p>newTime: {newTime}</p>
            <p>Random is: {children}</p>
        </div>
    )
}

export default Example
