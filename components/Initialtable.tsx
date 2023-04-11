import { data } from '../prisma/data'

export default function initialtable() {

  return (
    <div className='px-10 bg-gray-100'>
      < div className="text-xl py-2 grid grid-cols-6 gap-4 order- font-semibold border-gray-500 border-b-[1px]">
        <div className="mb-3">wordSpanish</div>
        <div className="mb-3" >wordEnglish</div>
        <div className="col-span-2" >sentenceSpanish</div>
        <div className="col-span-2" >sentenceEnglish</div>
      </div>
      {data.map((step, i: number) => (
        < div key={i} className="hover:text-gray-900  text-gray-500 py-2 grid grid-cols-6  gap-6 border-gray-300 border-b-[1px]">
          <div className="mb-3" >{step.wordSpanish}</div>
          <div className="mb-3" >{step.wordEnglish}</div>
          <div className="col-span-2" >{step.sentenceSpanish}</div>
          <div className="col-span-2" >{step.sentenceEnglish}</div>
        </div>
      ))}
    </div>
  )
}
