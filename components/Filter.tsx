import { useRouter } from 'next/navigation';

export default function Filter({ user, setUser, lastStep, handlerClick }) {
    const router = useRouter();

    const filterType = ["word", "body parts", "family", "dates", "house place", "phrasal verb",
        "though similar", "end in ly", "lend-borrow", "even", "ink-inn", "issue- trouble",
        "should-must", "expressions", "either-neither", "similar word", "uncountable",
        "though", "ways of looking", "climate", "despite-spite", "phrase"]

    const handleAddFilter = (e: { target: { name: "", value: "" } }) => {
        if (e.target.value == "") { router.push('') } else {
            setUser(user)
            router.push(`?${e.target.name}=${e.target.value}`)
        }
    }


    const handleDeleteFilter = () => {
        router.push('')
    }

    return (
        <div className='flex flex-col lg:flex-row justify-between items-center px-10'>
            <p className="font-semibold  p-4 text-[3rem]" >Quiz £</p>
            {user.length > 0 ?
                <form onSubmit={handleAddFilter} className="flex flex-col md:flex-row gap-4">
                    <div className='flex gap-2'>
                        <label htmlFor="selectGrade">SelectGrade</label>
                        <select autoComplete="country-name" className=" block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"

                            onChange={handleAddFilter} id="selectGrade" name="selectGrade">
                            <option value="">--</option>
                            <option value="A">A</option>
                            <option value="B">B</option>
                            <option value="C">C</option>
                        </select>
                    </div>
                    <div className='flex gap-2'>
                        <label htmlFor="selectType">selectType</label>
                        <select autoComplete="country-name" className=" block w-full rounded-md border-0 bg-white py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            onChange={handleAddFilter} id="selectType" name="selectType" >
                            <option value="">--</option>
                            {filterType.map(typeFilter => (
                                <option value={typeFilter} key={typeFilter}>{typeFilter}</option>))}
                        </select>
                    </div>
                    <div className='flex gap-3'>
                        <button className='rounded bg-red-400 flex items-center hover:bg-red-600 text-gray-100 py-2 px-3 max-w-[10rem] h-[2rem]'
                            onClick={handleDeleteFilter} type="button">Eliminar Filtro</button>
                        <button className='rounded bg-green-400 flex items-center hover:bg-green-600 text-gray-100 py-2 px-3 max-w-[10rem] h-[2rem]'
                            type="button" onClick={handlerClick} value={lastStep}>Actual{`: ${lastStep}`}</button>
                    </div>
                </form> : <></>}
        </div >
    )
}
