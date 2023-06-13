import { useState, useEffect, useCallback } from 'react'
import useLoading from './hooks/useLoading'

export default function GetData() {
    const [list, setList] = useState([])
    const {loading, executeServer} = useLoading()
    const getServerList = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(
            ['red', 'green', 'black']
          )
      }, 3000)
      })
    }
    const feachStudent = useCallback(
      async () => {
        executeServer(async ()=> {
          const data = await getServerList()
          setList(data)
          return data
        })
      }, [executeServer]
    )

    useEffect(() => {
      feachStudent()
    }, [])



    return (
        <div>
          {
            loading ? 'loading' : (
              list.map((item, index) => (
                <div key={index}>{ item }</div>
              ))
            )
          }
            
        </div>
    )
}
