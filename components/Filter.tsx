import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';


export default function Filter() {
    const { register, handleSubmit } = useForm();
    const router = useRouter();

    const handleAddFilter = (e:{}) => {
        // document.querySelector('selectType').reset();
        router.push(`?${e.target.name}=${e.target.value}`)
    }

    return (
        <div className='flex justify-between items-center px-10'>
            <p className="font-semibold  p-4 text-[3rem]" >Quiz £</p>
            <form onSubmit={handleSubmit(handleAddFilter)} className="flex">
                <div>
                    <label htmlFor="selectGrade">Select grade</label>
                    <select onChange={handleAddFilter} name="selectGrade">
                    <option value="" selected>-</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="selectType">select Type</label>
                    <select onChange={handleAddFilter} name="selectType">
                    <option value="" selected>-</option>
                        <option value="A">A</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                    </select>
                </div>
                <button>Eliminar filtro</button>
                <button>Evaluar desde Actual</button>
            </form>
        </div>
    )
}
