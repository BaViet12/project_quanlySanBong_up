"use client"
import React, { useState } from 'react'
import Link from 'next/link';
import { TiThMenuOutline } from "react-icons/ti";

const Navbar = () => {
   const [isMenuOpen,setIsMenuOpen] = useState(false);
   const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
   }
  return (
    <div className='relative py-6 mx-10'>
        <div className='flex justify-around items-center h-16 w-full pb-5'>
            <div className='basic-2/6 '>
                <img className='w-52 ml-10 cursor-pointer' src="https://cdn0021.imgtaothao.com/media/logo/logo-datsantructuyen.png" alt="logo" />
            </div>
            <div className="hidden lg:flex items-center w-full max-w-md mx-auto bg-gray-100 rounded-md px-4 py-2 shadow-md basis-3/6/">
                <input
                    type="text"
                    placeholder="Từ khóa tìm kiếm"
                    className="flex-grow bg-transparent outline-none text-gray-700 placeholder-gray-400 text-lg"
                />
                <button className="text-green-800 hover:text-gray-700">
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-7 h-7 "
                    >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M21 21l-4.35-4.35m0 0a7.5 7.5 0 1 0-10.6 0 7.5 7.5 0 0 0 10.6 0z"
                    />
                    </svg>
                </button>
            </div>
            <ul  className='hidden lg:flex gap-5 mr-10 basis-1/6 uppercase'>
                <li className='nav-item whitespace-nowrap'>Đăng nhập</li>
                <li className='nav-item whitespace-nowrap'>Đăng ký  </li>
            </ul>
            <div  className='lg:hidden' onClick={toggleMenu}>
                <TiThMenuOutline className='size-5'/>
            </div>
        </div> 
        <div className={`lg:flex flex-col lg:flex-row justify-around items-center bg-white text-black z-10 pb-3 pt-3 ${isMenuOpen? "block" : "hidden"}`}>
            <nav className=''>
                <ul className="flex flex-col lg:flex-row items-center flex-wrap gap-10 lg:gap-44  uppercase z-50 tqd-topmenu">
                    <li className="nav-item">Sân bóng đá 7 người</li>
                    <li className="nav-item">Sân bóng đá 5 người</li>
                    <li className="nav-item">
                        <Link href={'/shop'}>Mua sắm</Link>
                    </li>
                    <li className="nav-item">Quy định</li>
                    <li className="nav-item">Liên hệ</li>
                </ul>
            </nav>
        </div>
    </div>
    
  )
}

export default Navbar