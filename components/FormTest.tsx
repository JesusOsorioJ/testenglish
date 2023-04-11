
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Back, Charge } from '../styles/icons/icons'

export default function FormTest({ showForm, setShowForm, data, dataUser }) {
    const { register, handleSubmit } = useForm();
    const [showWord, setShowWord] = useState(false);
    const [charge, setCharge] = useState(false)

    const handleAddAnswer = async (data: {}) => {
        setCharge(true)
        const email = sessionStorage.getItem("userTestEnglish")
        const lastStep = sessionStorage.getItem("stepTestEnglish")

        await fetch('/api/user?type=update', {
            method: 'PUT',
            body: JSON.stringify({ 
            email, answer: { ...dataUser, [showForm]: data.select },lastAnswer:showForm })
        })
        setShowForm(parseInt(showForm) + 1)
        setShowWord(false)
        setCharge(false)


    }
    const handlerOnRepeat = () => {
        const lastStep = sessionStorage.getItem("stepTestEnglish")
        sessionStorage.setItem("stepTestEnglish", showForm)
        setShowForm(lastStep)
        setShowWord(false)

    }
    return (
        <div className="fixed top-0 left-0 w-screen h-screen">
            <div className="absolute z-10 w-full h-full bg-gray-500 opacity-80">
            </div>
            <div className="absolute grid items-center
        justify-center z-20 w-full h-full">

                <form className="rounded flex flex-col bg-white p-6 md:w-[500px] opacity-100" onSubmit={handleSubmit(handleAddAnswer)}>
                    {showForm - sessionStorage.getItem("stepTestEnglish") > 0 ? <button className='rounded bg-green-400 flex items-center hover:bg-green-600 text-gray-100 py-2 px-3 max-w-[10rem]'
                        type="button" onClick={handlerOnRepeat}>Evaluar {sessionStorage.getItem("stepTestEnglish")}</button> : <></>}
                    <p className='text-[2rem]'>{showForm + 1}. {data[showForm].wordSpanish}</p>

                    {showWord ? <p className='text-[2rem]'>{'>>'}{data[showForm].wordEnglish}</p> : <></>}
                    <p className='text-[1.5rem] py-5'>{data[showForm].sentenceSpanish}</p>
                    {showWord == false ? <div className='flex justify-around mt-8'>
                    <button className="flex items-center rounded bg-red-400 hover:bg-red-600 text-gray-100 py-2 px-3 max-w-[10rem]" type='button'
                    onClick={() => setShowForm()}><Back/> <p className='ml-1'>Back</p></button>
                    <button onClick={() => setShowWord(true)} type="button"
                        className='rounded bg-green-400 flex items-center hover:bg-green-600 text-gray-100 py-2 px-3 max-w-[10rem]'>
                        Mostrar</button></div> : <></>}
                    {showWord ? <p className='text-[1.5rem] py-5'>{data[showForm].sentenceEnglish}</p> : <></>}

                    {showWord ?
                        <>
                            <div className='flex flex-col my-4'>
                                <label htmlFor='price' >Select</label>
                                <select className='border-2' {...register("select")}>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C" selected>C</option>

                                </select>
                            </div>

                            <div className='flex justify-around mt-8'>
                                <button className="flex items-center rounded bg-red-400 hover:bg-red-600 text-gray-100 py-2 px-3 max-w-[10rem]" type='button'
                                    onClick={() => setShowForm()}> <Back/> <p className='ml-1'>Back</p></button>
                                <button className=" rounded bg-green-400 flex items-center hover:bg-green-600 text-gray-100 py-2 px-3 max-w-[10rem]">
                                {charge?<Charge/>:<></>}Next
                                </button>
                            </div>
                        </>
                        : <></>}
                </form>
            </div>
        </div>

    )
}
