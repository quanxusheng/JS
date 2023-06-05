import { list } from './data'
import { useState } from 'react'

export default function Test() {

    const [index, setIndex] = useState(0)

    function handleClick() {
      setIndex(index + 1)
    }

    console.log('index', index);
    let sculpture = list[index] || list[0]
    return (
      <div>
        <button onClick={handleClick}>Next</button>
        <h2>
          <i>{sculpture.name} </i>
          by {sculpture.artist}
        </h2>
        <h3>
          ({index + 1} of {list.length})
        </h3>
        <img src={sculpture.url} alt={sculpture.alt} />
        <p>{sculpture.description}</p>
      </div>
    )
}