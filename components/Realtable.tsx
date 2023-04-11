
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import * as React from 'react'
import FormTest from './FormTest'
import functionFilter from './functionFilter'
import Filter from './Filter';

type Props = {
  user: string
  setUser:  React.Dispatch<React.SetStateAction<string>>
}



 const Realtable: React.FC<Props> = ({user,setUser}) => {
  const [data, setData] = useState([{ id:"",wordSpanish: "", wordEnglish: "", sentenceSpanish: "", sentenceEnglish: "", type:"" }])
  const [showForm, setShowForm] = useState(-1)
  const [dataUser, setDataUser] = useState({})
  const [ lastStep, setLastStep ] = useState(-1) 
  
  const router = useRouter()
  const filter = router.query
  
  
  useEffect(() => {
    (async () => {
      const email = sessionStorage.getItem("userTestEnglish")
      const password = sessionStorage.getItem("passwordTestEnglish")
      const filter1 = router.query
      const response0 = await fetch("api/word", {
        method: 'POST', body: JSON.stringify(filter)
      }).then(response => response.json())
      if (filter.selectType == null){ 
        setData(response0.message)
      }else{
        // setData(response0.message.filter(data=>(data.type==filter.selectType)))
      }
      

      const response = await fetch("api/user?type=login", {
        method: 'POST', body: JSON.stringify({ email, password })
      }).then(response => response.json())
      setLastStep(response.message[0].lastAnswer+1)
      if (filter.selectGrade == null) {
        setDataUser(JSON.parse(response.message[0].answer))
      } else {
          setDataUser(functionFilter(JSON.parse(response.message[0].answer)
          , filter.selectGrade)) 
      }

    })()
  }, [showForm,user])

  const handlerClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    sessionStorage.setItem("stepTestEnglish", e.currentTarget.value)
    setShowForm(parseInt(e.currentTarget.value)-1)
  }



  return (
    <div className='static px-10 bg-gray-100'>
      <Filter user={user} setUser={setUser} lastStep={lastStep} handlerClick={handlerClick}/>
      <button onClick={handlerClick}></button>
      {showForm > -1 ? <FormTest showForm={showForm} setShowForm={setShowForm} data={data} dataUser={dataUser} /> : <></>}
      
      < div className="text-xl py-2 grid grid-cols-7 lg:grid-cols-12 gap-4  font-semibold border-gray-500 border-b-[1px]">
        <div className="col-span-1">#</div>
        <div className="col-span-2 hidden lg:block">wordSpanish</div>
        <div className="col-span-2" ><p className="flex md:hidden">Es</p><p className='hidden md:block'>wordEnglish</p></div>
        <div className="col-span-2" >type</div>
        <div className="col-span-3 hidden lg:block" >sentenceEnglish</div>
        <div className="col-span-1" >Nota</div>
        <div className="col-span-1 " >Evaluar</div>
      </div>
      {data.map((step, i: number) => (
        <>
          {filter.selectGrade == undefined || "dataUser[i]" == filter.selectGrade ?
            
            <div key={step.id} className="hover:text-gray-900 group w-full text-gray-500 py-2 grid grid-cols-7 lg:grid-cols-12 justify-items-start  gap-6 border-gray-300 border-b-[1px]">
              <div className="col-span-1" >{step.id}</div>
              
              <div className="col-span-2 hidden lg:block" >{step.wordSpanish}</div>
              <div className="col-span-2" >{step.wordEnglish}</div>
              <div className="col-span-2 ">{step.type}</div>
              <div className="col-span-3 hidden lg:block ">{step.sentenceEnglish}</div>

              <div></div>
              <button className="col-span-1 lg:hidden lg:font-bold group-hover:block text-green-500" onClick={handlerClick} value={step.id} >Empezar</button>
            </div>
             : <></>}
        </>
      ))}
    </div>
  )
}

export default Realtable