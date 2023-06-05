import { useState } from 'react'

export default function Test4() {
  const [pending, setPending] = useState(0)
  const [completed, setCompleted] = useState(0)

  async function handleClick() {
    setPending(pending + 1)
    await delay(3000)
    setPending(p => p - 1)
    setCompleted(c => c + 1)
  }

  return (
    <>
      <h3>等待：{pending}</h3>
      <h3>完成：{completed}</h3>
      <button onClick={handleClick}>购买</button>
    </>
  )
}

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}
