import React from 'react'
import Navbar from '../navbar/Navbar'

export default function MainLayout({children}) {
  return (
    <div className="bg-gray-200 pb-3">
        <Navbar />
        <main className='px-2 mb-5 mx-2 mt-2 min-h-screen'>
            {children}
        </main>
    </div>
  )
}
