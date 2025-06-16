"use client";
import React, { useState } from "react";
import "./subscribe.scss";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PUBLIC_BACKEND_URL } from "../../constants";

type Subscription = {
  email: string;
};
const Subscribe = () => {
  const [subscribe, setSubscribe] = useState<Subscription>({ email: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange =
    (name: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setSubscribe({ ...subscribe, [name]: event.target.value });
      setErrors({ ...errors, [name]: "" });
    };

  const handleClick = () => {
    setSubscribe({ email: "" });
    notify();
  };

  const notify = async () => {
    let formValid = true;
    const newErrors: { email?: string } = { email: "" };

    if (subscribe.email.trim() === "") {
      newErrors.email = "Email is Required";
      toast.error("Email is required", {
        position: "bottom-right",
      });
      formValid = false;
    }

    if (formValid) {
      try {
        const res = await fetch(`${PUBLIC_BACKEND_URL}/subscriber`, {
          method: "POST",
          body: JSON.stringify(subscribe),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        if (res.ok) {
          toast.success("Subscribed successfully", {
            position: "bottom-right",
          });
        } else {
          toast.error("Subscription failed", {
            position: "bottom-right",
          });
        }
      } catch (error) {
        toast.error("An error occurred. Please try again later", {
          position: "bottom-right",
        });
      }
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <>
      <div className="subscribe-main">
        <div className="subscribe-text">Stay connected with us</div>
        <div className="subscribe-email">
          <input
            type="email"
            placeholder="Your email address"
            className="place-holder"
            value={subscribe.email}
            onChange={handleInputChange("email")}
          />
        </div>
        <div>
          <button className="subscribe-button" onClick={() => handleClick()}>
            Subscribe
          </button>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Subscribe;
