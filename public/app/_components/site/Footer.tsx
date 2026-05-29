import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";

export default function Footer({ settings }: any) {
  return (
    <footer className="bg-navy-deep text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded flex items-center justify-center"
                style={{ background: "var(--gradient-brand)" }}
              >
                <span
                  className="text-sm font-bold text-cream"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  YH
                </span>
              </div>
              <span
                className="font-semibold text-lg tracking-tight"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Yours <span className="text-forest">Housing</span>
              </span>
            </div>
            <p className="text-sm leading-relaxed opacity-70 max-w-xs">
              {settings.footer_desc}
            </p>
          </div>

          {/* Explore */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-5">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About Us" },
                { href: "/projects", label: "Projects & Properties" },
                { href: "/services", label: "Services" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm opacity-70 hover:opacity-100 hover:text-forest transition-all duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Office */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-gold mb-5">
              Office
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm opacity-70">
                <MapPin size={15} className="mt-0.5 shrink-0 text-forest" />
                <span>{settings.address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-70">
                <Mail size={15} className="shrink-0 text-forest" />
                <a
                  href="mailto:sales@yourshousing.com"
                  className="hover:opacity-100 hover:text-forest transition-all"
                >
                  {settings.email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-70">
                <Phone size={15} className="shrink-0 text-forest" />
                <a
                  href="tel:+9779869028924"
                  className="hover:opacity-100 hover:text-forest transition-all"
                >
                  {settings.primary_phone} | {settings.secondary_phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div
          className="mt-14 pt-6 border-t flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderColor: "oklch(0.97 0.012 90 / 0.1)" }}
        >
          <p className="text-xs opacity-40">
            © {new Date().getFullYear()} Yours Housing. All rights reserved.
          </p>
          <p className="text-xs opacity-40">
            Developed by Tech Nirvana · Built for the long term
          </p>
        </div>
      </div>
    </footer>
  );
}
