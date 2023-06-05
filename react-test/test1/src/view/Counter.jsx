
import Sub from "./Sub"
import {useState} from 'react'
export default function Counter() {
    console.log('create');
    let [count, setCount] = useState(100)
    let show = false
    // let [show, setShow] = useState(false)
    // let count = 100
    return (
        <div onClick={()=> console.log(11111)} style={{width: '200px', height: '200px', background: 'red'}}>
            <div onClick={(e)=> {
                // setShow(!show)
                show = !show
                console.log('show', show);
                    // e.stopPropagation()
                    console.log(2222)
                    // e.stopPropagation()
                }}  style={{width: '100px', height: '100px', background: 'green'}}>
                <div onClick={(e)=> {
                    // e.stopPropagation()
                    console.log(3333)
                    // e.stopPropagation()
                    }} 
                style={{width: '50px', height: '50px', background: 'yellow'}}>
                    
                </div>
                {count}
                {/* <Sub onSelf={() => alert(1)}> */}
                <Sub onSelf={()=>{
                    // setShow(!show)
                    show = !show
                }}>
                    <div>{count}</div>
                </Sub> 
            </div>
            {show && <div style={{width: '200px', height: '200px', background: 'blue'}}>show-hide</div>}
        </div>
    )
}