import Counter from "@/app/_components/site/Counter";
import Reveal from "@/app/_components/site/Reveal";
import type { CompanyStat } from "@/utils/companyStats";

export const Stats = ({ stats }: { stats: CompanyStat[] }) => {
  return (
    <section className="py-16 bg-navy-deep">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat) => (
            <Reveal key={stat.label}>
              <p className="text-4xl font-bold text-cream mb-2">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs uppercase tracking-widest text-cream/40">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};
