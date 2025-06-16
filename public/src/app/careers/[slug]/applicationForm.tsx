"use client";
import React, { useState } from "react";
import { PUBLIC_BACKEND_URL } from "../../../constants";
import { toast } from "react-toastify";

interface JobDetails {
  fullName: string;
  email: string;
  mobile_no: string;
}

interface ValidationErrors {
  fullName?: string;
  email?: string;
  mobile_no?: string;
}
const Toast = (message, status) => {
  if (status === "error") {
    toast.error(message, { position: "bottom-right" });
  } else {
    toast.success(message, { position: "bottom-right" });
  }
};

export default function ApplicationForm({ position, careerId }) {
  //   const [data, setData] = useState<CareerData | null>(null);
  //   const [loading, setLoading] = useState<boolean>(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [jobDetail, setJobDetails] = useState<JobDetails>({
    fullName: "",
    email: "",
    mobile_no: "",
  });
  const [errors, setErrors] = useState<ValidationErrors>({});

  const handleInputChange =
    (name: keyof JobDetails) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setJobDetails({ ...jobDetail, [name]: event.target.value });
      setErrors({ ...errors, [name]: "" });
    };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    setSelectedFile(file);
  };

  const validationCheck = () => {
    const validationErrors: ValidationErrors = {};
    if (jobDetail.fullName === "" || jobDetail.fullName === null) {
      validationErrors.fullName = "Name is required";
    }
    if (jobDetail.email === "" || jobDetail.email === null) {
      validationErrors.email = "Email is required";
    }
    if (jobDetail.mobile_no === "" || jobDetail.mobile_no === null) {
      validationErrors.mobile_no = "Contact is required";
    }
    return validationErrors;
  };

  const handleClick = async () => {
    const isValid = validationCheck();
    if (Object.keys(isValid).length === 0) {
      const formData = new FormData();
      formData.append("cv", selectedFile);
      formData.append("name", jobDetail.fullName);
      formData.append("mediaCategoryId", "485");

      const mediaRes = await fetch(`${PUBLIC_BACKEND_URL}media/upload-cv`, {
        method: "POST",
        body: formData,
      });

      const result = await mediaRes.json();

      const cvPath = result.data.path;

      formData.delete("cv");
      formData.append("fullName", jobDetail.fullName);
      formData.append("email", jobDetail.email);
      formData.append("mobile_no", jobDetail.mobile_no);
      formData.append("cv_path", cvPath);
      formData.append("careerId", careerId);

      const res = await fetch(`${PUBLIC_BACKEND_URL}applicant`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName: jobDetail.fullName,
          email: jobDetail.email,
          mobile_no: jobDetail.mobile_no,
          cv_path: cvPath,
          careerId: careerId,
        }),
      });
      const responseData = await res.json();
      if (responseData.success) {
        setJobDetails({ fullName: "", email: "", mobile_no: "" });
        Toast("Applied Successfully", "success");
      } else {
        setJobDetails({ fullName: "", email: "", mobile_no: "" });
        Toast(responseData.msg, "error");
      }
    } else {
      Object.keys(isValid).forEach((each) => {
        setJobDetails({ fullName: "", email: "", mobile_no: "" });
        return Toast(isValid[each], "error");
      });
    }
  };

  return (
    <div className="job-form col-lg-5 col-md-6">
      <div className="job-form-section">
        <div className="job-application-text">Job Application Form</div>
        <div className="job-form-frame">
          <div className="jon-name">
            <label htmlFor="fullName" className="job-label-field">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Full name"
              className="job-input-field"
              value={jobDetail.fullName}
              onChange={handleInputChange("fullName")}
            />
          </div>
          <div className="jon-name">
            <label htmlFor="email" className="job-label-field">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Your email address"
              className="job-input-field"
              value={jobDetail.email}
              onChange={handleInputChange("email")}
            />
          </div>
          <div className="jon-name">
            <label htmlFor="mobile_no" className="job-label-field">
              Contact Number
            </label>
            <input
              type="number"
              placeholder="Contact number"
              className="job-input-field"
              value={jobDetail.mobile_no}
              onChange={handleInputChange("mobile_no")}
            />
          </div>
          <div className="jon-name">
            <label htmlFor="position" className="job-label-field">
              Position
            </label>
            <input
              type="text"
              placeholder="Position"
              className="job-input-field"
              value={position}
              disabled
            />
          </div>
          <div className="jon-name">
            <label htmlFor="cv" className="job-label-field">
              CV/Resume
            </label>
            <input
              type="file"
              placeholder=".."
              className="job-file"
              onChange={handleFileChange}
            />
          </div>
          <div className="job-submit text-center">
            <button
              className="job-application-button"
              onClick={() => handleClick()}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
