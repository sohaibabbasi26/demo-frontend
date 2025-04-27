import { UserTable } from '@/app/components/ui/user/UserTable';
import React from 'react'
import Sidebar from '@/app/components/ui/common/SidebarComponent';
const PremiumUser = () => {
  return (

    <div className="flex">
    <div className='w-64 flex-shrink-0'><Sidebar/></div>
    <div className='flex-grow px-4 mt-[100px] border-t border-borderTop'>
    <UserTable subscriptionType="Premium" userType='Premium Users'/>
    </div>
  </div>
      
    
  )
}

export default PremiumUser