"use client";
import React, { useState } from "react";
import "./contact.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PUBLIC_BACKEND_URL } from "../../constants";

interface ContactData {
  full_name: string;
  email: string;
  message: string;
}

interface ValidationError {
  [key: string]: string;
}

const Toast = (message: string, status: "error" | "success") => {
  if (status === "error") {
    toast.error(message, { position: "bottom-right" });
  } else {
    toast.success(message, { position: "bottom-right" });
  }
};

const Contact: React.FC = () => {
  const [contact, setContact] = useState<ContactData>({
    full_name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<ValidationError>({
    full_name: "",
    email: "",
    message: "",
  });
  const [message, setMessage] = useState<string | null>(null);

  const handleInputChange =
    (full_name: string) =>
    (
      event:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => {
      setContact({ ...contact, [full_name]: event.target.value });
      setErrors({ ...errors, [full_name]: "" });
    };

  const handleClick = async () => {
    const isValid = validationCheck();
    if (Object.keys(isValid).length === 0) {
      const res = await fetch(`${PUBLIC_BACKEND_URL}contact`, {
        method: "POST",
        body: JSON.stringify(contact),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (res.ok) {
        setContact({ full_name: "", email: "", message: "" });
        Toast("Message sent Successfully", "success");
      } else {
        setContact({ full_name: "", email: "", message: "" });
        Toast("Something went Wrong", "error");
      }
    } else {
      Object.keys(isValid).map((each) => {
        setContact({ full_name: "", email: "", message: "" });
        return Toast(isValid[each], "error");
      });
    }
  };

  const validationCheck = (): ValidationError => {
    const validationErrors: ValidationError = {};
    if (contact.full_name === "" || contact.full_name === null) {
      validationErrors["full_name"] = "full_Name is required";
    }
    if (contact.email === "" || contact.email === null) {
      validationErrors["email"] = "Email is required";
    }
    if (contact.message === "" || contact.message === null) {
      validationErrors["message"] = "Message is required";
    }
    return validationErrors;
  };

  return (
    <>
      <div className="contact-text-both">
        <p className="reach-out-and">Get in touch</p>
      </div>
      <div className="d-flex row contact-top" id="contact">
        <div className="col-lg-6 col-md-6 col-sm-12 contact-content-section">
          <div className="contact-content-div-left">
            <span className="contact-content-title">
              We're Here to Help You Achieve Your Goals
            </span>
            <p className="contact-content-description">
              Have questions or need assistance? Don't hesitate to reach out to
              Tech Nirvana. Our dedicated team of experts is committed to
              providing personalized solutions tailored to your specific needs.
              Whether you're looking to start a new project, explore partnership
              opportunities, or need support with an existing endeavor, we're
              just a message away. Fill out the contact form below, and let's
              embark on a journey of innovation and success together.
            </p>
          </div>
        </div>

        {/* form */}
        <div className="col-lg-6 col-md-6 col-sm-12 form-section">
          <div className="form">
            <div className="d-flex text-center name">
              <input
                type="text"
                placeholder="Name"
                value={contact.full_name}
                onChange={handleInputChange("full_name")}
              />
            </div>
            <div className="d-flex email">
              <input
                type="email"
                placeholder="Email"
                value={contact.email}
                onChange={handleInputChange("email")}
              />
            </div>
            <div className="d-flex message">
              <span>{""}</span>
              <textarea
                className="m-2"
                name="message"
                id="message"
                cols={20}
                rows={5}
                placeholder="Message"
                value={contact.message}
                onChange={handleInputChange("message")}
              ></textarea>
            </div>
            <div>
              <button className="btn submit" onClick={() => handleClick()}>
                Send
              </button>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
