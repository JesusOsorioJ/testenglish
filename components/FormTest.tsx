
import { useForm } from 'react-hook-form';
import { useState } from 'react';

export default function FormTest({ showForm, setShowForm, data, dataUser }) {
    const { register, handleSubmit } = useForm();
    const [showWord, setShowWord] = useState(false);
    const [error, setError] = useState("")

    const handleAddAnswer = async (data: {}) => {
        const email = sessionStorage.getItem("userTestEnglish")
        await fetch('/api/user?type=update', {
            method: 'PUT',
            body: JSON.stringify({ email, answer: { ...dataUser, [showForm]: data.select } })
        })
        setShowForm(parseInt(showForm) + 1)
    }
    const HandlerOnRepeat = ()=>{
        const change = sessionStorage.getItem("stepTestEnglish")
        sessionStorage.setItem("stepTestEnglish",showForm)
        setShowForm(change)

    }
    return (
        <>
            <div className="absolute grid items-center
        justify-center z-10 w-full h-full bg-gray-500 opacity-80">
            </div>
            <div className="absolute grid items-center
        justify-center z-20 w-full h-full">

                <form className="rounded flex flex-col bg-white p-6 w-[500px] opacity-100" onSubmit={handleSubmit(handleAddAnswer)}>
                   {showForm-sessionStorage.getItem("stepTestEnglish")>0? <button className='rounded bg-green-400 flex items-center hover:bg-green-600 text-gray-100 py-2 px-3 max-w-[10rem]'
                     type="button" onClick={HandlerOnRepeat}>Evaluar {sessionStorage.getItem("stepTestEnglish")}</button>:<></>}

                    <p className='text-[2rem]'>{showForm}. {data[showForm].wordSpanish}</p>
                    {showWord ?<p className='text-[2rem]'>{data[showForm].wordEnglish}</p>: <></>}
                    <p className='text-[2rem]'>{data[showForm].sentenceSpanish}</p>
                    {showWord==false ?<button onClick={()=>setShowWord(true)} type="button" 
                    className='rounded bg-green-400 flex items-center hover:bg-green-600 text-gray-100 py-2 px-3 max-w-[10rem]'>
                        Mostrar</button>:<></>}
                    {showWord ?<p className='text-[2rem]'>{data[showForm].sentenceEnglish}</p>: <></>}
                
                    <div className='flex flex-col my-4'>
                        <label htmlFor='price' >Select</label>
                        <select className='border border-2' {...register("select")}>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C" >C</option>

                        </select>
                    </div>

                    <div className='flex justify-around mt-8'>
                        <button className=" rounded bg-red-400 hover:bg-red-600 text-gray-100 py-2 px-3 max-w-[10rem]"
                            onClick={() => setShowForm()}>{'<'} Back</button>
                        <button className=" rounded bg-green-400 flex items-center hover:bg-green-600 text-gray-100 py-2 px-3 max-w-[10rem]">
                            Next
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}
