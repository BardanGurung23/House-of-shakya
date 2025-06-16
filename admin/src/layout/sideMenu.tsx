import {
  MdFilterList,
  MdKeyboardArrowRight,
  MdOutlineDashboard,
} from "react-icons/md";
import Logo from "../assets/logo.png";
import { SideListMenuType, SideMenuList } from "./sideMenuList";
import { SetStateAction, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { checkViewAccessList } from "@/utils/accessHelper";
import { useGetSettingQuery } from "@/redux/services/settings";
import { IMAGE_BASE_URL } from "@/constants";
export default function SideMenu({
  setToggleState,
}: Readonly<{
  setToggleState?: React.Dispatch<SetStateAction<boolean>>;
}>) {
  const location = useLocation();
  const currentPath = location.pathname.split("/");
  const navigate = useNavigate();
  const viewAccess = checkViewAccessList();
  const [isVisible, setIsVisible] = useState<number[]>([]);
  const [isActive, setIsActive] = useState<string | null>(null);

  const { data: settings } = useGetSettingQuery("");

  console.log(settings);
  const brandingImage = settings?.data?.brandingImage;

  console.log(IMAGE_BASE_URL + brandingImage, "image path");

  const handleClick = (key: number) => {
    setIsVisible((prev) => {
      if (prev.includes(key)) {
        return prev.filter((each) => each !== key);
      } else {
        return [...prev, key];
      }
    });
  };

  const handleNavigate = (name: string, path?: string) => {
    setIsActive(name);
    navigate(path ? path : "");
    if (setToggleState) {
      setToggleState(false);
    }
  };
  return (
    <div className="w-full h-full bg-white pt-[7px] px-[12px] overflow-y-auto">
      {/* logo section */}
      <img
        crossOrigin="anonymous"
        src={`${
          brandingImage?.startsWith("/techlogo.webp")
            ? Logo
            : IMAGE_BASE_URL + brandingImage
        }`}
        alt="Logo"
        className="w-full h-[59px] mx-auto object-contain"
      />
      <div className="flex flex-col gap-[6px] mt-[6px]">
        {/* Dashboard */}
        <div
          className={`${
            currentPath.includes("dashboard")
              ? "bg-gradient-to-r from-[#0190dd] to-[#80c7ee] text-white"
              : ""
          } hover:bg-gradient-to-r hover:from-[#0190dd] hover:to-[#80c7ee] hover:text-white flex justify-between items-center rounded-[0.25rem] py-[0.5rem] px-[0.75rem] cursor-pointer mt-[0.5rem]`}
          onClick={() => handleNavigate("dashboard", "/admin/dashboard")}
        >
          <div className="flex items-center gap-[0.5rem]">
            <div className="h-[22px] w-[22px] flex-1 flex items-center">
              <MdOutlineDashboard />
            </div>
            <p className="font-[400] text-[1rem]">Dashboard</p>
          </div>
        </div>
        <div
          className={`${
            currentPath.includes("approve-request")
              ? "bg-gradient-to-r from-[#0190dd] to-[#80c7ee] text-white"
              : ""
          } hover:bg-gradient-to-r hover:from-[#0190dd] hover:to-[#80c7ee] hover:text-white flex justify-between items-center rounded-[0.25rem] py-[0.5rem] px-[0.75rem] cursor-pointer mt-[0.5rem]`}
          onClick={() => handleNavigate("request", "/admin/approve-request")}
        >
          <div className="flex items-center gap-[0.5rem]">
            <div className="h-[22px] w-[22px] flex-1 flex items-center">
              <MdFilterList />
            </div>
            <p className="font-[400] text-[1rem]">Request</p>
          </div>
        </div>
        {/* Apps and Pages */}
        <p className="text-[#ACAAB1] font-[400] text-[13px] mt-[1rem] text-start">
          APPS & PAGES
        </p>
        {console.log(SideMenuList)}
        {SideMenuList.map((each: SideListMenuType, index) => {
          const subMenuList = each.menu
            ? each.menu.map((each) => each.name)
            : [each.name];
          return (
            <>
              {each.menu ? (
                subMenuList.some((item) => viewAccess.includes(item)) && (
                  <div
                    className="text-[#2F2B3D] bg-[#EEEEEF] flex justify-between items-center rounded-[0.25rem] py-[0.5rem] px-[0.75rem] cursor-pointer"
                    onClick={() => {
                      if (each.path) {
                        handleNavigate(each.name, each.path);
                      } else {
                        handleClick(each.key);
                      }
                    }}
                  >
                    {/* Primary menu */}
                    <div className="flex items-center gap-[0.5rem]">
                      <div className="h-[22px] w-[22px] flex items-center">
                        {each.icon}
                      </div>
                      <p className="font-[400] text-[1rem] text-start">
                        {each.name}
                      </p>
                    </div>
                    <div>
                      <MdKeyboardArrowRight
                        className={`${
                          isVisible.includes(each.key) ? "rotate-[90deg]" : ""
                        }`}
                      />
                    </div>
                  </div>
                )
              ) : (
                <>
                  {viewAccess.includes(each.name) && (
                    <div
                      className={`text-[#2F2B3D] bg-[#EEEEEF] flex justify-between items-center rounded-[0.25rem] py-[0.5rem] px-[0.75rem] hover:text-white hover:bg-gradient-to-r hover:from-[#0190dd] hover:to-[#80c7ee] cursor-pointer ${
                        currentPath.includes(each.name.toLowerCase()) ||
                        currentPath.includes(
                          each.name.toLowerCase() + "-category"
                        )
                          ? "bg-gradient-to-r from-[#0190dd] to-[#80c7ee] text-white"
                          : ""
                      }`}
                      onClick={() => {
                        if (each.path) {
                          handleNavigate(each.name, each.path);
                        } else {
                          handleClick(each.key);
                        }
                      }}
                    >
                      {/* Primary menu */}
                      <div className="flex items-center gap-[0.5rem]">
                        <div className="h-[22px] w-[22px] flex items-center">
                          {each.icon}
                        </div>
                        <p className="font-[400] text-[1rem] text-start">
                          {each.name}
                        </p>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* sub menu */}
              {/* {console.log(JSON.stringify(subMenuList))} */}
              {each.menu &&
                isVisible.includes(each.key) &&
                each.menu.map((item, index) => (
                  <>
                    {viewAccess.includes(item.name) && (
                      <div
                        key={index}
                        className="space-y-[0.25rem] mt-[0.25rem]"
                      >
                        <div
                          key={index}
                          className={`flex items-center gap-[0.5rem] text-[#2F2B3D] hover:text-white px-[1.5rem] py-[0.5rem] rounded-[0.25rem] cursor-pointer hover:bg-gradient-to-r hover:from-[#0190dd] hover:to-[#80c7ee] ${
                            isActive === item.name ||
                            currentPath.includes(item.name.toLowerCase())
                              ? "bg-gradient-to-r from-[#0190dd] to-[#80c7ee] text-white"
                              : ""
                          }`}
                          onClick={() => handleNavigate(item.name, item.path)}
                        >
                          <div className="h-[22px] w-[22px] flex items-center">
                            {item.icon}
                          </div>
                          <p className="font-[400] text-[1rem] text-start">
                            {item.name}
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                ))}
            </>
          );
        })}
      </div>
    </div>
  );
}
