import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import { PUBLIC_BACKEND_URL } from "../../../constants";
import "./job-details.scss";
import { getData } from "../../../utils/apiHandle";
import ApplicationForm from "./applicationForm";
import PageHeader from "../../../components/PageHeader";

// type ToastStatus = "error" | "success";

interface CareerData {
  data: {
    jobTitle: string;
    jobDescription: string;
    jobSpecification: string;
  };
}

export default async function CareerDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  // const [data, setData] = useState<CareerData | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [selectedFile, setSelectedFile] = useState<File | null>(null);
  // const [jobDetail, setJobDetails] = useState<JobDetails>({
  //   fullName: "",
  //   email: "",
  //   contact: "",
  // });
  // const [errors, setErrors] = useState<ValidationErrors>({});

  // const { slug } = useParams<{ slug: string }>();

  // useEffect(() => {
  //   fetch(`${PUBLIC_BACKEND_URL}career/${slug}`)
  //     .then((res) => res.json())
  //     .then((data: CareerData) => {
  //       setData(data);
  //       setLoading(false);
  //     });
  // }, [slug]);

  // const handleInputChange =
  //   (name: keyof JobDetails) =>
  //   (event: React.ChangeEvent<HTMLInputElement>) => {
  //     setJobDetails({ ...jobDetail, [name]: event.target.value });
  //     setErrors({ ...errors, [name]: "" });
  //   };

  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = event.target.files ? event.target.files[0] : null;
  //   setSelectedFile(file);
  // };

  // const handleClick = async () => {
  //   const isValid = validationCheck();
  //   if (Object.keys(isValid).length === 0) {
  //     const formData = new FormData();
  //     formData.append("fullName", jobDetail.fullName);
  //     formData.append("email", jobDetail.email);
  //     formData.append("contact", jobDetail.contact);
  //     formData.append("position", data.data.jobTitle);
  //     if (selectedFile) {
  //       formData.append("cv", selectedFile);
  //     }
  //     const res = await fetch(`${PUBLIC_BACKEND_URL}public/jobdetail`, {
  //       method: "POST",
  //       body: formData,
  //     });
  //     const responseData = await res.json();
  //     if (res.ok) {
  //       setJobDetails({ fullName: "", email: "", contact: "" });
  //       Toast("Applied Successfully", "success");
  //     } else {
  //       setJobDetails({ fullName: "", email: "", contact: "" });
  //       Toast("Something went Wrong", "error");
  //     }
  //   } else {
  //     Object.keys(isValid).forEach((each) => {
  //       setJobDetails({ fullName: "", email: "", contact: "" });
  //       return Toast(isValid[each], "error");
  //     });
  //   }
  // };

  // const validationCheck = () => {
  //   const validationErrors: ValidationErrors = {};
  //   if (jobDetail.fullName === "" || jobDetail.fullName === null) {
  //     validationErrors.fullName = "Name is required";
  //   }
  //   if (jobDetail.email === "" || jobDetail.email === null) {
  //     validationErrors.email = "Email is required";
  //   }
  //   if (jobDetail.contact === "" || jobDetail.contact === null) {
  //     validationErrors.contact = "Contact is required";
  //   }
  //   return validationErrors;
  // };

  const data = await getData(`career/${slug}`);

  return (
    <>
      {/* <div className="career-home-main">
        <div className="career-home-frame">
          <div className="career-home-text">Careers</div>
          <p className="career-home-p">
            Join Our Team and Shape the Future of Technology
          </p>
        </div>
        <div className="design-baclground-main">
          <img
            src="/designleft.png"
            alt=""
            className="career-home-design-left"
          />
          <img
            src="/design-right.png"
            alt="Element"
            className="career-home-design-right"
          />
        </div>
      </div> */}

      <PageHeader
        title="Careers"
        description="Join our team and shape the future of technology."
      />

      <div className="job-details-main d-flex flex-wrap">
        {/* job description and specifications */}
        <div className="job-description col-lg-7 col-md-6 col-12">
          <div className="job-details">
            <div className="job-title">{data?.data?.title}</div>
            <p className="job-location">
              <i className="fa-solid fa-location-dot"></i> Jhamsikhel, Lalitpur
            </p>
            <div className="job-des">
              <div className="description-text">Job Description</div>
              <div
                className="pt-[0125rem] pr-[1.125rem] pb-[1.25rem] pl-[1.125rem] job-des-content"
                dangerouslySetInnerHTML={{ __html: data?.data?.description }}
              />
            </div>
            <div className="job-des">
              <div className="description-text">Job Specifications:</div>
              <div
                className="pt-[1.25rem] pr-[1.125rem] pb-[1.25rem] pl-[1.125rem] job-des-content"
                dangerouslySetInnerHTML={{
                  __html: data?.data?.specification,
                }}
              />
            </div>
          </div>
        </div>
        {/* job details form */}
        <ApplicationForm
          position={data?.data?.title}
          careerId={Number(data?.data?.id)}
        />
      </div>
      <ToastContainer position="bottom-right" />
    </>
  );
}
