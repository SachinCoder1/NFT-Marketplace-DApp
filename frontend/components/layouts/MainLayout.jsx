import React from 'react'
import Navbar from '../navbar/Navbar'

export default function MainLayout({children}) {
  return (
    <div>
        <Navbar />
        <main className='px-2 m-2'>
            {children}
        </main>
    </div>
  )
}
