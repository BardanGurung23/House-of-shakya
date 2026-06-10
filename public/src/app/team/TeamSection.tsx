"use client";

import { Reveal } from "@/components/site/Reveal";
import { IMAGE_BASE_URL } from "@/constants";
import { motion } from "framer-motion";

type TeamMember = {
  id?: number;
  name: string;
  designation: string;
  bio?: string | null;
  image?: string | null;
  linkedinUrl?: string | null;
};

export default function TeamSection({ teamdata = [] }: { teamdata?: TeamMember[] }) {
  return (
    <section className="py-24">
      <div className="container-luxe grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
        {teamdata.map((member, index) => (
          <Reveal key={member.id || member.name} delay={(index % 3) * 0.08}>
            <TeamCard member={member} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function TeamCard({ member }: { member: TeamMember }) {
  const imageUrl = member.image ? `${IMAGE_BASE_URL}${member.image}` : "";

  return (
    <motion.article initial="rest" whileHover="hover" whileFocus="hover">
      <div className="group relative aspect-[4/5] overflow-hidden bg-muted">
        {imageUrl && (
          <motion.img
            src={imageUrl}
            alt={member.name}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover transition duration-100 group-hover:grayscale"
            variants={{
              rest: { scale: 1 },
              hover: { scale: 1.06 },
            }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          />
        )}

        <motion.div
          className="absolute inset-0 flex flex-col justify-end bg-ink/78 p-6 md:p-7"
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            variants={{
              rest: { opacity: 0, y: 24 },
              hover: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            {member.bio && (
              <p className="text-sm md:text-base leading-relaxed text-foreground/85">
                {member.bio}
              </p>
            )}
            {member.linkedinUrl && (
              <a
                href={member.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex h-10 w-10 items-center justify-center border border-foreground/30 text-foreground transition hover:border-gold hover:text-gold"
                aria-label={`${member.name} on LinkedIn`}
              >
                <span className="font-sans text-sm font-semibold leading-none">in</span>
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>
      <div className="mt-5">
        <div className="font-display text-2xl">{member.name}</div>
        <div className="eyebrow mt-1">{member.designation}</div>
      </div>
    </motion.article>
  );
}
