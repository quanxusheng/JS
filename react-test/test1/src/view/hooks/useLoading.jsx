import { useState } from "react"

export default function useLoading() {
  const [loading, setLoading] = useState(false)
  const executeServer = async (promiseFn) => {
    setLoading(true)
    const res = await promiseFn()
    if (!res) {
      alert('出错啦')
    }
    setLoading(false)
  }
  return {
    loading, executeServer
  }
}