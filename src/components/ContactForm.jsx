import { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { profile } from "../data/portfolio";

const schema = z.object({
  name: z.string().min(2, "Tell me your name."),
  email: z.string().email("Use a valid email address."),
  type: z.string().min(1, "Choose a collaboration type."),
  budget: z.string().min(1, "Choose a budget range."),
  message: z.string().min(24, "Share a few more details so I can respond well."),
});

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [mailto, setMailto] = useState("");
  const envReady = useMemo(
    () =>
      Boolean(
        import.meta.env.VITE_EMAILJS_SERVICE_ID &&
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID &&
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
      ),
    [],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      type: "Full-stack build",
      budget: "$1k - $5k",
      message: "",
    },
  });

  const onSubmit = async (values) => {
    setStatus("idle");

    if (envReady) {
      try {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          values,
          { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
        );
        reset();
        setStatus("sent");
        return;
      } catch {
        setStatus("fallback");
      }
    }

    const subject = encodeURIComponent(`${values.type} inquiry from ${values.name}`);
    const body = encodeURIComponent(
      `Name: ${values.name}\nEmail: ${values.email}\nType: ${values.type}\nBudget: ${values.budget}\n\n${values.message}`,
    );
    setMailto(`mailto:${profile.email}?subject=${subject}&body=${body}`);
    setStatus("fallback");
  };

  const inputClass =
    "w-full min-h-12 rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] px-4 text-sm text-[color:var(--text)] outline-none transition placeholder:text-[color:var(--muted)] focus:border-[color:var(--accent)]";
  const labelClass = "mb-2 block text-sm font-semibold";
  const errorClass = "mt-2 text-xs text-[#ff6b4a]";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 rounded-lg border border-[color:var(--line)] bg-[color:var(--surface)] p-5 premium-shadow md:p-7">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">
            Name
          </label>
          <input id="name" className={inputClass} placeholder="Your name" {...register("name")} />
          {errors.name && <p className={errorClass}>{errors.name.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="email">
            Email
          </label>
          <input id="email" className={inputClass} placeholder="you@company.com" {...register("email")} />
          {errors.email && <p className={errorClass}>{errors.email.message}</p>}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="type">
            Collaboration
          </label>
          <select id="type" className={inputClass} {...register("type")}>
            <option>Full-stack build</option>
            <option>AI product interface</option>
            <option>Frontend motion system</option>
            <option>Portfolio or personal brand</option>
            <option>Recruiting conversation</option>
          </select>
          {errors.type && <p className={errorClass}>{errors.type.message}</p>}
        </div>
        <div>
          <label className={labelClass} htmlFor="budget">
            Budget
          </label>
          <select id="budget" className={inputClass} {...register("budget")}>
            <option>$1k - $5k</option>
            <option>$5k - $12k</option>
            <option>$12k+</option>
            <option>Hiring role</option>
            <option>Still defining</option>
          </select>
          {errors.budget && <p className={errorClass}>{errors.budget.message}</p>}
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="message">
          Project brief
        </label>
        <textarea
          id="message"
          rows="7"
          className={`${inputClass} resize-none py-4 leading-7`}
          placeholder="What are you building, what matters most, and what would make this collaboration successful?"
          {...register("message")}
        />
        {errors.message && <p className={errorClass}>{errors.message.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-12 items-center justify-center gap-3 rounded-lg bg-[color:var(--text)] px-5 py-3 text-sm font-semibold text-[#07100b] transition hover:bg-[color:var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Sending..." : "Send message"}
        <Send size={17} />
      </button>

      {status === "sent" && (
        <p className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-4 text-sm text-[color:var(--accent)]">
          Message sent. I will reply with next steps.
        </p>
      )}
      {status === "fallback" && (
        <p className="rounded-lg border border-[color:var(--line)] bg-[color:var(--bg)] p-4 text-sm leading-7 text-[color:var(--muted)]">
          EmailJS environment keys are not configured yet. Your validated message is ready to send:
          {" "}
          <a className="font-semibold text-[color:var(--accent)]" href={mailto}>
            open email draft
          </a>
          .
        </p>
      )}
    </form>
  );
}
