import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Signup, Back, Charge } from '../styles/icons/icons'


export default function LoginSignup({ view, setView }) {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState("")
    const [charge, setCharge] = useState(false)


    const handleLogin = async (data: {}) => {
        setError("")
        setCharge(true)
        if (view == "signup") {
            const { message } = await fetch('/api/user?type=signup', {
                method: 'POST',
                body: JSON.stringify({ ...data, answer: "{}", lastAnswer:1 })
            }).then(data => data.json())
            if (message?.email != null) {
                await sessionStorage.setItem("userTestEnglish", message.email)
                await sessionStorage.setItem("passwordTestEnglish", message.password)
                location.reload();
            } else {
                setError('Lo sentimos no se pudo crear Usuario por favor intentelo nuevamente')
            }
        } else
            if (view == "login") {
                const { message } = await fetch('/api/user?type=login', {
                    method: 'POST',
                    body: JSON.stringify(data)
                }).then(data => data.json())
                if (message[0]?.email != null) {
                    sessionStorage.setItem("userTestEnglish", message[0].email)
                    sessionStorage.setItem("passwordTestEnglish", message[0].password)
                    location.reload();
                } else {
                    setError('Lo sentimos no se encontro user o contraseña')
                }
            }
            setCharge(false)
    }
    return (
        <div className="fixed w-screen h-screen">
            <div className="absolute z-10 w-screen h-screen bg-gray-500 opacity-80"></div>
            <div className="absolute grid items-center
                justify-center z-20 w-full h-full bottom-[0%] left-[0%]">
                <form className="rounded flex flex-col bg-white p-6  sm:w-[500px] opacity-100" onSubmit={handleSubmit(handleLogin)}>
                    <p className='text-[2rem]'>
                        {view == "signup" ? `Create New Account` : "Login"}</p>
                    <p className='text-[1rem] text-red-400'>{error.length > 0 ? error : ""}</p>
                    <div className='flex flex-col my-4'>
                        <label htmlFor='name' >Name</label>
                        <input className=' border-2 px-2 py-1' placeholder='Ingresa tu usuario' {...register("email")} type="email" required />
                    </div>
                    <div className='flex flex-col my-4'>
                        <label htmlFor='price' >Password</label>
                        <input className=' border-2 px-2 py-1' placeholder='Ingresa tu contraseña' {...register("password")} type="password" required />
                    </div>
                    {view == "signup" ?
                        <div className='flex justify-center'>
                            <p className=''>Ya tienes cuenta? </p>
                            <button onClick={() => setView("login")} className='ml-2 text-blue-600 hover:text-blue-900' type='button'>Ingresa aqui</button>

                        </div>
                        :
                        <div className='flex items-center justify-center'>
                            <p>¿No tienes cuenta? </p>
                            <button onClick={() => setView("signup")} className='ml-2 text-blue-600 hover:text-blue-900' type='button'>Registrate aqui</button>

                        </div>}
                    <div className='flex justify-around mt-8'>
                        <button className=" flex items-center rounded bg-red-400 hover:bg-red-600 text-gray-100 py-2 px-3 max-w-[10rem]"
                            onClick={() => setView("landing")}><Back/><p className='ml-1'>Back</p></button>
                        <button className=" rounded bg-green-400 flex items-center hover:bg-green-600 text-gray-100 py-2 px-3 max-w-[10rem]">
                            {charge?<Charge/>:<></>}
                            {view == "signup" ? "Create" : "Login"}<p className='ml-1'></p><Signup />
                        </button>
                    </div>
                </form>
            </div>
        </div>

    )
}
