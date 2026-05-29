import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Counter from "./Counter";
import Reveal from "./Reveal";

const stats = [
  { value: 24, suffix: "+", label: "Projects Delivered" },
  { value: 480, suffix: "+", label: "Homes Created" },
  { value: 120, suffix: " Ropani", label: "Land Developed" },
  { value: 11, suffix: " Yrs", label: "Industry Experience" },
];

export default function AboutPreview() {
  return (
    <section className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <Reveal>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-5 text-forest border border-forest/30 bg-forest/5">
                About Yours Housing
              </span>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="text-3xl md:text-4xl font-semibold text-navy-deep mb-5 max-w-lg">
                Over a Decade of Building Trust in Pokhara
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base text-navy/60 leading-relaxed mb-4">
                Yours Housing was founded on a single conviction: that every
                Nepali family deserves access to premium, legally secure, and
                well-planned housing. From our base in Pokhara, we've grown into
                one of Gandaki Province's most trusted developers.
              </p>
            </Reveal>
            <Reveal delay={0.25}>
              <p className="text-base text-navy/60 leading-relaxed mb-8">
                Our mission is to develop properties that create long-term value
                for buyers, investors, and communities alike — backed by
                rigorous planning, professional execution, and full
                transparency.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-semibold text-forest hover:gap-3 transition-all duration-200"
              >
                Learn Our Story <ArrowRight size={14} />
              </Link>
            </Reveal>
          </div>

          {/* Stats */}
          <div>
            <Reveal delay={0.15}>
              <div className="grid grid-cols-2 gap-5">
                {stats.map((stat, i) => (
                  <div
                    key={stat.label}
                    className="p-7 rounded-xl border shadow-card"
                    style={{
                      borderColor: "oklch(0.26 0.07 258 / 0.1)",
                      background: i % 2 === 0 ? "white" : "var(--navy-deep)",
                    }}
                  >
                    <p
                      className={`text-3xl md:text-4xl font-bold mb-2 ${
                        i % 2 === 0 ? "text-navy-deep" : "text-cream"
                      }`}
                    >
                      <Counter target={stat.value} suffix={stat.suffix} />
                    </p>
                    <p
                      className={`text-xs font-medium uppercase tracking-widest ${
                        i % 2 === 0 ? "text-navy/50" : "text-cream/50"
                      }`}
                    >
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
