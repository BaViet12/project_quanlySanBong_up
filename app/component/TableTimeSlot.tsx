"use client"
import React, { useEffect, useState } from 'react'
interface TimeSlot {
    id: number;
    name: string;
    start_time: string;
    end_time: string;
    status: boolean;
  }
const TableTimeSlot = () => {
    const [timeslot,setTimeslot] = useState<TimeSlot[]>([]);
    useEffect(()=>{
        fetch('/api/timeslot')
        .then((response) =>{
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then((data)=>{
            console.log("Dữ liệu từ API Field",data.Soccer);
            setTimeslot(data.Soccer);
        })
        .catch((error)=>{
            console.error('Error:',error);
        })
    },[setTimeslot]);
  return (
    <div className='overflow-x-auto flex justify-center'>
        <table className='table w-[1100px] xl:ml-36 border-2 mt-14 text-center'>
            <thead className=''>
                <tr className='bg-green-800 text-white text-sm'>
                    <th>Mã khung giờ</th>
                    <th>Tên khung giờ</th>
                    <th>Giờ bắt đầu</th>
                    <th>Giờ kết thúc</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {timeslot.map((timeslot)=>(
                    <tr>
                        <td>{timeslot.id}</td>
                        <td>{timeslot.name}</td>
                        <td>{timeslot.start_time}</td>
                        <td>{timeslot.end_time}</td>
                        
                    </tr>
                )
            )}
            </tbody>
        </table>
    </div>
  )
}

export default TableTimeSlot