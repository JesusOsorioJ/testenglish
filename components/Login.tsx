import React from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Signup } from '../styles/icons/icons'




export default function Login({login,setLogin}) {
    const { register, handleSubmit } = useForm();
    const [error, setError] = useState()
    const handleLogin = async (data: {}) => {

        if (login == 1){
            const response = await fetch('/api/user', {
                method: 'POST',
                body: JSON.stringify(data)
            }).then(data=>data.json())
            console.log("signup", response);
            
        }else 
        if (login == 2){
            const response = await fetch('/api/user', {
                method: 'PUT',
                body: JSON.stringify(data)
            }).then(data=>data.json())
            console.log("login", response);

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
                        {login == 1 ? `Create New Acount` : "Login"}</p>
                    <p className='text-[1rem] text-red-400'>{error ? error[0] : ""}</p>
                    <div className='flex flex-col my-4'>
                        <label htmlFor='name' >Name</label>
                        <input className='border border-2' {...register("email")} type="email" />
                    </div>
                    <div className='flex flex-col my-4'>
                        <label htmlFor='price' >Password</label>
                        <input className='border border-2' {...register("password")} type="password" />
                    </div>
                    <div className='flex justify-around'>
                        <button className=" rounded bg-red-400 hover:bg-red-600 text-gray-100 py-2 px-3 max-w-[10rem]"
                            onClick={()=>setLogin(0)}>{'<'} Back</button>
                        <button className=" rounded bg-green-400 flex items-center hover:bg-green-600 text-gray-100 py-2 px-3 max-w-[10rem]">
                            {login == 1 ? "Create" : "Login"}<Signup />
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
