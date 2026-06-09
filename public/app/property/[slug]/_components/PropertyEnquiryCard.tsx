"use client";

import { postData } from "@/utils/apiHandle";
import { CheckCircle2, Mail, Phone, Send } from "lucide-react";
import { useState } from "react";

type PropertyEnquiryCardProps = {
  propertyId: number;
  propertyName: string;
  agentName: string;
  agentImage: string;
  agentPhone?: string | null;
  agentEmail?: string | null;
};

const getInitialForm = (propertyName: string) => ({
  fullName: "",
  email: "",
  phone: "",
  message: `Hello, I would like to know more about ${propertyName}.`,
});

export default function PropertyEnquiryCard({
  propertyId,
  propertyName,
  agentName,
  agentImage,
  agentPhone,
  agentEmail,
}: PropertyEnquiryCardProps) {
  const [form, setForm] = useState(() => getInitialForm(propertyName));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (
    field: keyof typeof form,
    value: string,
  ) => {
    setForm((currentForm) => ({
      ...currentForm,
      [field]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      await postData("enquire", {
        propertyId,
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        message: form.message,
      });

      setIsSubmitted(true);
      setForm(getInitialForm(propertyName));
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to send enquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-lg border border-navy/10 bg-cream p-5 shadow-card">
      <div className="flex items-center gap-3">
        <img
          src={agentImage}
          alt={agentName}
          className="h-14 w-14 rounded-full object-cover"
          width={96}
          height={96}
        />
        <div>
          <p className="font-semibold text-navy-deep">{agentName}</p>
          <p className="text-xs text-navy/50">Listing Agent</p>
        </div>
      </div>

      {isSubmitted ? (
        <div className="mt-5 rounded border border-forest/20 bg-forest/10 px-4 py-4 text-sm text-navy-deep">
          <CheckCircle2 size={22} className="mb-2 text-forest" />
          Your enquiry has been sent. Our team will get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-5 space-y-3">
          {error && (
            <div className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              {error}
            </div>
          )}

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-navy/50">
              Full name
            </span>
            <input
              required
              value={form.fullName}
              onChange={(event) => updateField("fullName", event.target.value)}
              className="w-full rounded border border-navy/10 bg-background px-3 py-2 text-sm outline-none focus:border-forest"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-navy/50">
              Email address
            </span>
            <input
              required
              type="email"
              value={form.email}
              onChange={(event) => updateField("email", event.target.value)}
              className="w-full rounded border border-navy/10 bg-background px-3 py-2 text-sm outline-none focus:border-forest"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-navy/50">
              Phone
            </span>
            <input
              type="tel"
              value={form.phone}
              onChange={(event) => updateField("phone", event.target.value)}
              className="w-full rounded border border-navy/10 bg-background px-3 py-2 text-sm outline-none focus:border-forest"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-navy/50">
              Message
            </span>
            <textarea
              required
              rows={4}
              value={form.message}
              onChange={(event) => updateField("message", event.target.value)}
              className="w-full resize-none rounded border border-navy/10 bg-background px-3 py-2 text-sm outline-none focus:border-forest"
            />
          </label>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded bg-navy-deep px-4 py-3 text-sm font-semibold text-cream transition-colors hover:bg-forest disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Send size={15} />
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}

      <div className="mt-3 grid gap-2">
        {agentPhone && (
          <a
            href={`tel:${agentPhone}`}
            className="flex items-center justify-center gap-2 rounded border border-navy/10 px-4 py-3 text-sm font-semibold text-navy-deep hover:border-forest"
          >
            <Phone size={15} />
            {agentPhone}
          </a>
        )}

        {agentEmail && (
          <a
            href={`mailto:${agentEmail}`}
            className="flex items-center justify-center gap-2 rounded border border-navy/10 px-4 py-3 text-sm font-semibold text-navy-deep hover:border-forest"
          >
            <Mail size={15} />
            Email Agent
          </a>
        )}
      </div>
    </div>
  );
}
