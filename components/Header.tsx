
import { Login, Signup, Logout } from '../styles/icons/icons'

export default function Header({ setView, user }) {

  const HandlerLogout = ()=>{
    sessionStorage.setItem("userTestEnglish","") 
    sessionStorage.setItem("passwordTestEnglish","") 
    location.reload()
  }
  
  return (
    <div>
      <div className='flex justify-between items-center bg-gray-800 py-3 px-6'>
        <div className='p-1 sm:p-0'>
          <p className='text-gray-300 font-semibold text-[2rem]'>TestEnglish</p>
          <p className='text-gray-200 '>TestEnglish es una pagina donde podras evaluar tu vocabulario en ingles 
          </p>
        </div>
        {user.length == 0 ?
          <div className='flex flex-col sm:flex-row justify-between w-[15rem]'>
            <button onClick={() => setView("login")} className='flex mb-2 bg-blue-400 rounded p-3 text-white hover:outline-1 hover:outline hover:bg-blue-600'><Login />Login</button>
            <button onClick={() => setView("signup")} className='flex mb-2 bg-indigo-400 rounded p-3 text-white hover:outline-1 hover:outline hover:bg-indigo-600'><Signup /> Sign up</button>
          </div> :
          <div className='flex flex-col '>
            <p className='text-white text-[1.2rem]'>{user}</p>
            <button onClick={HandlerLogout} className='flex items-center bg-red-400 rounded px-2 py-1 text-white hover:outline-1 hover:outline hover:bg-red-600 w-24'><Logout /> <p  className='pl-1' >Logout</p></button>
          </div>
        }
      </div>
    </div>
  )
}
