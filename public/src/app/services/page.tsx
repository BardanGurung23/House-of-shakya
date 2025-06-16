import { getMetadata } from "../../utils/getMetadata";
import GetInTouch from "../portfolio/_components/GetInTouch";
import { Divider } from "./_components/Divider";
import PageHeader from "./_components/PageHeader";
import { Roadmaps } from "./_components/Roadmaps";
import { ServicesComponent } from "./_components/ServicesComponent";
import { WorkingTechnologies } from "./_components/WorkingTechnologies";

export async function generateMetadata() {
  return await getMetadata("services");
}

export default function page() {
  return (
    <>
      <PageHeader />
      <ServicesComponent />
      <WorkingTechnologies />
      <Roadmaps />
      <Divider />
      <GetInTouch />
    </>
  );
}
