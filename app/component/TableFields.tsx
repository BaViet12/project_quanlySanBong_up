'use client';
import React, { useEffect, useState } from 'react'


interface San {
    id:number;
    name:string;
    fieldType:number;
    status:string;
    image:string;
    description:string;
}
interface TableDashboardProps {
    onEdit: (product: San) => void;
    onDelete: (id: number) => void;
    reloadKey: (id: number) => void;
  }

const TableFields: React.FC<TableDashboardProps> = ({onDelete,onEdit,reloadKey}) => {
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
            console.log("Dữ liệu từ API Field",data.fields);
            setSanTable(data.fields);
        })
        .catch((error)=>{
            console.error('Error:',error);
        })
    },[reloadKey]);
  return (
    <div className='overflow-x-auto flex justify-center w-full'>
        <table className='table w-full xl:ml-36 border-2 mt-14 text-center'>
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
                        <td>{field.fieldType}</td>
                        <td>{field.status}</td>
                        <td>{field.image}</td>
                        <td>{field.description}</td>
                        <td className='flex gap-1'>
                            <button type='submit' className='bg-green-800 rounded-sm px-1 text-white hover:bg-blue-700' onClick={()=> onEdit(field)}>
                                Sửa
                            </button>
                            <button className='bg-green-800 rounded-sm px-1 text-white hover:bg-blue-700' onClick={()=>onDelete(field.id)}>
                                Xóa
                            </button>
                        </td>
                    </tr>
                ))
                )}
            </tbody>
        </table>
    </div>

  )
}

export default TableFields