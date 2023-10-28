import React from 'react'

export default function index({header, subHeader}) {
  return (
    <>
      <header className='border-b-2 border-slate-300 mb-5 text-blue-950 font-source_sans'>
        <h1 className="font-bold text-3xl mb-2">{header}</h1>
        <h2 className="text-md mb-5">{subHeader}</h2>
      </header>
    </>
  )
}
