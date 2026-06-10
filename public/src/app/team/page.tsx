import type { Metadata } from "next";
import { getData } from "../../../utils/apiHandle";
import TeamSection from "./TeamSection";

export const metadata: Metadata = {
  title: "Team — House of Shakya | Leadership",
  description:
    "The leadership and core team behind House of Shakya — designers, project managers and craftspeople.",
  openGraph: {
    title: "Team — House of Shakya",
    description: "Meet the studio behind the work.",
  },
};

export default async function Team() {
  const response = await getData("team-member/list");
  const teamdata = response?.data?.data || [];

  return (
    <>
      <section className="pt-40 pb-20 border-b border-border">
        <div className="container-luxe max-w-4xl">
          <div className="eyebrow mb-6">The Team</div>
          <h1 className="font-display text-6xl md:text-8xl font-light">
            Builders &amp; designers,
            <br />
            in one room.
          </h1>
        </div>
      </section>

      <TeamSection teamdata={teamdata} />
    </>
  );
}
