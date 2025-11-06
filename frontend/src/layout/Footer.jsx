import React from 'react'


export default function Footer() {
  return (
    <footer className="bg-blue-600 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
        <p className="text-center md:text-left text-sm">
          &copy; {new Date().getFullYear()} SlotSwapper. All rights reserved.
        </p>
        <div className="mt-4 md:mt-0 space-x-4">
          <button
      className='hover:text-black cursor-pointer'>
       <i className="fa-brands fa-square-instagram fa-2x"></i>
      </button>
    <button
    onClick={()=> window.open('https://www.linkedin.com/in/chaitnya-khedekar-53027431a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app','_blank')}
      className='hover:text-black cursor-pointer'>
      <i className="fa-brands fa-linkedin fa-2x"></i>
     </button>
     <button
     onClick={()=> window.open('https://github.com/Chaitnya27','_blank')}
      className='hover:text-black cursor-pointer'>
      <i className="fa-brands fa-github fa-2x"></i>
     </button>
        </div>
      </div>
    </footer>
  )
}
