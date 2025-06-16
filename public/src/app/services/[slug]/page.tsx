import GetInTouch from "../../portfolio/_components/GetInTouch";
import { FeatureProjects } from "./_components/FeaturedProjects";
import { ServiceHeader } from "./_components/ServiceHeader";
import Technologies from "./_components/Technologies";
import { UseCases } from "./_components/UseCases";
import { WhyUs } from "./_components/WhyUs";
import { getData } from "../../../utils/apiHandle";
import MetaData from "../../../components/MetaData";

interface ServiceType {
  id: number;
  title: string;
  img_path: string;
  name: string;
  slug: string;
  description: string;
  seo_description: string;
  seo_keywords: string[];
  summary: string;
  useCases: {
    title: string;
    description: string;
    img_path: string;
  }[];
  techStacks: {
    title: string;
    technologies: {
      name: string;
      image: string;
    }[];
  }[];
}

export default async function page(context) {
  const {
    params: { slug },
  } = context;

  const res = await getData(`service/${slug}`);

  return (
    <>
      {res?.data && (
        <>
          <MetaData
            title={res?.data?.name}
            meta_description={res?.data?.seo_description}
            seo_keywords={res?.data?.seo_keywords}
            image_url={res?.data?.img_path}
          />
          <ServiceHeader
            name={res?.data?.name}
            title={res?.data?.title}
            description={res?.data?.description}
            img_path={res?.data?.img_path}
          />
          <UseCases
            serviceName={res?.data?.name}
            useCases={res?.data?.useCases}
          />
          <Technologies
            serviceName={res?.data?.name}
            techStacks={res?.data?.techStacks}
          />
          <FeatureProjects serviceId={res?.data?.id} />
          <WhyUs />
          <GetInTouch />
        </>
      )}
    </>
  );
}
