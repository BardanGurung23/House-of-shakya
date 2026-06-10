"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Check, ChevronLeft } from "lucide-react";

type Form = {
  type: string;
  budget: string;
  timeline: string;
  location: string;
  details: string;
  name: string;
  contact: string;
};

const steps = [
  { key: "type", label: "Project type", options: ["Residential", "Hospitality", "Commercial"] },
  { key: "budget", label: "Budget range", options: ["Under 50L NPR", "50L — 1.5Cr", "1.5Cr — 5Cr", "5Cr+"] },
  { key: "timeline", label: "Timeline", options: ["ASAP", "1—3 months", "3—6 months", "Exploring"] },
] as const;

const WHATSAPP = "9779800000000"; // replace

export default function Contact() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({ type: "", budget: "", timeline: "", location: "", details: "", name: "", contact: "" });
  const [done, setDone] = useState(false);

  const total = steps.length + 2; // + details + contact
  const progress = ((step + 1) / total) * 100;

  const set = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const next = () => setStep((s) => Math.min(s + 1, total - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    const msg = encodeURIComponent(
      `New consultation request from ${form.name}\n\n` +
      `Type: ${form.type}\nBudget: ${form.budget}\nTimeline: ${form.timeline}\n` +
      `Location: ${form.location}\nContact: ${form.contact}\n\nBrief:\n${form.details}`
    );
    window.open(`https://wa.me/${WHATSAPP}?text=${msg}`, "_blank");
    setDone(true);
  };

  return (
    <section className="min-h-screen pt-32 pb-32 bg-background">
      <div className="container-luxe grid md:grid-cols-12 gap-16">
        <div className="md:col-span-4">
          <div className="eyebrow mb-6">Consultation</div>
          <h1 className="font-display text-5xl md:text-6xl font-light leading-[0.95]">
            Tell us about<br />your project.
          </h1>
          <p className="mt-8 text-muted-foreground text-sm max-w-sm">
            We accept a limited number of commissions each year. Serious enquiries
            receive a written response within one business day.
          </p>
          <div className="mt-12 space-y-3 text-sm">
            <div><span className="eyebrow mr-3">Email</span> hello@houseofshakya.com</div>
            <div><span className="eyebrow mr-3">Studio</span> Lalitpur, Nepal</div>
            <div><span className="eyebrow mr-3">WhatsApp</span> +977 98XXXXXXXX</div>
          </div>
        </div>

        <div className="md:col-span-8">
          <div className="border border-border bg-card p-8 md:p-12 min-h-[520px] flex flex-col">
            <div className="flex items-center justify-between mb-10">
              <span className="font-mono text-xs text-muted-foreground">
                Step {Math.min(step + 1, total)} / {total}
              </span>
              <div className="h-px flex-1 mx-6 bg-border relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-gold"
                  initial={false}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {done ? (
                <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 flex flex-col items-center justify-center text-center">
                  <div className="h-14 w-14 rounded-full border border-gold flex items-center justify-center mb-6">
                    <Check className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="font-display text-3xl">Thank you.</h3>
                  <p className="mt-3 text-sm text-muted-foreground max-w-sm">
                    Your brief has been queued. We'll respond within one business day.
                  </p>
                </motion.div>
              ) : step < steps.length ? (
                <motion.div
                  key={"choice-" + step}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="flex-1"
                >
                  <div className="eyebrow mb-3">{steps[step].label}</div>
                  <h3 className="font-display text-3xl md:text-4xl font-light mb-10">
                    {step === 0 && "What are you building?"}
                    {step === 1 && "What's your budget envelope?"}
                    {step === 2 && "When do you want to begin?"}
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {steps[step].options.map((opt) => {
                      const k = steps[step].key as keyof Form;
                      const active = form[k] === opt;
                      return (
                        <button
                          key={opt}
                          onClick={() => { set(k, opt); setTimeout(next, 250); }}
                          className={`text-left p-5 border transition ${active ? "border-gold bg-gold/5 text-gold" : "border-border hover:border-foreground"}`}
                        >
                          <span className="font-display text-xl">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              ) : step === steps.length ? (
                <motion.div key="details" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex-1">
                  <div className="eyebrow mb-3">Brief</div>
                  <h3 className="font-display text-3xl mb-8">Tell us a little more.</h3>
                  <input
                    placeholder="Project location"
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                    className="w-full bg-transparent border-b border-border py-3 mb-6 outline-none focus:border-gold"
                  />
                  <textarea
                    placeholder="Share your vision, references, constraints..."
                    rows={6}
                    value={form.details}
                    onChange={(e) => set("details", e.target.value)}
                    className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-gold resize-none"
                  />
                </motion.div>
              ) : (
                <motion.div key="contact" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="flex-1">
                  <div className="eyebrow mb-3">Contact</div>
                  <h3 className="font-display text-3xl mb-8">How do we reach you?</h3>
                  <input
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="w-full bg-transparent border-b border-border py-3 mb-6 outline-none focus:border-gold"
                  />
                  <input
                    placeholder="Email or phone"
                    value={form.contact}
                    onChange={(e) => set("contact", e.target.value)}
                    className="w-full bg-transparent border-b border-border py-3 outline-none focus:border-gold"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {!done && (
              <div className="mt-10 flex items-center justify-between">
                <button
                  onClick={back}
                  disabled={step === 0}
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" /> Back
                </button>
                {step >= steps.length && (
                  <button
                    onClick={step === total - 1 ? submit : next}
                    disabled={step === total - 1 ? !form.name || !form.contact : !form.details}
                    className="inline-flex items-center gap-3 bg-foreground text-ink px-8 py-3 text-xs uppercase tracking-[0.3em] hover:bg-gold transition disabled:opacity-40"
                  >
                    {step === total - 1 ? "Send via WhatsApp" : "Continue"} <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
