"use client";
import React, { useEffect, useState } from 'react'

interface Soccer {
  id:number;
  name:string;
  field_type:number;
  status:string;
  HinhAnh:string;
  MoTa:string;
  Price?:{
    id:number;
    name:string;
    price:number;
    status:string;
    
  }
  Timeslot?:{
    id:number;
  name:string;
  }
}
interface Price {
  id:number;
  name:string;

}
interface timeslot {
  id:number;
  name:string;
}

const ListFields:React.FC = () => {
  const [soccers,setSoccers] = useState<Soccer[]>([]);
  const [price,setPrices] = useState<Price[]>([]);
  const [timeslot,setTimeslots] = useState<timeslot[]>([]);

  useEffect(() => {
    fetch('/api/timeslot')
      .then(response => response.json())
      .then(data => setTimeslots(data))
      .catch(error => console.error('Error:', error));
  }, []);

  useEffect(() => {
    const fetchSoccers = async () => {
      try {
        const res = await fetch('/api/soccer');
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.statusText}`);
        }
        const data = await res.json();
        console.log("hhhh", data);
  
        // Kiểm tra nếu dữ liệu không phải mảng
        if (Array.isArray(data.Soccer)) {
          setSoccers(data.Soccer);
        } else if (data && typeof data === 'object') {
          // Nếu dữ liệu là object, chuyển thành mảng
          setSoccers([data.Soccer]);
        } else {
          console.error('Dữ liệu không hợp lệ:', data);
        }
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    };
  
    fetchSoccers();
  }, []);

  

  return (
    <div className='p-10'>
        <h1  className='ml-28 font-bold text-5xl py-10'>Danh sách sân bóng</h1>
        <div className='flex flex-wrap justify-start gap-10 px-48'>
        {soccers.length > 0 ? (
            soccers.map((soccer) => (
              <div
                key={soccer.id}
                className="flex p-6 w-full h-auto gap-10"
              >
                <div>
                <img src={soccer.HinhAnh} alt={soccer.name} className="w-96 h-96 object-cover m-auto"/>
                </div>
                <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-5'>
                  <h1 className='text-3xl'>{soccer.name}</h1>
                  <p className='text-blue-700 flex gap-1'>Thể loại: 
                    <p className='text-black'>Sân bóng đá {soccer.field_type} người</p>
                  </p>
                  <p className='text-blue-700 flex gap-1'>Trạng thái: 
                    <p className='text-black'>{soccer.status}</p>
                  </p>
                  <p className='text-blue-700 flex gap-1'>Mô tả: 
                    <p className='text-black'>{soccer.MoTa}</p>
                  </p>
                </div>
                <div className='flex gap-2'>
                {Array.isArray(soccer.Price) && soccer.Price.map((price) => (
                      <p key={price.id} className="flex">
                          <span className="text-black border-2 border-black p-2 hover:text-white hover:bg-blue-700 hover:border-white">{price.timeslot?.name || "Không có"}</span>
                      </p>
                  ))}
                </div>
                </div>
              </div>
            ))
          ) : (
            <p>Không có dữ liệu để hiển thị</p>
          )}
        </div>
    </div>
  )
}

export default ListFields