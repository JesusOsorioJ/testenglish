import { data } from '../prisma/data'

export default function initialtable() {

  return (
    <div >
      <p className="px-10 font-semibold  p-4 text-[3rem]" >Quiz £</p>
      <div className='px-10 bg-gray-100'>
        < div className="text-xl py-2 grid grid-cols-9 lg:grid-cols-12 gap-4 font-semibold border-gray-500 border-b-[1px]">
          <div className="">#</div>
          <div className="col-span-2"><p className="flex md:hidden">Es</p><p className='hidden md:block'>wordSpanish</p></div>
          <div className="col-span-2"><p className="block md:hidden">En</p><p className='hidden md:block'>wordEnglish</p></div>
          <div className="hidden lg:block col-span-3"><p className="block md:hidden">Es</p><p className='hidden md:block'>sentenceSpanish</p></div>
          <div className="col-span-3"><p className="block md:hidden">En</p><p className='hidden md:block'>sentenceEnglish</p></div>
        </div>
        {data.map((step, i: number) => (
          < div key={i} className="hover:text-gray-900  text-gray-500 py-2 grid grid-cols-9 lg:grid-cols-12  gap-6 border-gray-300 border-b-[1px]">
            <div className="" >{i + 1}</div>
            <div className="col-span-2" >{step.wordSpanish}</div>
            <div className="col-span-2" >{step.wordEnglish}</div>
            <div className="hidden lg:block col-span-3" >{step.sentenceSpanish}</div>
            <div className="col-span-3" >{step.sentenceEnglish}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
