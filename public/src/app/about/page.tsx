import type { Metadata } from "next";
import { Reveal } from "@/components/site/Reveal";

export const metadata: Metadata = {
  title: "About — House of Shakya | Interior Design Company in Nepal",
  description:
    "House of Shakya is a Nepal-based interior design and turnkey construction studio. Mission, values, and process behind chaos-free delivery.",
  openGraph: {
    title: "The Studio — House of Shakya",
    description: "Interior design company in Nepal — turnkey, on time, on brief.",
  },
};

export default function About() {
  return (
    <>
      <section className="pt-40 pb-32 border-b border-border">
        <div className="container-luxe max-w-4xl">
          <div className="eyebrow mb-6">The Studio</div>
          <h1 className="font-display text-5xl md:text-8xl font-light leading-[0.95] text-balance">
            We build the room<br />in the drawing.
          </h1>
          <p className="mt-10 text-lg text-muted-foreground max-w-2xl">
            House of Shakya is a Nepal-based interior design and turnkey construction
            studio for hospitality and luxury residential clients. Founded on a single
            promise: the finished space matches the design — and arrives on time.
          </p>
        </div>
      </section>

      <section className="py-32 border-b border-border">
        <div className="container-luxe grid md:grid-cols-2 gap-16">
          <Reveal>
            <div className="eyebrow mb-4 text-gold">Mission</div>
            <p className="font-display text-3xl font-light text-balance">
              To make premium interior and construction delivery in Nepal feel
              effortless — design, drawings, execution and handover under one roof.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="eyebrow mb-4 text-gold">Vision</div>
            <p className="font-display text-3xl font-light text-balance">
              To set the regional benchmark for what professional, chaos-free
              project execution looks like.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="py-32 border-b border-border bg-ink">
        <div className="container-luxe">
          <Reveal className="mb-16 max-w-2xl">
            <div className="eyebrow mb-4">What we do</div>
            <h2 className="font-display text-5xl font-light">Three disciplines.<br />One accountable team.</h2>
          </Reveal>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { t: "Interior Design", d: "Concept, drawings, material specification, 3D visualization." },
              { t: "Turnkey Execution", d: "Construction, MEP, joinery, finishes, FF&E — managed end-to-end." },
              { t: "Hospitality & Residential", d: "Cafés, restaurants, boutique hotels, luxury homes and villas." },
            ].map((s) => (
              <div key={s.t} className="bg-background p-10">
                <div className="font-display text-2xl mb-3">{s.t}</div>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32">
        <div className="container-luxe">
          <Reveal className="mb-16 max-w-2xl">
            <div className="eyebrow mb-4">What makes us different</div>
            <h2 className="font-display text-5xl font-light">No chaos.<br />By design.</h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              { n: "01", t: "Execution matches design", d: "We don't hand off drawings to whoever shows up. The team that designs the room is accountable for building it." },
              { n: "02", t: "Single point coordination", d: "One PM. One number to call. No blame ping-pong between trades." },
              { n: "03", t: "Clear, weekly communication", d: "Walk-throughs, photos, snag lists, decisions — every Friday, in writing." },
              { n: "04", t: "Locked material library", d: "Substitutions only with written approval. What you signed off is what gets installed." },
            ].map((x) => (
              <Reveal key={x.n}>
                <div className="font-mono text-xs text-gold mb-3">— {x.n}</div>
                <div className="font-display text-3xl mb-2">{x.t}</div>
                <p className="text-muted-foreground max-w-md">{x.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
