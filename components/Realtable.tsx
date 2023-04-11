import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import  FormTest  from './FormTest'

export default function realtable() {
  const [data, setData] = useState([{ wordSpanish: "", wordEnglish: "", sentenceSpanish: "", sentenceEnglish: "" }])
  const [showForm, setShowForm] = useState()
  const [dataUser, setDataUser] = useState({})
  const router = useRouter()
  
  
  useEffect(() => {
    (async () => {
      const email = sessionStorage.getItem("userTestEnglish")
      const password = sessionStorage.getItem("passwordTestEnglish")

      if(Object.keys(router.query)[0]=="selectType"){
        await fetch("api/word", {
          method: 'POST',body: JSON.stringify(router.query)[0]
        }).then(response => response.json()).then(data => setData(data.message))
        
      }else{
        await fetch("api/word", {
          method: 'GET'
        }).then(response => response.json()).then(data => setData(data.message)) 
      }

      if(Object.keys(router.query)[0]=="selectGrade"){


      }
      
      const response = await fetch("api/user?type=login", {
        method: 'POST', body: JSON.stringify({email,password,...(router.query)[0]})
      })
        .then(response => response.json())
        setDataUser(JSON.parse(response.message[0].answer))
        
    })()
  }, [showForm])

  const handlerClick = (e)=>{
    sessionStorage.setItem("stepTestEnglish",e.target.value)
    setShowForm(e.target.value)
  }

  

  return (
    <div className='px-10 bg-gray-100'> 
      {showForm!=null?<FormTest showForm={showForm} setShowForm={setShowForm} data={data} dataUser={dataUser} />:<></>}
      < div className="text-xl py-2 grid grid-cols-6 gap-4 order- font-semibold border-gray-500 border-b-[1px]">
        <div className="mb-3">wordSpanish</div>
        <div className="mb-3" >wordEnglish</div>
        <div className="col-span-2" >sentenceSpanish</div>
        <div className="col-span-1" >Nota</div>
        <div className="col-span-1" >Evaluar</div>
      </div>
      {data.map((step, i: number) => (
        < div key={i} className="hover:text-gray-900 group  text-gray-500 py-2 grid grid-cols-6  gap-6 border-gray-300 border-b-[1px]">
          <div className="mb-3" >{step.wordSpanish}</div>
          <div className="mb-3" >{step.wordEnglish}</div>
          <div className="col-span-2">{step.sentenceSpanish}</div>
          <div>{dataUser[i]}</div>
          <button className='hidden group-hover:show' onClick={handlerClick} value={i}>Empezar aqui</button>
        </div>
      ))}
    </div>
  )
}
