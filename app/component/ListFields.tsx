// "use client";
// import React, { useEffect, useState } from 'react'
// import clsx from 'clsx';

// interface Soccer {
//   id:number;
//   name:string;
//   field_type:number;
//   status:string;
//   HinhAnh:string;
//   MoTa:string;
//   Price?:{
//     id:number;
//     name:string;
//     price:number;
//     status:string;
//     timeslot?:{
//       id:number;
//       name:string;
//       start_time:number;
//       end_time:number;
//       status:string;
//     }
//   }[]
// }
// interface Price {
//   id:number;
//   name:string;
// }
// interface TimeSlot {
//   id: number;
//   name: string;
//   start_time: string;
//   end_time: string;
//   status: string;
// }

// const ListFields:React.FC = () => {
//   const [soccers,setSoccers] = useState<Soccer[]>([]);
//   const [price,setPrices] = useState<Price[]>([]);
//   const [timeslots, setTimeslots] = useState<TimeSlot[]>([]);

  
//   useEffect(() => {
//     const fetchTimeSlot = async () => {
//       try {
//         const res = await fetch('/api/timeslot');
//         if (!res.ok) {
//           throw new Error(`Failed to fetch: ${res.statusText}`);
//         }
//         const data = await res.json();
//         console.log("Dữ liệu từ API TimeSlot", data);
  
//         // Kiểm tra nếu dữ liệu không phải mảng
//         if (Array.isArray(data.Timeslot)) {
//           setTimeslots(data.TimeSlot);
//         } else if (data && typeof data === 'object') {
//           // Nếu dữ liệu là object, chuyển thành mảng
//           setTimeslots([data.Timeslot]);
//         } else {
//           console.error('Dữ liệu không hợp lệ:', data);
//         }
//       } catch (error) {
//         console.error('Lỗi khi gọi API:', error);
//       }
//     };
  
//     fetchTimeSlot();
//   }, []);

  


//   useEffect(() => {
//     const fetchSoccers = async () => {
//       try {
//         const res = await fetch('/api/soccer');
//         if (!res.ok) {
//           throw new Error(`Failed to fetch: ${res.statusText}`);
//         }
//         const data = await res.json();
//         console.log("Dữ liệu từ api Sân bóng", data);
  
//         // Kiểm tra nếu dữ liệu không phải mảng
//         if (Array.isArray(data.Soccer)) {
//           setSoccers(data.Soccer);
//         } else if (data && typeof data === 'object') {
//           // Nếu dữ liệu là object, chuyển thành mảng
//           setSoccers([data.Soccer]);
//         } else {
//           console.error('Dữ liệu không hợp lệ:', data);
//         }
//       } catch (error) {
//         console.error('Lỗi khi gọi API:', error);
//       }
//     };
  
//     fetchSoccers();
//   }, []);

  
  
  

//   return (
//     <div className='p-10'>
//         <h1  className='ml-28 font-bold text-5xl py-10'>Danh sách sân bóng</h1>
//         <div className='flex flex-wrap justify-start gap-10 px-48'>
//         {soccers.length > 0 ? (
//             soccers.map((soccer) => (
              
//               <div
//                 key={soccer.id}
//                 className="flex p-6 w-full h-auto gap-10"
//               >
//                 <div>
//                 <img src={soccer.HinhAnh} alt={soccer.name} className="w-auto h-96 object-cover m-auto"/>
//                 </div>
//                 <div className='flex flex-col gap-2'>
//                   <div className='flex flex-col gap-5'>
//                     <h1 className='text-3xl font-semibold'>{soccer.name}</h1>
//                     <p className='text-blue-700 flex gap-1'>Thể loại: 
//                       <span className='text-black'>Sân bóng đá {soccer.field_type} người</span>
//                     </p>
//                     <p className='text-blue-700 flex gap-1'>Trạng thái: 
//                       <span className='text-black'>{soccer.status}</span>
//                     </p>
//                     <p className='text-blue-700 flex gap-1'>Mô tả: 
//                       <span className='text-black'>{soccer.MoTa}</span>
//                     </p>
//                   </div>
//                   <div className='flex gap-1 flex-wrap'>
//                       {timeslots.map((time)=>(
//                         <p key={time.id}>
//                           <span>{time.name}</span>
//                         </p>
//                       ))}
//                   </div>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>Không có dữ liệu để hiển thị</p>
//           )}
//         </div>
//     </div>
//   )
// }

// export default ListFields



"use client";
import React, { useEffect, useState } from "react";
import clsx from 'clsx';

interface Soccer {
  id: number;
  name: string;
  field_type: number;
  status: string;
  HinhAnh: string;
  MoTa: string;
}

interface TimeSlot {
  id: number;
  name: string;
  start_time: string;
  end_time: string;
  status: boolean;
}

const ListFields: React.FC = () => {
  const [soccers, setSoccers] = useState<Soccer[]>([]);
  const [timeslots, setTimeslots] = useState<TimeSlot[]>([]);

  // Fetch TimeSlot API
  useEffect(() => {
    const fetchTimeSlot = async () => {
      try {
        const res = await fetch("/api/timeslot");
        if (!res.ok) {
          throw new Error(`Failed to fetch timeslots: ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Dữ liệu từ API TimeSlot:", data);

        // Đảm bảo gán dữ liệu đúng định dạng
        if (data && data.Soccer && Array.isArray(data.Soccer)) {
          setTimeslots(data.Soccer); // Thay đổi nếu API thực sự trả về "Soccer" thay vì "TimeSlot"
        } else {
          console.error("Dữ liệu không hợp lệ (timeslots):", data);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API timeslots:", error);
      }
    };

    fetchTimeSlot();
  }, []);

  // Fetch Soccer API
  useEffect(() => {
    const fetchSoccers = async () => {
      try {
        const res = await fetch("/api/soccer");
        if (!res.ok) {
          throw new Error(`Failed to fetch soccers: ${res.statusText}`);
        }
        const data = await res.json();
        console.log("Dữ liệu từ API Sân bóng:", data);

        if (data && Array.isArray(data.Soccer)) {
          setSoccers(data.Soccer);
        } else {
          console.error("Dữ liệu không hợp lệ (soccers):", data);
        }
      } catch (error) {
        console.error("Lỗi khi gọi API soccers:", error);
      }
    };

    fetchSoccers();
  }, []);

  return (
    <div className="p-10">
      <h1 className="ml-28 font-bold text-5xl py-10">Danh sách sân bóng</h1>
      <div className="flex flex-wrap justify-start gap-10 px-48">
        {soccers.length > 0 ? (
          soccers.map((soccer) => (
            <div
              key={soccer.id}
              className="flex p-6 w-full h-auto gap-10 border rounded-lg shadow-md"
            >
              <div>
                <img
                  src={soccer.HinhAnh}
                  alt={soccer.name}
                  className="w-auto h-96 object-cover m-auto"
                />
              </div>
              <div className="flex flex-col gap-4">
                <h1 className="text-3xl font-semibold">{soccer.name}</h1>
                <p className="text-blue-700 flex gap-1">
                  Thể loại:{" "}
                  <span className="text-black">
                    Sân bóng đá {soccer.field_type} người
                  </span>
                </p>
                <p className="text-blue-700 flex gap-1">
                  Trạng thái:{" "}
                  <span className="text-black">{soccer.status}</span>
                </p>
                <p className="text-blue-700 flex gap-1">
                  Mô tả: <span className="text-black">{soccer.MoTa}</span>
                </p>
                <div className="flex flex-wrap gap-2 ">
                    {timeslots.map((time) => (
                      <span
                        key={time.id}
                        className={clsx(
                          "px-2 py-1 rounded-lg text-sm",
                          {
                            "bg-green-700 text-white hover:bg-blue-800": time.status === true, // Màu xanh nếu status là true
                            "bg-gray-200 text-gray-500": time.status === false, // Màu bạc nếu status là false
                          }
                        )}
                      >
                        {time.name}
                      </span>
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
  );
};

export default ListFields;

