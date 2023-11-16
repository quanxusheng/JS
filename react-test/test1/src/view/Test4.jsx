import { useEffect } from 'react'
export default function Test4(props) {
    console.log('=>Test4渲染了')
    const num2 = props.num + 1000
    useEffect(() => {
        console.log('=>2222', props.num)
        console.log('=>2222-num2', num2)
    })
    return (
        <div>
            Test4
            <span>{num2}</span>
        </div>
    )
}
