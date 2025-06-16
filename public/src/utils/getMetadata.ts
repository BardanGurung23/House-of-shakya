import { PROJECT_NAME } from "../constants";
import { getData } from "./apiHandle";

export async function getMetadata(pageName: string) {
  try {
    const data = await getData(`seo/list?pageName=${pageName}`);
    const response = await data?.data?.data[0];

    console.log(response);

    if (!response) throw new Error("no metadata");

    return {
      title: response?.title,
      author: response?.author,
      description: response?.description,
      keywords:
        typeof response?.keywords === "string"
          ? JSON.parse(response?.keywords).join(", ")
          : response?.keywords?.join(", "),
      openGraph: {
        title: response?.og_title,
        description: response?.og_description,
        images: "https://technirvana.com.np/techlogo.png",
      },
    };
  } catch (error) {
    console.log(
      error,
      "error in meta tags \n Issue addressed from frontend component"
    );
    return {
      title: PROJECT_NAME,
      author: PROJECT_NAME,
      description: PROJECT_NAME,
      keywords: PROJECT_NAME,
      openGraph: {
        title: PROJECT_NAME,
        description: PROJECT_NAME,
      },
    };
  }
}
