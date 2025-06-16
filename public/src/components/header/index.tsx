"use client";

import Link from "next/link";
import "./headerBootstrap.scss";
import { Menu } from "./headerMenu";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { IMAGE_BASE_URL } from "../../constants";
import Image from "next/image";
import { Cross, Plus } from "lucide-react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import styles from "./MobileMenu.module.scss";

const Header = ({ brandingImage }) => {
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);
  const router = useRouter();

  const handleClick = () => {
    setToggle(!toggle);
  };

  const handleNavigation = (path: string) => {
    router.push(path);
    setToggle(false);
  };

  useEffect(() => {
    if (toggle) {
      document.body.classList.add("overflow-y-hidden");
    } else {
      document.body.classList.remove("overflow-y-hidden");
    }

    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setToggle(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [toggle]);

  return (
    <>
      <nav className="nav-bar navbar navbar-expand-lg">
        <div className="container">
          <Link className="logo-mgmt" href="/">
            <img
              crossOrigin="anonymous"
              src={`${
                !brandingImage.startsWith("/techlogo.webp")
                  ? `${IMAGE_BASE_URL}${brandingImage}`
                  : "techlogo.webp"
              }`}
              alt="Log"
              className="logo"
            />
          </Link>
          {/* mobile toggle button */}
          <div
            style={{ cursor: "pointer" }}
            className="navbar-toggler no-border"
            onClick={handleClick}
          >
            <RxHamburgerMenu />
          </div>

          {/* <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button> */}
          {/* desktop toggle button */}
          <div
            className="collapse navbar-collapse navbar__menu"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {Menu.map((each, index) => (
                <li key={index} className="nav-link">
                  <Link
                    href={each.path}
                    className={`align-item-center navmenu${
                      pathname === each.path ? "fw-bold selectednav" : ""
                    }`}
                  >
                    {each.name}
                  </Link>
                </li>
              ))}
              <div className="">
                <Link className="btn ms-lg-4 touch" href="/#contact">
                  Get in touch
                </Link>
              </div>
            </ul>
          </div>
        </div>
        {/* <div
          className={`${toggle ? "mobile-nav-bar " : "display-hidden"}`}
          id="navbarSupportedContent"
        >
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {Menu.map((each, index) => (
              <li key={index} className="nav-link">
                <div
                  onClick={() => handleNavigation(each.path)}
                  className={`align-item-center navmenu${
                    pathname === each.path ? "fw-bold selectednav" : ""
                  }`}
                >
                  {each.name}
                </div>
              </li>
            ))}
            <div className="d-flex get">
              <Link className="btn ms-lg-4 touch" href="/#contact">
                Get in touch
              </Link>
            </div>
          </ul>
        </div> */}
        <div className={`${styles.wrapper} ${toggle ? styles.open : ""}`}>
          <div className={styles.closeBtnContainer}>
            <Plus
              style={{
                transform: "rotate(45deg)",
                cursor: "pointer",
                color: "red",
              }}
              onClick={() => setToggle(false)}
            />
          </div>

          <ul className={styles.menuList}>
            {Menu.map((item) => {
              const isActive =
                item.path === "/"
                  ? pathname === item.path
                  : pathname.startsWith(item.path);

              return (
                <li
                  key={item.name}
                  className={`${styles.menuItem} ${
                    isActive ? styles.active : ""
                  }`}
                  onClick={() => setToggle(false)}
                >
                  <Link
                    style={{ color: "inherit", textDecoration: "none" }}
                    href={item.path}
                  >
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className={styles.socialLinks}>
            <p
              style={{
                textAlign: "center",
                marginTop: "0.6rem",
                marginBottom: "0",
                fontSize: "1.5rem",
              }}
            >
              Social links
            </p>
            <div style={{ margin: "0 auto", display: "flex", gap: "1.5rem" }}>
              <Link href="https://www.linkedin.com/company/tech-nirvana">
                <FaLinkedin className={styles.icon} />
              </Link>
              <Link href="https://www.instagram.com/technirvana.np">
                <FaInstagram className={styles.icon} />
              </Link>
              <Link href="https://www.facebook.com/technirvana.np">
                <FaFacebook className={styles.icon} />
              </Link>
              <Link href="https://wa.me/9869028924">
                <FaWhatsapp className={styles.icon} />
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Header;
