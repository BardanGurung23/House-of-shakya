"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { postData } from "@/utils/apiHandle";
import type { PropertyCard } from "@/utils/propertyMapper";
import { CheckCircle2 } from "lucide-react";
import { useState } from "react";

type EnquireDialogProps = {
  property: PropertyCard | null;
  onOpenChange: (open: boolean) => void;
};

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  message: "",
};

export default function EnquireDialog({
  property,
  onOpenChange,
}: EnquireDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(initialForm);

  const resetDialog = () => {
    setSubmitted(false);
    setError("");
    setIsSubmitting(false);
    setForm(initialForm);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      resetDialog();
    }

    onOpenChange(open);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!property) return;

    setError("");
    setIsSubmitting(true);

    try {
      await postData("enquire", {
        propertyId: property.id,
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
          : "Unable to send enquiry. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={Boolean(property)} onOpenChange={handleOpenChange}>
      <DialogContent className="max-h-[calc(100vh-2rem)] overflow-y-auto rounded-xl bg-cream p-6 text-navy-deep sm:max-w-lg">
        {property && (
          <>
            {submitted ? (
              <div className="py-10 text-center">
                <CheckCircle2 size={48} className="mx-auto mb-4 text-forest" />
                <DialogTitle className="mb-2 text-2xl font-semibold text-navy-deep">
                  Enquiry Sent
                </DialogTitle>
                <DialogDescription className="mx-auto max-w-sm text-sm text-navy/60">
                  Thank you for enquiring about {property.name}. Our team will
                  get back to you soon.
                </DialogDescription>
                <button
                  type="button"
                  onClick={() => handleOpenChange(false)}
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
                    {property.name} · {property.location}
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
                      placeholder={`I would like to enquire about ${property.name}.`}
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
  );
}
