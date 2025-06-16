import { Outlet } from "react-router-dom";
import SideMenu from "./sideMenu";
import TopMenu from "./topMenu";
import TopMenuMobile from "./topMenuMobile";
import useWebSocket from "@/hooks/useWebSocket";
import { useEffect } from "react";

export default function Layout() {
  const { connect } = useWebSocket();

  // useEffect(() => {
  //   connect();
  // }, []);

  return (
    <>
      {/* For Desktop View */}
      <div className="hidden lg:flex bg-[#F8F7FA]">
        {/* Side Menu */}
        <div className="w-[18%] h-screen fixed shadow-lg shadow-gray-400">
          <SideMenu />
        </div>
        <div className="flex-1 flex flex-col h-screen w-screen ml-[18%]">
          {/* Main Content */}
          <div>
            <TopMenu />
          </div>
          {/* Page content */}
          <div className="flex-1 px-[1.5rem] py-[1rem] overflow-auto">
            <Outlet />
          </div>
        </div>
      </div>
      {/* for Mobile View */}
      <div className="block lg:hidden ">
        <TopMenuMobile />

        {/* Page content */}
        <div className="flex-1 p-4 overflow-auto min-h-[87vh]">
          <Outlet />
        </div>
      </div>
    </>
  );
}
