"use client";
import React, { useEffect, useState } from 'react'

interface Price {
    id: number;
    name: string;
    field_id: number;
    timeslot_id: number;
    price: number;
}
interface TableDashboardProps {
    onEdit: (product: Price) => void;
    onDelete: (id: number) => void;
    reloadKey: (id: number) => void;
}


const TablePrice: React.FC<TableDashboardProps> = ({onDelete,onEdit,reloadKey}) => {
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
    },[reloadKey]);
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
                        <td className='flex gap-1 justify-center'>
                            <button type='submit' className='bg-green-800 rounded-sm px-1 text-white hover:bg-blue-700' onClick={()=>onEdit(pricemap)}  >
                                Sửa
                            </button>
                            <button className='bg-green-800 rounded-sm px-1 text-white hover:bg-blue-700 ' onClick={()=>onDelete(pricemap.id)}>
                                Xóa
                            </button>
                        </td> 
                    </tr>
                )
            )}
            </tbody>
        </table>
    </div>
  )
}

export default TablePrice