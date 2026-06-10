import FeaturedProjects from "./_homecomponents/FeaturedProjects";
import Manifesto from "./_homecomponents/Manifesto";
import Process from "./_homecomponents/Process";
import CTA from "./_homecomponents/CTA";
import { getData } from "../../utils/apiHandle";
import Hero from "./_homecomponents/Hero/index";

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <Manifesto />
      <Process />
      <CTA />
    </>
  );
}
