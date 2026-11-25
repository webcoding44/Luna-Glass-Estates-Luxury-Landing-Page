import { useEffect, useRef, useState, type FormEvent } from "react";
import { Check, Mail, MapPin, Phone, Send } from "lucide-react";
import { gsap } from "../lib/gsap";
import { useReveal } from "../lib/useReveal";
import { Button, SplitChars } from "./ui";

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  useReveal(root, () => {
    gsap.from(".fld", {
      opacity: 0,
      y: 40,
      stagger: 0.09,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: ".contact-form", start: "top 82%", toggleActions: "play none none reverse" },
    });
    gsap.from(".c-info", {
      opacity: 0,
      x: -40,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: { trigger: ".c-infos", start: "top 88%", toggleActions: "play none none reverse" },
    });

    // geometric art: draw lines then breathe
    const polys = gsap.utils.toArray<SVGGeometryElement>(".geo");
    polys.forEach((p, i) => {
      const len = p.getTotalLength();
      gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      gsap.to(p, {
        strokeDashoffset: 0,
        duration: 2.4,
        delay: i * 0.18,
        ease: "power2.inOut",
        scrollTrigger: { trigger: ".geo-wrap", start: "top 90%", toggleActions: "play none none none" },
      });
      gsap.to(p, { opacity: 0.35, duration: 2.5 + i * 0.3, repeat: -1, yoyo: true, ease: "sine.inOut", delay: 3 });
    });
    gsap.to(".geo-wrap svg", { y: -14, rotate: 1.5, duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".geo-wrap", {
      yPercent: -12,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
    });
  });

  useEffect(() => {
    if (status === "sent") {
      gsap.fromTo(".sent-icon", { scale: 0, rotate: -120 }, { scale: 1, rotate: 0, duration: 1, ease: "back.out(2.4)" });
      gsap.fromTo(".sent-txt", { y: 24, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.12, duration: 0.8, delay: 0.3, ease: "power3.out" });
    }
  }, [status]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    gsap.to(".contact-form", { opacity: 0.5, duration: 0.3 });
    setTimeout(() => {
      setStatus("sent");
      gsap.to(".contact-form", { opacity: 1, duration: 0.3 });
    }, 1400);
  };

  const info = [
    { Icon: Mail, t: "hello@lunaglassestates.com" },
    { Icon: Phone, t: "+1 (424) 555-0198" },
    { Icon: MapPin, t: "Beverly Hills, California" },
  ];

  return (
    <section ref={root} id="contact" className="relative overflow-hidden border-t border-white/5 px-6 py-20 lg:px-10 lg:py-28">
      {/* geometry */}
      <div className="geo-wrap pointer-events-none absolute -right-20 bottom-0 top-0 hidden w-[620px] lg:block">
        <svg viewBox="0 0 600 600" className="h-full w-full" fill="none" stroke="#38c8f5" strokeWidth="1.2" style={{ filter: "drop-shadow(0 0 8px rgba(56,200,245,.7))" }}>
          <polygon className="geo" points="300,40 540,180 540,420 300,560 60,420 60,180" />
          <polygon className="geo" points="300,100 490,210 490,390 300,500 110,390 110,210" />
          <polygon className="geo" points="300,160 440,240 440,360 300,440 160,360 160,240" />
          <polygon className="geo" points="300,40 540,180 300,320 60,180" />
          <polygon className="geo" points="300,320 540,180 540,420 300,560" />
          <polygon className="geo" points="300,320 60,180 60,420 300,560" />
          <line className="geo" x1="300" y1="40" x2="300" y2="560" />
        </svg>
      </div>
      <div className="absolute right-0 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-glow/10 blur-[130px]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div>
          <p data-reveal className="eyebrow mb-5">Let's build your legacy</p>
          <h2 data-split className="h-display text-3xl sm:text-4xl [perspective:600px]">
            <SplitChars text="READY TO CREATE" />
            <br />
            <SplitChars text="YOUR FUTURE HOME?" />
          </h2>
          <p data-reveal data-delay="0.1" className="mt-6 max-w-sm text-sm leading-relaxed text-slate-400">
            Share your vision with us and our experts will bring it to life.
          </p>
          <ul className="c-infos mt-10 space-y-5">
            {info.map(({ Icon, t }) => (
              <li key={t} className="c-info group flex items-center gap-4 text-sm text-slate-300">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-glow/40 text-glow transition-all duration-300 group-hover:bg-glow group-hover:text-black group-hover:shadow-[0_0_20px_#38c8f5]">
                  <Icon size={15} />
                </span>
                {t}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative lg:max-w-xl">
          {status === "sent" ? (
            <div className="glass flex min-h-[420px] flex-col items-center justify-center rounded-xl p-10 text-center">
              <span className="sent-icon mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-glow bg-glow/10 text-glow shadow-[0_0_40px_-4px_#38c8f5]">
                <Check size={36} />
              </span>
              <h3 className="sent-txt font-display text-lg uppercase tracking-[0.2em] text-white">Message Sent</h3>
              <p className="sent-txt mt-3 max-w-xs text-sm text-slate-400">Thank you. One of our estate architects will reach out within 24 hours.</p>
              <button onClick={() => setStatus("idle")} className="sent-txt mt-8 text-xs tracking-widest text-glow underline-offset-4 hover:underline">
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="contact-form grid gap-3 sm:grid-cols-2">
              <input required className="field fld" placeholder="Full Name" />
              <input required type="email" className="field fld" placeholder="Email Address" />
              <input className="field fld" placeholder="Phone Number" />
              <input className="field fld" placeholder="Preferred Location" />
              <textarea required rows={5} className="field fld sm:col-span-2" placeholder="Tell us about your project" />
              <div className="fld sm:col-span-2">
                <Button type="submit" arrow={false} className="w-full justify-center" disabled={status === "sending"}>
                  {status === "sending" ? "Sending..." : "Send Message"}
                  <Send size={13} className={`relative z-10 ${status === "sending" ? "animate-pulse" : ""}`} />
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
