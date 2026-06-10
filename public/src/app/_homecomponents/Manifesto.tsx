import { Reveal } from "@/components/site/Reveal";

export default function Manifesto() {
  const lines = [
    {
      kicker: "01",
      h: "Design that matches execution.",
      p: "Every drawing has a plan to become real. We protect that intent through every trade.",
    },
    {
      kicker: "02",
      h: "Professional coordination.",
      p: "One studio, one PM, one accountable team. No blame ping-pong between contractors.",
    },
    {
      kicker: "03",
      h: "Delivered on time, every time.",
      p: "Critical path planning, weekly walkthroughs, locked material library — chaos engineered out.",
    },
  ];
  return (
    <section className="bg-ink py-32 border-t border-border">
      <div className="container-luxe grid md:grid-cols-3 gap-16">
        {lines.map((l, i) => (
          <Reveal key={l.kicker} delay={i * 0.1}>
            <div className="font-mono text-xs text-gold mb-6">— {l.kicker}</div>
            <h3 className="font-display text-3xl md:text-4xl font-light text-balance">{l.h}</h3>
            <p className="mt-4 text-sm text-muted-foreground max-w-sm">{l.p}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
