"use client";
import TableTimeSlot from '@/app/component/TableTimeSlot'
import React, { useState } from 'react'

interface timeslot {
  name: string;
  start_time: string;
  end_time:string;
  status:string;
}

const timeslotmanagement = () => {
  const initialFormData:timeslot = {
    name: "",
    start_time: "",
    end_time: "",
    status: "",
  };
  const [formTimeSlot,setFormTimeSlot] = useState<timeslot>(initialFormData);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');


  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    console.log("FormData",formTimeSlot);
    try {
      const respone = await fetch('/api/soccer',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formTimeSlot),
      });
      if(!respone.ok) {
        const erroData = await respone.json();
        throw new Error(erroData.message);
      }
      const data = await respone.json();
      setSuccess(data.message || 'Tạo khung giờ thành công');
      setFormTimeSlot(initialFormData);
    }catch(err) {
      setError(err instanceof Error ? err.message:'Lỗi tạo khung giờ');
      console.error('Lỗi tạo khung giờ',err);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormTimeSlot(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className='p-3'>
      <div className='flex justify-between items-center'>
        <h1 className='text-2xl font-bold'>Quản lý khung giờ</h1>
        <button className="bg-green-800 p-3 text-white rounded-md hover:bg-cyan-600" onClick={()=>document.getElementById('my_modal_3').showModal()}>Thêm khung giờ</button>
            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                <form method='dialog' onSubmit={handleSubmit}>
                    {error && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                          {error}
                        </div>
                    )}
                      {success && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
                          {success}
                        </div>
                    )} 
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Tên khung giờ</label>
                        <input type="text" name='name' value={formTimeSlot.name} onChange={handleChange} className="w-full px-3 py-2 border rounded" required/>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Giờ bắt đầu</label>
                        <input type="datetime-local" name='start_time' value={formTimeSlot.start_time} onChange={handleChange} className="w-full px-3 py-2 border rounded" required/>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Giờ kết thúc</label>
                        <input type="datetime-local" name='end_time' value={formTimeSlot.end_time} onChange={handleChange} className="w-full px-3 py-2 border rounded" required/>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Trạng thái</label>
                        <input type="text" name='status' value={formTimeSlot.status} onChange={handleChange} className="w-full px-3 py-2 border rounded" required/>
                    </div>
                    <button type="submit"
                          className="w-full py-2 mt-4 text-white bg-green-800 rounded hover:bg-blue-600"
                        >
                          Thêm Sân Bóng
                    </button>
                </form>
              </div>
            </dialog>
      </div>
      <div className='mr-36'>
        <TableTimeSlot/>
      </div>
    </div>
  )
}

export default timeslotmanagement