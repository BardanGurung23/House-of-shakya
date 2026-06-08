import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { ENQUIRE_URL } from "@/constants/apiUrlConstants";
import { useGetApiQuery } from "@/redux/services/crudApi";
import { RiSeoLine } from "react-icons/ri";

const getAgentName = (agent?: {
  firstName?: string | null;
  lastName?: string | null;
  email?: string | null;
}) => {
  const name = [agent?.firstName, agent?.lastName].filter(Boolean).join(" ");
  return name || agent?.email || "-";
};

export default function ViewEnquire({ id }: { id: number | null }) {
  const {
    data: enquireData,
    isSuccess: success,
    isLoading: loading,
  } = useGetApiQuery(`${ENQUIRE_URL}${id}`, {
    skip: id === null || id === undefined,
  });
  return (
    <div>
      {/* Tab Section */}
      <div className="flex mt-[4rem] mb-[1.5rem]">
        <p className="flex items-center gap-[6px] px-[20px] py-[8px] rounded-[0.25rem] bg-primaryColor text-white">
          <RiSeoLine />
          <p className="font-[500] text-[15px]">Enquire</p>
        </p>
      </div>
      {loading ? (
        <>Loading </>
      ) : (
        <div className="flex gap-[1.5rem] mb-[2.5rem]">
          <form className="grid grid-cols-1 gap-[1.5rem] w-full">
            <Input
              label="Name"
              type="text"
              value={enquireData?.data?.full_name}
              disabled
            />
            <Input
              label="Email"
              type="text"
              value={enquireData?.data?.email}
              disabled
            />
            <Input
              label="Property"
              type="text"
              value={enquireData?.data?.property?.name || "-"}
              disabled
            />
            <Input
              label="Agent"
              type="text"
              value={getAgentName(enquireData?.data?.agent)}
              disabled
            />
            <Input
              label="Agent Phone"
              type="text"
              value={enquireData?.data?.agent?.mobileNo || "-"}
              disabled
            />
            {/* <Input
              label="Subject"
              type="text"
              value={enquireData?.data?.subject}
              disabled
            /> */}
            <TextArea
              label="Message"
              value={enquireData?.data?.message}
              disabled
            />
          </form>
        </div>
      )}
    </div>
  );
}
