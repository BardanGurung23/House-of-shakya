import { IMAGE_BASE_URL } from "../../constants";

interface MetaDataPropTypes {
  title: string;
  meta_description: string;
  seo_keywords: string[];
  image_url?: string;
}

export default async function MetaData({
  title,
  meta_description,
  seo_keywords,
  image_url,
}: MetaDataPropTypes) {
  console.log("Title------------", title);
  const defaultImage = "https://technirvana.com.np/techlogo.png";
  return (
    <div>
      <title>{"Tech Nirvana - " + title}</title>
      <meta name="description" content={meta_description || "Tech Nirvana"} />
      <meta property="og:title" content={title} />
      {/* Fallback to data.title */}
      <meta
        property="og:description"
        content={meta_description || "Default OG description"}
      />
      <meta
        property="og:image"
        content={image_url ? IMAGE_BASE_URL + image_url : defaultImage}
      />
      {/* <meta property="og:url" content={`https://yourdomain.com/${dynamicPage}`} />  */}
      <meta property="og:type" content="website" />
      <meta
        name="keywords"
        content={
          typeof seo_keywords === "string"
            ? JSON.parse(seo_keywords).join(", ")
            : seo_keywords?.join(", ")
        }
      ></meta>
      <meta
        name="twitter:card"
        content={image_url ? IMAGE_BASE_URL + image_url : defaultImage}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={meta_description} />
      <meta
        name="twitter:image"
        content={image_url ? IMAGE_BASE_URL + image_url : defaultImage}
      />

      {/* Twitter Card Tags (optional) */}
      {/* <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={data.og_title || data.title} />
          <meta
            name="twitter:description"
            content={data.og_description || data.meta_description || "Default Twitter description"}
          />
          <meta name="twitter:image" content={data.og_image || BANNER_IMAGE.src} /> */}
      {/* /> */}
    </div>
  );
}
