
import { Login, Signup } from '../styles/icons/icons'
import { useEffect, useState } from 'react'

export default function Header({ view, setView }) {
  const [user, setUser] = useState("")
  useEffect(() => {
    const item = sessionStorage.getItem("userTestEnglish")
    if (item !=null){
      setUser(item)
    }
    
  }
    , [])
  return (
    <div>
      <div className='flex justify-between items-center bg-gray-800 py-3 px-6'>
        <div>
          <p className='text-gray-300 font-semibold text-[2rem]'>TestEnglish</p>
          <p className='text-gray-200 '>TestEnglish es una pagina donde podras evaluar tu vocabulario en ingles 
          </p>
        </div>
        {user.length == 0 ?
          <div className='flex justify-between w-[15rem]'>
            <button onClick={() => setView("login")} className='flex bg-blue-400 rounded p-3 text-white hover:outline-1 hover:outline hover:bg-blue-600'><Login />Login</button>
            <button onClick={() => setView("signup")} className='flex bg-indigo-400 rounded p-3 text-white hover:outline-1 hover:outline hover:bg-indigo-600'><Signup /> Sign up</button>
          </div> :
          <div className='flex flex-col '>
            <p className='text-white text-[1.2rem]'>{user}</p>
            <button onClick={() => sessionStorage.setItem("userTestEnglish","")} className='flex bg-red-400 rounded px-2 py-1 text-white hover:outline-1 hover:outline hover:bg-red-600'>Logout</button>
          </div>
        }
      </div>
    </div>
  )
}
