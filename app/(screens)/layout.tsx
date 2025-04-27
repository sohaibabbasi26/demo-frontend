
import ForceLogoutModal from "../components/ui/common/ForceLogoutModal";
import Sidebar from "../components/ui/common/SidebarComponent";
import Image from "next/image";

export default function ScreensLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
     <ForceLogoutModal />
      {children}
    </>
  );
}
