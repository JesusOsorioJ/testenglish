import { useEffect, useState } from 'react'

export default function realtable() {
    const [ data, setData ] = useState()

    useEffect(()=>{
        const  response = fetch ("api/data")
        .then(response => response.json())
        .then(data=>setData(data))

    }
    ,[])
  return (
    <div>realtable</div>
  )
}
