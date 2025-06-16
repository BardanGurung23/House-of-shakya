import PageContent from "@/components/PageContent";
import {
  AiOutlineSearch,
  AiOutlineIdcard,
  AiOutlineSetting,
} from "react-icons/ai";
import { MdOutlineContactPhone } from "react-icons/md";
import { Link } from "react-router-dom";
import { useGetAllCountQuery } from "@/redux/services/authentication";
import {
  BANNER_LIST_ROUTE,
  BLOG_LIST_ROUTE,
  CONTACT_LIST_ROUTE,
  EMAIL_TEMPLATE_LIST_ROUTE,
  SEO_LIST_ROUTE,
  SETTINGS_ROUTE,
  SUBSCRIBERS_LIST_ROUTE,
} from "@/routes/routeNames";
import { checkViewAccessList } from "@/utils/accessHelper";
import { FaBlog } from "react-icons/fa";
import { GiKnightBanner } from "react-icons/gi";
import { useGetApiQuery } from "@/redux/services/crudApi";
import { CONTACT_URL } from "@/constants/apiUrlConstants";

export default function Dashboard() {
  const viewAccess = checkViewAccessList();
  const { data: allContact } = useGetApiQuery(`${CONTACT_URL}list`);

  return (
    <PageContent>
      {viewAccess.includes("Contact") && allContact?.data?.data?.length > 0 && (
        <div>
          <div className="mt-[2rem] text-left text-3xl font-bold mb-[1rem]">
            Contacts List
          </div>
          <div className="grid grid-cols-[1fr,3fr] bg-[#0090DD] p-2 text-white text-[1.125rem]">
            <div>Full Name</div>
            <div>Email</div>
          </div>
          <div className="">
            {allContact?.data?.data
              ?.slice(0, 5)
              .map(
                ({
                  full_name,
                  email,
                }: {
                  full_name: string;
                  email: string;
                }) => (
                  <Link
                    className="grid grid-cols-[1fr,3fr] bg-white p-2"
                    to={CONTACT_LIST_ROUTE}
                  >
                    <div>{full_name}</div>
                    <div>{email}</div>
                  </Link>
                ),
              )}
          </div>
        </div>
      )}
      <div className="mt-[2rem] text-left text-3xl font-bold">Quick Links</div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4  justify-center gap-[2rem] items-center py-[2rem]">
        {viewAccess.includes("Banner") && (
          <Link to={BANNER_LIST_ROUTE}>
            <div className="flex flex-col gap-[0.5rem] items-center text-xl font-normal border-[1px] p-[0.8rem] rounded-md lg:p-[2rem] hover:bg-[#ffffff]">
              <GiKnightBanner className="text-[3rem]" />
              <span>Banner</span>
            </div>
          </Link>
        )}

        {viewAccess.includes("SEO") && (
          <Link to={SEO_LIST_ROUTE}>
            <div className="flex flex-col gap-[0.5rem] items-center text-xl font-normal border-[1px] p-[0.8rem] rounded-md lg:p-[2rem] hover:bg-[#ffffff]">
              <AiOutlineSearch className="text-[3rem]" />
              <span>SEO</span>
            </div>
          </Link>
        )}

        {viewAccess.includes("Email Template") && (
          <Link to={EMAIL_TEMPLATE_LIST_ROUTE}>
            <div className="flex flex-col gap-[0.5rem] items-center text-xl font-normal border-[1px] p-[0.8rem] rounded-md lg:p-[2rem] hover:bg-[#ffffff]">
              <AiOutlineIdcard className="text-[3rem]" />
              <span>Email Templates</span>
            </div>
          </Link>
        )}

        {viewAccess.includes("Company Settings") && (
          <Link to={SETTINGS_ROUTE}>
            <div className="flex flex-col gap-[0.5rem] items-center text-xl font-normal border-[1px] p-[0.8rem] rounded-md lg:p-[2rem] hover:bg-[#ffffff]">
              <AiOutlineSetting className="text-[3rem]" />
              <span>Settings</span>
            </div>
          </Link>
        )}
        {viewAccess.includes("Contact") && (
          <Link to={CONTACT_LIST_ROUTE}>
            <div className="flex flex-col gap-[0.5rem] items-center text-xl font-normal border-[1px] p-[0.8rem] rounded-md lg:p-[2rem] hover:bg-[#ffffff]">
              <MdOutlineContactPhone className="text-[3rem]" />
              <span>Contact Inquiry</span>
            </div>
          </Link>
        )}
        {viewAccess.includes("Subscriber") && (
          <Link to={SUBSCRIBERS_LIST_ROUTE}>
            <div className="flex flex-col gap-[0.5rem] items-center text-xl font-normal border-[1px] p-[0.8rem] rounded-md lg:p-[2rem] hover:bg-[#ffffff]">
              <MdOutlineContactPhone className="text-[3rem]" />
              <span>Subscribers</span>
            </div>
          </Link>
        )}
        {viewAccess.includes("Blog") && (
          <Link to={BLOG_LIST_ROUTE}>
            <div className="flex flex-col gap-[0.5rem] items-center text-xl font-normal border-[1px] p-[0.8rem] rounded-md lg:p-[2rem] hover:bg-[#ffffff]">
              <FaBlog className="text-[3rem]" />
              <span>Blogs</span>
            </div>
          </Link>
        )}
      </div>
    </PageContent>
  );
}
