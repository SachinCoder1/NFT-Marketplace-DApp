import React from 'react'

export default function BtnHelper({icon, text}) {
  return (
    <div className='flex gap-x-2'>{icon && icon} {text}</div>
  )
}
