import React from 'react';

interface SidebarSubMenuProps {
  activeSubMenuItem: string;
  onSubMenuItemClick: (item: string) => void;
}

const SidebarSubMenu: React.FC<SidebarSubMenuProps> = ({
  activeSubMenuItem,
  onSubMenuItemClick,
}) => {
  return (
    <div className="w-full text-sm mt-1">
      <div
        className={`cursor-pointer px-8 text-right py-2 rounded-md ${
          activeSubMenuItem === 'standard-plan-users' ? 'bg-[#BB90F0] text-white' : 'text-gray-700'
        }`}
        onClick={() => onSubMenuItemClick('standard-plan-users')}
      >
        Standard Plan Users
      </div>
      <div
        className={`cursor-pointer px-8 text-right py-2 rounded-md ${
          activeSubMenuItem === 'premium-plan-users' ? 'bg-[#BB90F0] text-white' : 'text-gray-700'
        }`}
        onClick={() => onSubMenuItemClick('premium-plan-users')}
      >
        Premium Plan Users
      </div>
    </div>
  );
};

export default SidebarSubMenu;
