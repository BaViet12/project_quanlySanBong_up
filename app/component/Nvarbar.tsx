import React from 'react'
import Link from 'next/link';

const Navbar = () => {
  return (
    <div className='pt-5'>
        <div className='flex justify-between justify-items-center h-16 w-full pb-5'>
            <div>
                <img className='w-52 ml-10' src="https://cdn0021.imgtaothao.com/media/logo/logo-datsantructuyen.png" alt="logo" />
            </div>
            <div className="flex items-center w-full max-w-md mx-auto bg-gray-100 rounded-md px-4 py-2 shadow-md">
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
            <ul className='flex gap-5 mr-10'>
                <li className=' hover:text-red-600 text-xl text-green-800'>Đăng nhập</li>
                <li className=' hover:text-red-600 text-xl text-green-800'>Đăng ký  </li>
            </ul>
        </div>
        <div className='w-full flex justify-around items-center bg-white text-black z-10 pb-3 pt-3'>
            <nav>
                <ul className=" flex gap-44">
                    <li className="hover:text-red-600 relative after:absolute after:bottom-0 after:left-0 after:bg-orange-500 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300 text-xl text-green-800">Sân bóng đá 7 người</li>
                    <li className="hover:text-red-600 relative after:absolute after:bottom-0 after:left-0 after:bg-orange-500 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300 text-xl text-green-800">Sân bóng đá 5 người</li>
                    <li className="hover:text-red-600 relative after:absolute after:bottom-0 after:left-0 after:bg-orange-500 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300 text-xl text-green-800">
                        <Link href={'/shop'}>Mua sắm</Link>
                    </li>
                    <li className="hover:text-red-600 relative after:absolute after:bottom-0 after:left-0 after:bg-orange-500 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300 text-xl text-green-800">Quy định</li>
                    <li className="hover:text-red-600 relative after:absolute after:bottom-0 after:left-0 after:bg-orange-500 after:h-0.5 after:w-0 hover:after:w-full after:transition-all after:ease-in-out after:duration-300 text-xl text-green-800">Liên hệ</li>
                </ul>
            </nav>
        </div>
    </div>
    
  )
}

export default Navbar