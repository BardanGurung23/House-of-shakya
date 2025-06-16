import "./career.scss";
import BenefitAtTechnirvana from "./benefit";
import HiringProcess from "./hiring";
import { PUBLIC_BACKEND_URL } from "../../constants";
import Link from "next/link";
import { metadata } from "../layout";
import "../styles/font.scss";
import "../styles/layout.scss";
import JobCard from "./_components/JobCard";
import { useEffect, useState } from "react";
import { getMetadata } from "../../utils/getMetadata";
import { getData } from "../../utils/apiHandle";
import PageHeader from "../../components/PageHeader";

interface CareerItem {
  id: number;
  jobTitle: string;
  jobType: string;
  location: string;
  slug: string;
}

export async function generateMetadata() {
  return await getMetadata("careers");
}

// async function getData(): Promise<{ data: { career: CareerItem[] } }> {
//   const data = await fetch(`${PUBLIC_BACKEND_URL}career/list`, {
//     cache: "no-store",
//   });
//   console.log(data, "--------------------");
//   if (data.ok) {
//     return data.json();
//   } else {
//     return { data: { career: [] } };
//   }
// }

const Page: React.FC = async () => {
  // const res = await getData();
  // const [res, setRes] = useState<any>();
  // useEffect(() => {
  //   fetch(`${PUBLIC_BACKEND_URL}career`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setRes(data);
  //     });
  // }, []);

  const data = await getData("career/list");
  const openings = data.data.data;
  return (
    <>
      {/* careers section */}
      <PageHeader
        title="Careers"
        description="Join our team and shape the future of technology."
      />

      {/* benefit section */}
      <div className="vacancy-join-our-team">
        <Link href="#benifit" className="vacancy-wrapper text-decoration-no">
          <span>Benefits at Nirvana</span>
        </Link>
        {openings && openings.length > 0 && (
          <Link
            href="#vacancy"
            className="vacancy-wrapper text-decoration-none"
          >
            <span>Current Vacancies</span>
          </Link>
        )}
        <Link href="#hiring" className="vacancy-wrapper text-decoration-none">
          <span>Hiring Process</span>
        </Link>
      </div>
      <BenefitAtTechnirvana />

      {/* vacancies */}
      {openings && openings.length > 0 && (
        <div className="current-vacancies" id="vacancy">
          <div className="vacancy-text">Current Openings</div>
          <span className="vacancy-text-2">
            Find exciting career opportunities at Tech Nirvana and become a part
            of us in shaping the future of technology to make a global impact.
          </span>
          {openings.map((each: CareerItem, index: number) => (
            <>
              <JobCard data={each} />
              {index !== openings.length - 1 && <hr />}
            </>
          ))}
        </div>
      )}

      <div id="hiring">
        <HiringProcess />
      </div>
    </>
  );
};

export default Page;
