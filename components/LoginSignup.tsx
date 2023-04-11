import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Signup } from '../styles/icons/icons'


export default function LoginSignup({view,setView}) {
    const { register, handleSubmit } = useForm();
    const [ message, setMessage ] = useState("Nada");
    const [error, setError] = useState("")
    const handleLogin = async (data: {}) => {
        if (view == "signup"){
            const {message} = await fetch('/api/user?type=signup', {
                method: 'POST',
                body: JSON.stringify({...data,answer:"{}"})
            }).then(data=>data.json())
            if (message[0]?.email!=null){
                sessionStorage.setItem("userTestEnglish",message[0].email)
                sessionStorage.setItem("passwordTestEnglish",message[0].password)
            }else{
                setError('Lo sentimos no se pudo crear User porfavor intentelo nuevamente')
            }
        }else 
        if (view == "login"){
            const {message} = await fetch('/api/user?type=login', {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(data=>data.json()) 
            if (message[0]?.email!=null){
                sessionStorage.setItem("userTestEnglish",message[0].email)
                sessionStorage.setItem("passwordTestEnglish",message[0].password)
            }else{
                setError('Lo sentimos no se encontro user o contraseña')
            }
        }
        
        // if (!response.ok) {
        //   throw new Error(response.statusText);
        // }
        // return await response.json();
    }
    return (
        <>
            <div className="absolute grid items-center
                justify-center z-10 w-full h-full bg-gray-500 opacity-80">
            </div>
            <div className="absolute grid items-center
                justify-center z-20 w-full h-full">

                <form className="rounded flex flex-col bg-white p-6 w-[500px] opacity-100" onSubmit={handleSubmit(handleLogin)}>
                    <p className='text-[2rem]'>
                        {view == "signup" ? `Create New Acount` : "Login"} :  {message}</p>
                    <p className='text-[1rem] text-red-400'>{error.length>0 ? error : ""}</p>
                    <div className='flex flex-col my-4'>
                        <label htmlFor='name' >Name</label>
                        <input className='border border-2' {...register("email")} type="email" />
                    </div>
                    <div className='flex flex-col my-4'>
                        <label htmlFor='price' >Password</label>
                        <input className='border border-2' {...register("password")} type="password" />
                    </div>
                    {view == "signup" ?
                    <div className='flex justify-center'>
                    <p className=''>Ya tienes cuenta? </p>
                    <button onClick={()=>setView("login")} className='ml-2 text-blue-600 hover:text-blue-900'>Ingresa aqui</button>

                </div>
                    :
                    <div className='flex justify-center'>
                        <p>¿No tienes cuenta? </p>
                    <button onClick={()=>setView("signup")} className='ml-2 text-blue-600 hover:text-blue-900'>Registrate aqui</button>

                    </div>}
                    <div className='flex justify-around mt-8'>
                        <button className=" rounded bg-red-400 hover:bg-red-600 text-gray-100 py-2 px-3 max-w-[10rem]"
                            onClick={()=>setView("landing")}>{'<'} Back</button>
                        <button className=" rounded bg-green-400 flex items-center hover:bg-green-600 text-gray-100 py-2 px-3 max-w-[10rem]">
                            {view == "signup" ? "Create" : "Login"}<Signup />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
