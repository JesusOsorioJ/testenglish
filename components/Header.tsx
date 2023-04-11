
import { Login, Signup } from '../styles/icons/icons'

export default function Header({ login, setLogin }) {
  return (
    <div>
        <div className='flex justify-between items-center bg-gray-800 py-3 px-6'>
        <div>
          <p className='text-gray-300 font-semibold text-[2rem]'>TestEnglish</p>
          <p className='text-gray-200 '>TestEnglish es una pagina donde podras evaluar tu vocabulario en ingles
          </p>
        </div>
        {login == 0 ?
          <div className='flex justify-between w-[15rem]'>
            <button onClick={()=>setLogin(2)} className='flex bg-blue-400 rounded p-3 text-white hover:outline-1 hover:outline hover:bg-blue-600'><Login />Login</button>
            <button onClick={()=>setLogin(1)} className='flex bg-indigo-400 rounded p-3 text-white hover:outline-1 hover:outline hover:bg-indigo-600'><Signup /> Sign up</button>
          </div> :
          <div>
           
          </div>
      }
      </div>
      <p className="font-semibold px-10 p-4 text-[3rem]">Quiz £</p>
    </div>
  )
}
