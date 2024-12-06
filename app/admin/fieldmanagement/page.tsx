"use client";
import TableFields from '@/app/component/TableFields'
import React, { useState } from 'react'
import {FileUpLoad} from "@/app/component/FileUpLoad"

interface FormDataField {
  name:string;
  field_type:string;
  status:string;
  HinhAnh:string;
  MoTa:string;
}


const fieldmanagement = () => {
  const initialFormData:FormDataField = {
    name: '',
    field_type: '',
    status:'HOATDONG',
    HinhAnh:'',
    MoTa:'',
  };
  const [formData,setFormData] = useState<FormDataField>(initialFormData);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [reloadKey, setReloadKey] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const refreshData = () => {
    setReloadKey((prevKey) => prevKey + 1);
  };

  const handleChange = (e:any) => {
    const {name,value} = e.target;
    setFormData(prev =>({
      ...prev,
      [name]:value,
    }))
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    console.log("Form Data",formData);
    try {
      const response = await fetch('/api/soccer',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body : JSON.stringify({...formData, HinhAnh: imageUrl}),
      });
      if(!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Tạo sân bóng thất bại');
      }
      const data = await response.json();
      setSuccess(data.message || 'Tạo sân bóng thành công');
      setFormData(initialFormData);
      setImageUrl('');
      refreshData();

    } catch (err) {
      setError(err instanceof Error ? err.message:'Lỗi tạo sân bóng');
      console.error('Lỗi tạo sân bóng',err);
    }
  }

  return (
    <div className='p-2 w-full h-full ml-7' data-theme="light">
        <div className='flex w-full justify-between p-3 items-center'>
            <h1 className='text-2xl font-bold py-3'>Quản lý sân bóng</h1>
            <div className='mr-10'>
              <button className="btn bg-green-800" onClick={()=>document.getElementById('my_modal_3').showModal()}>Thêm sân bóng</button>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog">
                      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg mb-5">Thêm sân bóng</h3>
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
                        <label className='block text-gray-700'>Tên sân</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className='w-full px-3 py-2 border rounded'
                        />
                      </div>
                      <div className='mb-4'>
                        <label className='block text-gray-700'>Loại sân</label>
                        <input 
                          type="text" 
                          name="field_type"
                          value={formData.field_type}
                          onChange={handleChange}
                          className='w-full px-3 py-2 border rounded'
                        />
                      </div>
                      <div className='mb-4'>
                        <label className='block text-gray-700'>Trạng thái</label>
                        <input 
                          type="text" 
                          name="status"
                          value={formData.status}
                          onChange={handleChange}
                          className='w-full px-3 py-2 border rounded'
                        />
                      </div>   
                      <div className='mb-4'>
                        <label className='block text-gray-700'>Hình ảnh</label>
                        <FileUpLoad 
                        endpoint='imageUploader'
                        onChange={(url) => setImageUrl(url || '')}
                        showUpload={!imageUrl}
                      />
                        {imageUrl && (
                            <div className="mt-2 flex flex-col items-center">
                              <img src={imageUrl} alt="Uploaded" className="max-w-xs max-h-48" />
                              <button 
                                type="button" 
                                onClick={() => setImageUrl('')} 
                                className="mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                      </div>
                      <div className='mb-4'>
                        <label className='block text-gray-700'>Mô tả</label>
                        <input 
                          type="text" 
                          name="MoTa"
                          value={formData.MoTa}
                          onChange={handleChange}
                          className='w-full px-3 py-2 border rounded'
                        />
                      </div>
                      <button type='submit' className='w-full py-2 mt-4 text-white bg-green-800 rounded hover:bg-blue-600'>
                        Thêm sân bóng
                      </button>
                    </form>
                  </div>
                </dialog>
            </div>
        </div>
        <div className='mr-32'>
            <TableFields/>
        </div>
    </div>
  )
}

export default fieldmanagement