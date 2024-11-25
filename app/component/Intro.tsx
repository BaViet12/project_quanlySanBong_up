import React from 'react'
import { GiSoccerBall } from "react-icons/gi";
import { CiCalendarDate } from "react-icons/ci";
import { GiSoccerKick } from "react-icons/gi";

const Intro = () => {
  return (
    <div className='flex justify-around items-center text-center p-14'>
        <div className=' hover:text-green-800 text-black'>
            <GiSoccerBall className='text-8xl ml-36 pb-3' />
            <h1 className='text-4xl font-bold pb-3'>Tìm kiếm sân</h1>
            <p>Tìm kiếm nhanh chóng dựa trên dữ liệu bạn đưa ra</p>    
        </div>
        <div className='px-28 hover:text-green-800 text-black'>
            <CiCalendarDate className='text-8xl ml-36 pb-3'/>
            <h1 className='text-4xl font-bold pb-3'>Đặt lịch</h1>
            <p>Tìm kiếm nhanh chóng dựa trên dữ liệu bạn đưa ra</p>  
        </div>
        <div className=' hover:text-green-600  text-black'>
            <GiSoccerKick className='text-8xl ml-36 pb-3'/>
            <h1 className='text-4xl font-bold pb-3'>Tìm đối kèo</h1>
            <p>Tìm kiếm nhanh chóng dựa trên dữ liệu bạn đưa ra</p>
        </div>
    </div>
  )
}

export default Intro