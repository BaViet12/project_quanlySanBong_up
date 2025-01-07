'use client';
import { usePathname,useRouter } from 'next/navigation';
import { TbSoccerField } from "react-icons/tb";
import { IoTimerOutline } from "react-icons/io5";
import { GiReceiveMoney } from "react-icons/gi";
import React from 'react'

interface SidebarLink {
  icon : React.ReactElement; 
  href : string;
  label : string;
}

const SidebarAdmin:React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const sidebarLink:SidebarLink[] = [
    {
      icon:<TbSoccerField />,
      href:"/admin/fieldmanagement",
      label:"Quản lý Sân Bóng",
    },
    {
      icon:<IoTimerOutline />,
      href:"/admin/timeslotmanagement",
      label:"Quản lý Giờ",
    },
    {
      icon:<GiReceiveMoney />,
      href:"/admin/pricemanagement",
      label:"Quản lý Giá",
    }
  ]
  const isActivePath = (path:string) => pathname === path;
  const handleNavigation = (href:string) => {
    router.push(href);
  };
  return (
    <div className='flex flex-col h-full w-72 fixed'>
        <div className="collapse collapse-arrow w-64 m-6 bg-slate-400">
          <input type="checkbox" name="my-accordion-2" />
            <div className="collapse-title text-black flex justify-center font-medium">
              Quản Lý
            </div>
            <div className="collapse-content">
              <ul className="">
                {sidebarLink.map((link) => (
                  <li key={link.href} className="my-5 pl-4">
                    <button
                      onClick={() => handleNavigation(link.href)}
                      className={`block pl-7 pr-7 py-2 rounded-lg transition-colors ${
                        isActivePath(link.href)
                          ? "bg-green-800 text-white"
                          : "text-black hover:bg-green-900 hover:text-white"
                      }`}
                    >
                    <div className="absolute left-9">{link.icon}</div> 
                    <div className="text-lg">{link.label}</div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
      </div>
    </div>
  )
}

export default SidebarAdmin