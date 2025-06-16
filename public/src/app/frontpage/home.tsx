import React from "react";
import "./home.scss";
import Image from "next/image";
import Link from "next/link";
import { IMAGE_BASE_URL, PUBLIC_BACKEND_URL } from "../../constants";
import { TypeAnimation } from "react-type-animation";
import TypeAnimations from "./_components/TypeAnimation";
import { getData } from "../../utils/apiHandle";

interface BannerAttachment {
  path: string;
}

interface BannerData {
  heading1: string;
  heading2: string;
  link1: string;
  button1: string;
  link2: string;
  button2: string;
  banner_attachments: { attachments: BannerAttachment[] }[];
}

interface ResponseData {
  data: {
    banner: BannerData[];
  };
}

// async function getData(): Promise<ResponseData | undefined> {
//   try {
//     const response = await fetch(`${PUBLIC_BACKEND_URL}banner`, {
//       cache: "no-store",
//     });
//     if (response.ok) {
//       return response.json();
//     } else {
//       return undefined;
//     }
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return undefined;
//   }
// }

const HomePage: React.FC = async () => {
  // const responseData = await getData();

  const data = await getData("banner/home-banner");

  const banner = data.data?.bannerItems;

  return (
    <>
      {banner && (
        <div className="homepage">
          <div className="container">
            {banner.map((each) => (
              <div className="row row-style d-flex" key={each.id}>
                <div className="col-xs-12 col-sm-10 col-md-7 col-lg-8 content-div">
                  <div className="content">
                    <div className="tex">
                      <TypeAnimations heading={each.title} />
                    </div>
                    <p className="p">{each.subTitle}</p>
                    <div className="d-flex home-buttons">
                      <Link
                        href={`https://calendly.com/info-nirvanatechnology/30min?month=2024-05`}
                        className="btn button text-decoration-none"
                      >
                        {`Schedule a call`}{" "}
                        <i className="fa-solid fa-phone m-2"></i>
                      </Link>
                      <Link
                        href={`/services`}
                        className="btn learn text-red-500"
                      >
                        {`Our Offerings`}{" "}
                        <i className="fa-solid fa-arrow-right m-2"></i>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="col-xs-6 col-sm-5 col-md-5 col-lg-4 image-div">
                  <div className="banner-image">
                    <Image
                      src={`${IMAGE_BASE_URL}${each.image}`}
                      alt="Image"
                      height={600}
                      width={600}
                      className="home-image"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomePage;
