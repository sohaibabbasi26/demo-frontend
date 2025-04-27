"use client";
import { UserTable } from "@/app/components/ui/user/UserTable";
import Sidebar from "@/app/components/ui/common/SidebarComponent";

const UserManagement = () => {


  return (<div className="flex">
    <div className='w-64 flex-shrink-0'><Sidebar/></div>
    <div className='flex-grow px-4 mt-[100px] border-t border-borderTop'>
    <UserTable subscriptionType="All" userType="List of Users"/>
    </div>
  </div>);
};

export default UserManagement;
