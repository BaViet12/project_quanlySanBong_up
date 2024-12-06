"use client";
import React, { useEffect, useState } from 'react'

interface Price {
    id: number;
    name: string;
    field_id: number;
    timeslot_id: number;
    price: number;
}

const TablePrice = () => {
    const [price,setPrice] = useState<Price[]>([]);
    useEffect(()=>{
        fetch('/api/price')
        .then((response) =>{
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then((data)=>{
            console.log("Dữ liệu từ API Field",data.Soccer);
            setPrice(data.Soccer);
        })
        .catch((error)=>{
            console.error('Error:',error);
        })
    },[setPrice]);
  return (
    <div className='overflow-x-auto flex justify-center scroll-m-10' >
        <table className='table w-[1100px] xl:ml-36 border-2 mt-14 text-center'>
            <thead className=''>
                <tr className='bg-green-800 text-white text-sm'>
                    <th>Mã giá</th>
                    <th>Tên</th>
                    <th>Mã sân</th>
                    <th>Mã giờ</th>
                    <th>Giá</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {price.map((pricemap)=>(
                    <tr key={pricemap.id}>
                        <th>{pricemap.id}</th>
                        <td>{pricemap.name}</td>
                        <td>{pricemap.field_id}</td>
                        <td>{pricemap.timeslot_id}</td>
                        <td>{pricemap.price}</td>
                    </tr>
                )
            )}
            </tbody>
        </table>
    </div>
  )
}

export default TablePrice