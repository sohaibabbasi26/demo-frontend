"use client"

import CategoryTable from '@/app/components/ui/category/CategoryTable'
import React from 'react'
import Sidebar from '@/app/components/ui/common/SidebarComponent'

const CategoryManagement = () => {



  
  return (
  <div className='flex'>

<div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
<div className="flex-grow px-4 mt-[100px] border-t border-borderTop">    <CategoryTable />
</div>
  </div>

  )
}

export default CategoryManagement