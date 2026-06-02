import {
  MdDisplaySettings,
  MdFeedback,
  MdOutlineContactPhone,
  MdOutlineFactCheck,
  MdOutlineMailOutline,
  MdOutlinePermMedia,
  MdOutlinePerson,
  MdOutlineSettings,
  MdPeopleAlt,
} from "react-icons/md";
import { RiSeoLine } from "react-icons/ri";
import { GiKnightBanner } from "react-icons/gi";

import { GrServices, GrTechnology } from "react-icons/gr";
import { AiFillPropertySafety } from "react-icons/ai";
import { SiHomepage } from "react-icons/si";
import { FaBlog, FaBriefcase } from "react-icons/fa";
import { TbLogs } from "react-icons/tb";
import { HiNewspaper } from "react-icons/hi";

export type SideListMenuType = {
  key: number;
  name: string;
  icon: React.ReactNode;
  path?: string;
  menu?: SideListMenuType[];
};

export const SideMenuList: SideListMenuType[] = [
  {
    key: 1,
    name: "Banner",
    path: "/admin/banner/list",
    icon: <GiKnightBanner />,
  },
  {
    key: 2,
    name: "Property",
    path: "/admin/property/list",
    icon: <GrServices />,
  },
  {
    key: 3,
    name: "Property Category",
    path: "/admin/property-category/list",
    icon: <GrServices />,
  },
  {
    key: 4,
    name: "Project Category",
    path: "/admin/project-category/list",
    icon: <GrServices />,
  },
  {
    key: 5,
    name: "Projects",
    path: "/admin/projects/list",
    icon: <AiFillPropertySafety />,
  },
  {
    key: 6,
    name: "Media",
    path: "/admin/media-category/list",
    icon: <MdOutlinePermMedia />,
  },
  {
    key: 9,
    name: "Contact",
    icon: <MdOutlineContactPhone />,
    path: "/admin/contact",
  },
  {
    key: 10,
    name: "Enquires",
    icon: <MdOutlineContactPhone />,
    path: "/admin/enquire/list",
  },
  {
    key: 11,
    name: "Subscriber",
    icon: <HiNewspaper />,
    path: "/admin/subscriber",
  },
  {
    key: 12,
    name: "Email Template",
    path: "/admin/email-template/list",
    icon: <MdOutlineMailOutline />,
  },
  {
    key: 13,
    name: "Settings",
    icon: <MdOutlineSettings />,
    menu: [
      {
        key: 13.1,
        name: "Users",
        path: "/admin/auth/list",
        icon: <MdOutlinePerson />,
      },
      {
        key: 13.2,
        name: "Roles",
        path: "/admin/roles/list",
        icon: <MdOutlineFactCheck />,
      },
      {
        key: 13.3,
        name: "Company Settings",
        path: "/admin/settings/list",
        icon: <MdDisplaySettings />,
      },
      {
        key: 13.4,
        name: "Email SMTP",
        path: "/admin/smtp",
        icon: <MdOutlineMailOutline />,
      },
      {
        key: 13.5,
        name: "SEO",
        icon: <RiSeoLine />,
        path: "/admin/seo/list",
      },
      {
        key: 13.6,
        name: "Pages",
        path: "/admin/pages/list",
        icon: <SiHomepage />,
      },
    ],
  },
];
