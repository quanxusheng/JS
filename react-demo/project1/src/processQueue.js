export function getFinalState(baseState, queue) {
  let finalState = baseState

  console.log('=>finalState', finalState)
  console.log('=>queue', queue)
  // TODO: 对队列做些什么...

  if (!queue.length) return
  const last = queue[queue.length - 1]
  if (typeof last !== 'function') return last

  queue.forEach(sub => {
    if (typeof sub === 'function') {
        finalState = sub(finalState)
    } else {
         finalState = sub
    }
  })


  return finalState
}

// [n => n+1, n => n+1, n => n+1]

// [5, n => n+1]