import React from 'react'
import NvarbarAdmin from '../component/NvarbarAdmin'
import SidebarAdmin from '../component/SidebarAdmin'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div>
        <NvarbarAdmin/>
        <div>
            <aside className='w-72 bg-gray-200'>
                <SidebarAdmin/>
            </aside>
            <main className='flex-1 pl-6 justify-center h-full w-full '>
                {children}
            </main>
        </div>
    </div>
  )
}

export default layout