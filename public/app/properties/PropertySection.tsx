"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { IMAGE_BASE_URL } from "@/constants/index";
import { postData } from "@/utils/apiHandle";
import type { PropertyCard } from "@/utils/propertyMapper";
import {
  ArrowRight,
  Bath,
  Bed,
  CheckCircle2,
  MapPin,
  Square,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Reveal from "../_components/site/Reveal";

interface PropertiesClientProps {
  properties: PropertyCard[];
  limit?: number;
  showHeader?: boolean;
}

const statusColors: Record<string, string> = {
  ready: "bg-forest/20 text-forest border-forest/30",
  new: "bg-gold/20 text-gold border-gold/30",
  pre: "bg-navy/20 text-navy border-navy/30",
  ongoing: "bg-forest-deep/20 text-forest border-forest-deep/30",
};

export default function PropertiesSection({
  properties,
  limit,
  showHeader = true,
}: PropertiesClientProps) {
  const [filter, setFilter] = useState("All");
  const [selectedProperty, setSelectedProperty] =
    useState<PropertyCard | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const categories = [
    "All",
    ...Array.from(new Set(properties.map((property) => property.category))),
  ];

  const filtered = properties
    .filter((property) => filter === "All" || property.category === filter)
    .slice(0, limit);

  const closeDialog = (open: boolean) => {
    if (open) return;

    setSelectedProperty(null);
    setSubmitted(false);
    setError("");
    setIsSubmitting(false);
    setForm({
      fullName: "",
      email: "",
      phone: "",
      message: "",
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!selectedProperty) return;

    setError("");
    setIsSubmitting(true);

    try {
      await postData("enquire", {
        propertyId: selectedProperty.id,
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });
      setSubmitted(true);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to send enquiry. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {showHeader && (
          <div className="mb-12">
            <Reveal>
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-widest uppercase rounded-full mb-4 text-forest border border-forest/30 bg-forest/5">
                Properties
              </span>
            </Reveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <Reveal delay={0.1}>
                <h2 className="text-3xl md:text-4xl font-semibold text-navy-deep max-w-lg">
                  Browse Available Properties
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter(cat)}
                      className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
                        filter === cat
                          ? "bg-navy-deep text-cream border-navy-deep"
                          : "border-navy/20 text-navy hover:border-navy hover:bg-navy/5"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        )}

        {!showHeader && (
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all duration-200 ${
                  filter === cat
                    ? "bg-navy-deep text-cream border-navy-deep"
                    : "border-navy/20 text-navy hover:border-navy hover:bg-navy/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filtered.map((prop, i) => (
              <Reveal key={prop.id} delay={i * 0.08}>
                <div className="rounded-xl overflow-hidden hover-lift shadow-card bg-cream group cursor-pointer">
                  <div className="relative h-56 overflow-hidden img-zoom">
                    <img
                      src={`${IMAGE_BASE_URL}${prop.image}`}
                      alt={`${prop.name} - ${prop.category} in ${prop.location}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      width={600}
                      height={400}
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(to top, oklch(0.18 0.05 255 / 0.5), transparent 60%)",
                      }}
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span
                        className={`px-2.5 py-1 text-xs font-semibold rounded-full border ${
                          statusColors[prop.statusType] || statusColors.ready
                        }`}
                      >
                        {prop.status}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 text-xs font-semibold rounded-full bg-navy-deep/80 text-cream">
                        {prop.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-5">
                    <h3 className="font-semibold text-navy-deep text-base leading-tight mb-1">
                      {prop.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-navy/60 mb-3">
                      <MapPin size={11} />
                      <span>{prop.location}</span>
                    </div>

                    {prop.beds > 0 && (
                      <div className="flex items-center gap-4 text-xs text-navy/60 mb-4">
                        <span className="flex items-center gap-1">
                          <Bed size={11} /> {prop.beds} Beds
                        </span>
                        <span className="flex items-center gap-1">
                          <Bath size={11} /> {prop.baths} Baths
                        </span>
                        <span className="flex items-center gap-1">
                          <Square size={11} /> {prop.area}
                        </span>
                      </div>
                    )}
                    {prop.beds === 0 && (
                      <div className="flex items-center gap-2 text-xs text-navy/60 mb-4">
                        <Square size={11} /> <span>{prop.area}</span>
                      </div>
                    )}

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-navy/50 mb-0.5">
                          Starting at
                        </p>
                        <p className="font-bold text-forest text-base">
                          {prop.price}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedProperty(prop)}
                        className="px-4 py-2 text-xs font-semibold rounded bg-navy-deep text-cream hover:bg-forest transition-all duration-200"
                      >
                        Enquire
                      </button>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal>
            <div className="rounded-xl border border-navy/10 bg-cream px-6 py-12 text-center">
              <p className="text-lg font-semibold text-navy-deep">
                No properties
              </p>
            </div>
          </Reveal>
        )}

        {limit && (
          <Reveal delay={0.3}>
            <div className="mt-12 text-center">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded border border-navy-deep text-navy-deep hover:bg-navy-deep hover:text-cream transition-all duration-200"
              >
                View All Projects <ArrowRight size={14} />
              </Link>
            </div>
          </Reveal>
        )}
      </div>

      <Dialog open={Boolean(selectedProperty)} onOpenChange={closeDialog}>
        <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl bg-cream p-6 text-navy-deep sm:max-w-lg">
          {selectedProperty && (
            <>
              {submitted ? (
                <div className="py-10 text-center">
                  <CheckCircle2 size={48} className="mx-auto mb-4 text-forest" />
                  <DialogTitle className="mb-2 text-2xl font-semibold text-navy-deep">
                    Enquiry Sent
                  </DialogTitle>
                  <DialogDescription className="mx-auto max-w-sm text-sm text-navy/60">
                    Thank you for enquiring about {selectedProperty.name}. Our
                    team will get back to you soon.
                  </DialogDescription>
                  <button
                    type="button"
                    onClick={() => closeDialog(false)}
                    className="mt-8 px-6 py-2.5 text-sm font-semibold rounded bg-navy-deep text-cream hover:bg-forest transition-all duration-200"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold text-navy-deep">
                      Enquire About Property
                    </DialogTitle>
                    <DialogDescription className="text-sm text-navy/60">
                      {selectedProperty.name} · {selectedProperty.location}
                    </DialogDescription>
                  </DialogHeader>

                  <form onSubmit={handleSubmit} className="mt-2 space-y-5">
                    {error && (
                      <div className="rounded border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                        {error}
                      </div>
                    )}

                    {[
                      {
                        id: "fullName",
                        label: "Full Name",
                        type: "text",
                        placeholder: "Your full name",
                        required: true,
                      },
                      {
                        id: "email",
                        label: "Email Address",
                        type: "email",
                        placeholder: "you@example.com",
                        required: true,
                      },
                      {
                        id: "phone",
                        label: "Phone Number",
                        type: "tel",
                        placeholder: "+977 98XXXXXXXX",
                        required: false,
                      },
                    ].map((field) => (
                      <div key={field.id}>
                        <label
                          htmlFor={`enquire-${field.id}`}
                          className="block text-xs font-semibold uppercase tracking-widest text-navy/50 mb-2"
                        >
                          {field.label}
                        </label>
                        <input
                          id={`enquire-${field.id}`}
                          type={field.type}
                          required={field.required}
                          placeholder={field.placeholder}
                          value={form[field.id as keyof typeof form]}
                          onChange={(event) =>
                            setForm({
                              ...form,
                              [field.id]: event.target.value,
                            })
                          }
                          className="w-full border-b border-navy/20 pb-2 text-sm text-navy-deep bg-transparent placeholder-navy/30 focus:border-forest transition-colors duration-200"
                        />
                      </div>
                    ))}

                    <div>
                      <label
                        htmlFor="enquire-message"
                        className="block text-xs font-semibold uppercase tracking-widest text-navy/50 mb-2"
                      >
                        Message
                      </label>
                      <textarea
                        id="enquire-message"
                        required
                        rows={4}
                        placeholder={`I would like to enquire about ${selectedProperty.name}.`}
                        value={form.message}
                        onChange={(event) =>
                          setForm({ ...form, message: event.target.value })
                        }
                        className="w-full resize-none border-b border-navy/20 pb-2 text-sm text-navy-deep bg-transparent placeholder-navy/30 focus:border-forest transition-colors duration-200"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 text-sm font-semibold rounded bg-navy-deep text-cream hover:bg-forest transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {isSubmitting ? "Sending..." : "Send Enquiry"}
                    </button>
                  </form>
                </>
              )}
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
