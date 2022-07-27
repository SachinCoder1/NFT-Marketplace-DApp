import React from 'react'

export default function Heading2({title, className}) {
  return (
 
    <h2 className={`text-3xl font-normal leading-normal mt-6 mb-2 text-green-500 ${className}`}>
 <span className="border-b-[1px] border-gray-400 "> {title} </span>
</h2>
  )
}
