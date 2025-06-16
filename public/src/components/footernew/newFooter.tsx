"use client";
import React, { useEffect, useState } from "react";
import "./newFooter.scss";
import Link from "next/link";
import Subscribe from "../subscribe";
import { IMAGE_BASE_URL, PUBLIC_BACKEND_URL } from "../../constants";

interface FooterProps {
  brandingFooterImage: string | null;
}
interface Setting {
  description: string;
  salesEmail: string;
  hrEmail: string;
  infoEmail: string;
  contactNumber: string;
  address: string;
  linkedUrl: string;
  linkedInUrl: string;
  instaUrl: string;
  fbUrl: string;
  whatsappUrl: string;
}
const NewFooter: React.FC<FooterProps> = ({ brandingFooterImage }) => {
  const [settings, setSettings] = useState(null);
  const [services, setServices] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}company-setting`, {
          cache: "no-store",
        });

        if (response.ok) {
          const result = await response.json();
          setSettings(result.data);
        } else {
          console.error("Error fetching setting");
        }
      } catch (error) {
        console.error("Error fetching setting:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${PUBLIC_BACKEND_URL}service/list`, {
          cache: "no-store",
        });

        if (response.ok) {
          const result = await response.json();
          setServices(result.data.data);
        } else {
          console.error("Error fetching setting");
        }
      } catch (error) {
        console.error("Error fetching setting:", error);
      }
    };

    fetchData();
  }, []);

  const openGmail = (email) => {
    const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
      email
    )}`;
    window.open(gmailLink, "_blank");
  };

  if (!settings) return;

  return (
    <>
      {console.log(services)}
      <div key={settings?.id} className="footer-main d-flex">
        <div className="footer-contact">
          <div className="footer-contact-frame">
            <div>
              <img
                crossOrigin="anonymous"
                src={`${
                  !brandingFooterImage.startsWith("/techlogo.webp")
                    ? `${IMAGE_BASE_URL}${brandingFooterImage}`
                    : "techlogo.webp"
                }`}
                alt="footer"
                className="footer-logo"
              />
            </div>
            <div className="mt-3 mb-3">
              <span className="footer-description ">
                {settings?.footer_desc}
              </span>
            </div>
            <div className="footer-links-frame">
              <span className="follow-us-on">Follow us on social media</span>
              <div className="footer-social-links">
                <Link href={`https://www.linkedin.com/company/tech-nirvana`}>
                  <i className="fa-brands fa-linkedin contact-link"></i>
                </Link>
                <Link href={`https://www.instagram.com/technirvana.np`}>
                  <i className="fa-brands fa-square-instagram contact-link"></i>
                </Link>
                <Link href={`https://www.facebook.com/technirvana.np`}>
                  <i className="fa-brands fa-square-facebook contact-link"></i>
                </Link>
                <Link href={`https://wa.me/9869028924`}>
                  <i className="fa-brands fa-square-whatsapp  contact-link"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-links">
          <div className="subscription-field">
            <Subscribe />
          </div>
          <div className="footer-links-div">
            <div className="footer-services-company">
              <div className="footer-company-frame">
                {/* <div className="company-links">Company</div> */}
                <div className="footer-company-links">
                  <Link href="/" className="direct-links">
                    Home
                  </Link>
                  <Link href="/blogs" className="direct-links">
                    Blogs
                  </Link>
                  <Link href="/portfolio" className="direct-links">
                    Portfolio
                  </Link>
                  <Link href="/company" className="direct-links">
                    Company
                  </Link>
                  <Link href="careers" className="direct-links">
                    Careers
                  </Link>
                  <Link
                    href="https://calendly.com/info-nirvanatechnology/30min?month=2024-04"
                    className="direct-links"
                  >
                    Start a project
                  </Link>
                </div>
              </div>
              <div className="footer-services-frame ">
                {/* <div className="services-links">Services</div> */}
                <div className="footer-company-links">
                  <Link href="/services" className="direct-links">
                    Services
                  </Link>
                  {services?.slice(0, 5)?.map((service) => (
                    <Link
                      href={`/services/${service.slug}`}
                      className="direct-links"
                    >
                      {service.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="footer-email-contact">
              {/* <div className="contact-links">Contact</div> */}
              <div className="footer-location">
                <span className="footerlocation">
                  <i className="fa-solid fa-location-dot contact-location"></i>
                  {settings.address}
                </span>
                <div className="footer-email-contact">
                  <span
                    onClick={() => window.open(`tel:${settings.primary_phone}`)}
                  >
                    <i className="fa-solid fa-phone contact-location "></i>
                    {settings.primary_phone}
                  </span>
                  <span
                    onClick={() =>
                      window.open(`tel:${settings.secondary_phone}`)
                    }
                  >
                    <i className="fa-solid fa-phone contact-location "></i>
                    {settings.secondary_phone}
                  </span>
                  <span onClick={() => openGmail(settings.email)}>
                    <i className="fa-solid fa-envelope contact-location "></i>
                    {settings.email}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="copy-right">
        <div className="text-center pt-3 copy">
          D-U-N-S: 850404249 | Legal Business Name: TECH NIRVANA PVT. LTD. |
          &copy; All Rights Reserved
        </div>
      </div>
    </>
  );
};

export default NewFooter;
