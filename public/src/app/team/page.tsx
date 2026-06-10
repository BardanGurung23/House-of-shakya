import type { Metadata } from "next";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "Team — House of Shakya | Leadership",
  description:
    "The leadership and core team behind House of Shakya — designers, project managers and craftspeople.",
  openGraph: {
    title: "Team — House of Shakya",
    description: "Meet the studio behind the work.",
  },
};

const team = [
  { name: "Aarav Shakya", role: "Founder · Principal Designer", img: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=900&q=80" },
  { name: "Niharika Rana", role: "Director of Execution", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=80" },
  { name: "Pranav Thapa", role: "Lead Architect", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=80" },
  { name: "Saraswati K.C.", role: "Head of Hospitality", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=900&q=80" },
  { name: "Bipin Maharjan", role: "Senior Project Manager", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&q=80" },
  { name: "Ishita Pradhan", role: "Materials & FF&E", img: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80" },
];

export default function Team() {
  return (
    <>
      <section className="pt-40 pb-20 border-b border-border">
        <div className="container-luxe max-w-4xl">
          <div className="eyebrow mb-6">The Team</div>
          <h1 className="font-display text-6xl md:text-8xl font-light">
            Builders &amp; designers,<br />in one room.
          </h1>
        </div>
      </section>

      <section className="py-24">
        <div className="container-luxe grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={(i % 3) * 0.08}>
              <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                <img src={m.img} alt={m.name} loading="lazy" className="absolute inset-0 h-full w-full object-cover grayscale hover:grayscale-0 transition duration-700" />
              </div>
              <div className="mt-5">
                <div className="font-display text-2xl">{m.name}</div>
                <div className="eyebrow mt-1">{m.role}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
