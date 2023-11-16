import React, { Component, useState } from 'react'

export default function Test1() {
    requestIdleCallback((t) => {
        console.log('=>ttt', t)
        console.log('=>timeRemaining', t.timeRemaining())
    })

    return <ul>
        {/* {Array(7000).fill(0).map((_, i) => <li key={i}>{i}</li>)} */}
    </ul>
}



// function Sub() {
//     console.log('=>', 'sub')
//     return (
//         <div>sub</div>
//     )
// }

// export default function Test1() {
//     console.log('=>', 'test1')
//     const [count, setCount] = useState(0)
//     const changeCount = () => {
//         console.log('=>', '点击了')
//         setCount(10)
//     }
//     return (
//         <ul>
//             {/* {Array(3000).fill(0).map((_, i) => <li>{i}</li>)} */}
//             <div onClick={changeCount}>Test1{count}</div>
//             <Sub />
//         </ul>
//     )
//     // return React.createElement('h1', null, [111, React.createElement('p', null, 'child')])
// }




// class Sub extends Component {

//     render() {
//         console.log('=>sub', 'sub')
//         return (
//             <div>sub</div>
//         )
//     }
// }
// export default class Text1 extends Component {
//     state = { count: 0 }
//     changeCount = () => {
//         console.log('=>', '点击了')
//         this.setState({
//             count: 10
//         })
//     }
//     render() {
//         console.log('=>sub', 'Text1')

//         return (
//             <div onClick={this.changeCount}>Class-text{this.state.count}
//                 <Sub />
//             </div>
//         )
//     }
// }
