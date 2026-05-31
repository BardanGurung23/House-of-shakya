import Link from "next/link";
import { MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";
import logo from "@/public/logo.png";
import { IMAGE_BASE_URL } from "@/constants";

export default function Footer({ settings }: any) {
  const footerDesc =
    settings?.footer_desc ||
    "Premium real estate development, housing projects, and property services in Pokhara.";
  const address = settings?.address || "Pokhara, Nepal";
  const email = settings?.email || "sales@yourshousing.com";
  const primaryPhone = settings?.primary_phone || "+9779869028924";
  const secondaryPhone = settings?.secondary_phone;
  const phoneLabel = [primaryPhone, secondaryPhone].filter(Boolean).join(" | ");

  return (
    <footer className="bg-navy-deep text-cream">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <img
              src={`${IMAGE_BASE_URL}${settings?.brandingImage || logo.src}`}
              alt="Yours Housing"
              width={50}
              height={50}
            />

            <p className="text-sm leading-relaxed opacity-70 max-w-xs">
              {footerDesc}
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
                <span>{address}</span>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-70">
                <Mail size={15} className="shrink-0 text-forest" />
                <a
                  href={`mailto:${email}`}
                  className="hover:opacity-100 hover:text-forest transition-all"
                >
                  {email}
                </a>
              </li>
              <li className="flex items-center gap-3 text-sm opacity-70">
                <Phone size={15} className="shrink-0 text-forest" />
                <a
                  href={`tel:${primaryPhone.replace(/[^\d+]/g, "")}`}
                  className="hover:opacity-100 hover:text-forest transition-all"
                >
                  {phoneLabel}
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
