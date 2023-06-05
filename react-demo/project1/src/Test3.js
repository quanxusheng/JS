import { useState } from 'react'

export default function Test3() {
  const [walk, setWalk] = useState(true)

  function handleClick() {
    // alert(walk ? 'stop' : 'walk')
    // for (let i = 0; i < arr.length; i++) {
    //   console.log('=>', i + 1)
    // }
    setWalk(!walk)
    // console.log('=>', walk ? 'stop' : 'walk')
    
  }
  let arr = []
  arr.length = 200000
//   console.log('=>', arr)
//   for(let i = 0; i < arr.length; i++) {
//     console.log('=>', i + 1)
//   }
  return (
    <>
      <button onClick={handleClick}>Change to {walk ? 'Stop' : 'Walk'}</button>
      <h1
        style={{
          color: walk ? 'darkgreen' : 'darkred',
        }}
      >
        {walk ? 'Walk' : 'Stop'}
      </h1>
    </>
  )
}
