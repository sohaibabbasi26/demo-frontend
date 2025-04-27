import React from 'react';
import Image from 'next/image';

interface SidebarMenuItemProps {
  label: string;
  icon: string; 
  active: boolean;
  onClick: () => void; 

}

const SidebarMenuItem: React.FC<SidebarMenuItemProps> = ({ label, icon, active, onClick }) => {
  return (
    <div
      className={`flex items-center rounded-md space-x-2 py-3 px-4  cursor-pointer ${
        active ? 'bg-[#BB90F0] text-white' : 'text-gray-700'
      }`}
      onClick={onClick}
    >
      <Image src={icon} alt={label} width={20} height={20} />
      <span className='text-xs lg:text-sm'>{label}</span>

    </div>
  );
};

export default SidebarMenuItem;
