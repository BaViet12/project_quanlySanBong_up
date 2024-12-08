'use client';
import React, { useEffect, useState } from 'react'
import { San } from '@/app/admin/fieldmanagement/page';


// interface San {
//     id:number;
//     name:string;
//     fieldType:number;
//     status:string;
//     image:string;
//     description:string;
// }

interface TableFieldsProps {
    sanTable: San[]; // Prop sanTable là một mảng chứa các phần tử kiểu San
  }
  

const TableFields: React.FC<TableFieldsProps> = ({sanTable}) => {
    // const [sanTable,setSanTable] = useState<San[]>([]);
    // useEffect(()=>{
    //     fetch('/api/soccer')
    //     .then((response) =>{
    //         if(!response.ok) {
    //             throw new Error('Failed to fetch data');
    //         }
    //         return response.json();
    //     })
    //     .then((data)=>{
    //         console.log("Dữ liệu từ API Field",data.fields);
    //         setSanTable(data.fields);
    //     })
    //     .catch((error)=>{
    //         console.error('Error:',error);
    //     })
    // },[setSanTable]);
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
                        <td>{field.fieldType}</td>
                        <td>{field.status}</td>
                        <td>{field.image}</td>
                        <td>{field.description}</td>
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