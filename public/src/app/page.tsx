import { PUBLIC_BACKEND_URL } from "../constants";
import HomePage from "./frontpage/home";
import Innovative from "./frontpage/Innovative";
import Contact from "./frontpage/Contact";
import NewTestimonial from "./frontpage/testimonial";
import Services from "./frontpage/Services";
import { getMetadata } from "../utils/getMetadata";

type Props = {
  param: { id: number };
  searchParams: { [key: string]: string | string[] | undefined };
};
export interface SeoData {
  title: string;
  description: string;
  author: string;
  keywords: { keywordTitle: string }[];
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
}

export interface Metadata {
  title: string;
  description: string;
  authors: { name: string }[];
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    url: string;
    image: string;
  };
}

// export async function generateMetadata(): Promise<Metadata> {
//   const response = await fetch(`${PUBLIC_BACKEND_URL}seo?category=home`).then(
//     (res) => res.json()
//   );
//   let seoData: SeoData;
//   if (response.data.seo && response.data.seo.length !== 0) {
//     seoData = response.data.seo[0];
//   } else {
//     return {
//       title: "Tech Nirvana",
//       description: "Official Website of Tech Nirvana",
//       authors: [],
//       keywords: [],
//       openGraph: {
//         title: "Tech Nirvana",
//         description: "Official Website of Tech Nirvana",
//         url: "https://technirvana.in/",
//         image: "https://technirvana.com.np/techlogo.png",
//       },
//     };
//   }
//   return {
//     title: seoData.title ? seoData.title : "Tech Nirvana",
//     description: seoData.description
//       ? seoData.description
//       : "Official Website of Tech Nirvana",
//     authors: [{ name: seoData.author ? seoData.author : "" }],
//     keywords: seoData.keywords.map((each) => each.keywordTitle),
//     openGraph: {
//       title: seoData.ogTitle ? seoData.ogTitle : "Tech Nirvana",
//       description: seoData.ogDescription
//         ? seoData.ogDescription
//         : "Official website of Tech Nirvana",
//       url: seoData.ogUrl,
//       image: "https://technirvana.com.np/techlogo.png",
//     },
//   };
// }

export async function generateMetadata() {
  return await getMetadata("home");
}

export default async function Home() {
  return (
    <>
      {/* quick injection for seo performance */}
      <h1
        style={{
          height: 0,
          width: 0,
          position: "absolute",
          opacity: 0,
        }}
      >
        Tech Nirvana
      </h1>
      <h2
        style={{
          height: 0,
          width: 0,
          position: "absolute",
          opacity: 0,
        }}
      >
        Best Company for Project outsourcing in Nepal.
      </h2>
      <HomePage />
      <Services />
      <div className="innovative-testimonial">
        <Innovative />
      </div>
      <NewTestimonial />
      <Contact />
    </>
  );
}
