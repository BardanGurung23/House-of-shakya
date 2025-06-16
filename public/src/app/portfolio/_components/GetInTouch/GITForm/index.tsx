"use client";
import { useState } from "react";
import { PUBLIC_BACKEND_URL } from "../../../../../constants";
import "./index.scss";
import { toast, ToastContainer } from "react-toastify";

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

export default function GITForm() {
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
    <div className="GIT-form">
      <input
        type="text"
        placeholder="Name"
        value={contact.full_name}
        onChange={handleInputChange("full_name")}
      />
      <input
        type="email"
        placeholder="Email"
        value={contact.email}
        onChange={handleInputChange("email")}
      />
      <textarea
        name="message"
        id="message"
        placeholder="Message"
        cols={20}
        rows={5}
        value={contact.message}
        onChange={handleInputChange("message")}
        style={{ resize: "none" }}
      ></textarea>
      <button onClick={() => handleClick()} className="btn touch send-btn">
        Send
      </button>
    </div>
  );
}
