"use client";
import React, { useEffect, useState } from "react";
import SidebarMenuItem from "./SidebarMenuItem";
import SidebarSubMenu from "./SidebarSubMenu";
import Logo from "./Logo";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { setUnauthorized } from "@/store/slices/AuthSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
const Sidebar: React.FC = () => {
  const pathname = usePathname();
  const dispatch=useDispatch()
  const [activeMenuItem, setActiveMenuItem] = useState("");
  const [activeSubMenuItem, setActiveSubMenuItem] = useState("");
  const [showUserManagement, setShowUserManagement] = useState(false);
  const router = useRouter();
  const menuItems = [
    {
      label: "Dashboard",
      darkIcon: "/svg/dashboard-dark.svg",
      lightIcon: "/svg/dashboard-light.svg",
      value: "dashboard",
    },
    {
      label: "Video Management",
      darkIcon: "/svg/video-management-dark.svg",
      lightIcon: "/svg/video-management-light.svg",
      value: "video-management",
    },
    {
      label: "Category Management",
      darkIcon: "/svg/category-management-dark.svg",
      lightIcon: "/svg/category-management-light.svg",
      value: "category-management",
    },
    {
      label: "User Management",
      darkIcon: "/svg/user-management-dark.svg",
      lightIcon: "/svg/user-management-light.svg",
      value: "user-management",
      hasSubMenu: true,
    },
    {
      label: "Content Analytics",
      darkIcon: "/svg/content-analytics-dark.svg",
      lightIcon: "/svg/content-analytics-light.svg",
      value: "content-analytics",
    },
  ];

  useEffect(() => {
    const matchingMenuItem = menuItems.find((item) =>
      pathname.includes(item.value)
    );
    if (matchingMenuItem) {
      setActiveMenuItem(matchingMenuItem.value);
      if (matchingMenuItem.value === "user-management") {
        setShowUserManagement(true);
        const subMenuPath = pathname.split("/").pop();
        if (subMenuPath !== "user-management") {
          setActiveMenuItem("");
        }
        setActiveSubMenuItem(subMenuPath || "");
      } else {
        setShowUserManagement(false);
      }
    }
  }, [pathname]);

  const handleSubMenuItemClick = (item: string) => {
    setActiveSubMenuItem(item);
    setActiveMenuItem("");
    router.push("/user-management/" + item);
  };

  const handleLogout=()=>{
    // dispatch(setUnauthorized(true));
    localStorage.removeItem("accessToken");
    Cookies.remove("accessToken")
document.cookie = "refreshToken=; path=/; max-age=0";
window.location.href = ("/login")
            window.location.reload();

   }
  return (
    <div className="bg-white  from-purple-400 to-pink-500 fixed left-0 top-0 min-h-screen flex flex-col shadow border-r">
      <div
        className="hidden md:flex items-center justify-center h-32"
        style={{
          backgroundImage: "url(/svg/gradient-bg.svg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Logo width={250} height={250} />
      </div>
      <div className="flex flex-col mt-6 space-y-1 p-4">
        {menuItems.map((item) => (
          <div key={item.value}>
            <SidebarMenuItem
              label={item.label}
              icon={
                item.value === activeMenuItem ? item.lightIcon : item.darkIcon
              }
              active={item.value === activeMenuItem}
              onClick={() => {
                if (item.value === "user-management") {
                  setShowUserManagement(true);
                } else {
                  setShowUserManagement(false);
                }
                setActiveSubMenuItem("");
                setActiveMenuItem(item.value);
                router.push(`/${item.value}`);
              }}
            />
            {item.value === "user-management" && showUserManagement && (
              <SidebarSubMenu
                activeSubMenuItem={activeSubMenuItem}
                onSubMenuItemClick={handleSubMenuItemClick}
              />
            )}
          </div>
        ))}
      </div>
      <div
        onClick={handleLogout}
        className="flex items-center space-x-2 py-3 px-8  bottom-24 text-gray-700 cursor-pointer"
      >
        <Image src="/svg/logout.svg" alt="Logout" width={20} height={20} />
        <span className="text-sm">Logout</span>
      </div>
    </div>
  );
};

export default Sidebar;
