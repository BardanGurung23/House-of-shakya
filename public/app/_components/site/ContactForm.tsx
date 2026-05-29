"use client";
import { useState } from "react";
import { MapPin, Mail, Phone, Clock, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

type ContactSetting = {
  address?: string | null;
  email?: string | null;
  primary_phone?: string | null;
  secondary_phone?: string | null;
};

const getPhoneHref = (phone?: string | null) =>
  phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : undefined;

export default function ContactForm({
  contact,
}: {
  contact?: ContactSetting | null;
}) {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  const addressLines = contact?.address
    ? contact.address.split(/\r?\n/).filter(Boolean)
    : ["New Road, Pokhara — 33700", "Gandaki Province, Nepal"];
  const email = contact?.email || "sales@yourshousing.com";
  const phoneLines = [contact?.primary_phone, contact?.secondary_phone].filter(
    Boolean
  ) as string[];
  const phones = phoneLines.length ? phoneLines : ["+977 98690 28924"];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Office Info */}
          <div>
            <Reveal>
              <h2 className="text-2xl md:text-3xl font-semibold text-navy-deep mb-8">
                Visit Our Office
              </h2>
            </Reveal>

            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  title: "Address",
                  lines: addressLines,
                },
                {
                  icon: Mail,
                  title: "Email",
                  lines: [email],
                  link: `mailto:${email}`,
                },
                {
                  icon: Phone,
                  title: "Phone",
                  lines: phones,
                  link: getPhoneHref(phones[0]),
                },
                {
                  icon: Clock,
                  title: "Office Hours",
                  lines: [
                    "Sun – Fri: 10:00 AM – 6:00 PM",
                    "Saturday: By appointment",
                  ],
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="flex items-start gap-4">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: "oklch(0.42 0.09 155 / 0.1)" }}
                    >
                      <item.icon size={18} className="text-forest" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest text-navy/40 mb-1">
                        {item.title}
                      </p>
                      {item.lines.map((line, j) =>
                        item.link && j === 0 ? (
                          <a
                            key={j}
                            href={item.link}
                            className="block text-sm text-navy-deep hover:text-forest transition-colors"
                          >
                            {line}
                          </a>
                        ) : (
                          <p key={j} className="text-sm text-navy/70">
                            {line}
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Map placeholder */}
            <Reveal delay={0.3}>
              <div
                className="mt-10 h-52 rounded-xl overflow-hidden border"
                style={{ borderColor: "oklch(0.26 0.07 258 / 0.12)" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.31643274836!2d83.94264!3d28.20967!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2sPokhara!5e0!3m2!1sen!2snp!4v1700000000000"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Yours Housing Office Location - Pokhara, Nepal"
                />
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal delay={0.1}>
            <div
              className="rounded-2xl p-8 md:p-10 border shadow-card bg-cream"
              style={{ borderColor: "oklch(0.26 0.07 258 / 0.1)" }}
            >
              {submitted ? (
                <div className="flex flex-col items-center justify-center h-full py-16 text-center">
                  <CheckCircle2 size={52} className="text-forest mb-5" />
                  <h3 className="text-2xl font-semibold text-navy-deep mb-3">
                    Message Sent
                  </h3>
                  <p className="text-sm text-navy/60 max-w-xs">
                    Thank you for reaching out. Our team will get back to you
                    within one business day.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setForm({ name: "", email: "", phone: "", message: "" });
                    }}
                    className="mt-8 px-6 py-2.5 text-sm font-semibold rounded border border-navy-deep text-navy-deep hover:bg-navy-deep hover:text-cream transition-all duration-200"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h3 className="text-xl font-semibold text-navy-deep mb-2">
                    Send a Message
                  </h3>
                  <p className="text-sm text-navy/50 mb-8">
                    We typically respond within 4 business hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {[
                      {
                        id: "name",
                        label: "Full Name",
                        type: "text",
                        placeholder: "Your full name",
                      },
                      {
                        id: "email",
                        label: "Email Address",
                        type: "email",
                        placeholder: "you@example.com",
                      },
                      {
                        id: "phone",
                        label: "Phone Number",
                        type: "tel",
                        placeholder: "+977 98XXXXXXXX",
                      },
                    ].map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={field.id}
                          className="block text-xs font-semibold uppercase tracking-widest text-navy/50 mb-2"
                        >
                          {field.label}
                        </label>
                        <input
                          id={field.id}
                          type={field.type}
                          required={field.id !== "phone"}
                          placeholder={field.placeholder}
                          value={form[field.id as keyof typeof form]}
                          onChange={(e) =>
                            setForm({ ...form, [field.id]: e.target.value })
                          }
                          className="w-full border-b border-navy/20 pb-2 text-sm text-navy-deep bg-transparent placeholder-navy/30 focus:border-forest transition-colors duration-200"
                        />
                      </div>
                    ))}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs font-semibold uppercase tracking-widest text-navy/50 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={4}
                        placeholder="Tell us about your requirements..."
                        value={form.message}
                        onChange={(e) =>
                          setForm({ ...form, message: e.target.value })
                        }
                        className="w-full border-b border-navy/20 pb-2 text-sm text-navy-deep bg-transparent placeholder-navy/30 focus:border-forest transition-colors duration-200 resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-3.5 text-sm font-semibold rounded bg-navy-deep text-cream hover:bg-forest transition-all duration-200"
                    >
                      Send Message
                    </button>
                  </form>
                </>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
