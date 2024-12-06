'use client';
import React, { useEffect, useState } from 'react'

interface San {
    id:number;
    name:string;
    field_type:number;
    status:string;
    HinhAnh:string;
    MoTa:string;
}

const TableFields = () => {
    const [sanTable,setSanTable] = useState<San[]>([]);
    useEffect(()=>{
        fetch('/api/soccer')
        .then((response) =>{
            if(!response.ok) {
                throw new Error('Failed to fetch data');
            }
            return response.json();
        })
        .then((data)=>{
            console.log("Dữ liệu từ API Field",data.Soccer);
            setSanTable(data.Soccer);
        })
        .catch((error)=>{
            console.error('Error:',error);
        })
    },[setSanTable]);
  return (
    <div>
        <div className='overflow-x-auto flex justify-center'>
        <table className='table w-[1100px] xl:ml-36 border-2 mt-14 text-center'>
            <thead className=''>
                <tr className='bg-green-800 text-white text-sm'>
                    <th>Mã sân</th>
                    <th>Tên sân</th>
                    <th>Loại sân</th>
                    <th>Trạng thái</th>
                    <th>Hình ảnh</th>
                    <th>Mô tả</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                {sanTable.length === 0 ? (
                    <tr>
                        <td colSpan={7}>Đang tải dữ liệu...</td>
                    </tr>
                ) : (
                sanTable.map((field) => (
                    <tr key={field.id}>
                        <td>{field.id}</td>
                        <td>{field.name}</td>
                        <td>{field.field_type}</td>
                        <td>{field.status}</td>
                        <td>{field.HinhAnh}</td>
                        <td>{field.MoTa}</td>
                    </tr>
                ))
                )}
            </tbody>
        </table>
    </div>
    </div>
  )
}

export default TableFields