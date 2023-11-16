import { useEffect, useState } from 'react'
import Test4 from './Test4'
export default function Test3() {
    let [num, setNum] = useState(1)
    // setTimeout(() => {
    //     setNum(100)
    // }, 2000)

    const changeNum = () => {
        num = 1000
        console.log('=>changeNum', num)
    }

    useEffect(() => {
        console.log('=>1111', num)
        const timer = setInterval(() => {
            console.log('=>setInterval', num)
        }, 2000)
        return () => {
            clearInterval(timer)
        }
    })
    return (
        <div>
            <button onClick={changeNum}>Test3</button>
            <p>{num}</p>
            <Test4 num={num} />
        </div>
    )
}
