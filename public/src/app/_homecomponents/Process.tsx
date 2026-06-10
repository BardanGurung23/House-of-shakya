import { Reveal } from "@/components/site/Reveal";

export default function Process() {
  const steps = [
    {
      n: "I",
      t: "Consultation",
      d: "We listen, walk the site, scope the brief and lock the budget envelope.",
    },
    {
      n: "II",
      t: "Design",
      d: "Concept, materials, drawings, 3D — signed off before a single nail.",
    },
    {
      n: "III",
      t: "Execution",
      d: "Single point accountability. Weekly walkthroughs. Live snag log.",
    },
    {
      n: "IV",
      t: "Delivery",
      d: "Handover with documentation, defect-free, ready to live or trade.",
    },
  ];
  return (
    <section className="bg-background py-32 border-t border-border">
      <div className="container-luxe">
        <Reveal className="mb-20 max-w-2xl">
          <div className="eyebrow mb-4">The process</div>
          <h2 className="font-display text-5xl md:text-6xl font-light">
            Four phases.
            <br />
            Zero surprises.
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-4 gap-px bg-border">
          {steps.map((s, i) => (
            <Reveal
              key={s.n}
              delay={i * 0.08}
              className="bg-background p-10 min-h-[260px] flex flex-col justify-between"
            >
              <div className="font-display text-5xl text-gold">{s.n}</div>
              <div>
                <div className="font-display text-2xl mb-2">{s.t}</div>
                <p className="text-sm text-muted-foreground">{s.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
