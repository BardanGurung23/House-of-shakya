import { getMetadata } from "../../utils/getMetadata";
import GetInTouch from "./_components/GetInTouch";
import IndustryCarousel from "./_components/IndustryCarousel";
import OurSpecializations from "./_components/OurSpecializations";
import PageHeader from "./_components/PageHeader";
import Portfolios from "./_components/Portfolios";

export async function generateMetadata() {
  return await getMetadata("portfolio");
}

export default function page() {
  return (
    <>
      <PageHeader />
      <IndustryCarousel />
      <Portfolios />
      <OurSpecializations />
      <GetInTouch />
    </>
  );
}
