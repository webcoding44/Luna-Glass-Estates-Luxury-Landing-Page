import { useRef } from "react";
import { gsap } from "../lib/gsap";
import { useReveal } from "../lib/useReveal";
import { SplitChars } from "./ui";

const steps = [
  { t: "Discover", d: "Understanding your vision and lifestyle." },
  { t: "Design", d: "Crafting a bespoke architectural concept." },
  { t: "Engineer", d: "Precision planning with advanced technology." },
  { t: "Build", d: "Expert construction with excellence." },
  { t: "Deliver", d: "Flawless handover and ongoing support." },
];

export default function Process() {
  const root = useRef<HTMLElement>(null);

  useReveal(root, () => {
    gsap.set(".step", { opacity: 0.3, y: 10 });
    gsap.set(".dot-ring", { scale: 0.4, opacity: 0 });
    gsap.set(".step-dot", { backgroundColor: "#0b1a24" });
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".proc-steps",
        start: "top 75%",
        end: "bottom 35%",
        scrub: 1,
      },
    });
    tl.fromTo(".proc-line", { scaleX: 0 }, { scaleX: 1, ease: "none", duration: 1, transformOrigin: "left center" }, 0);
    steps.forEach((_, i) => {
      const at = i * 0.2;
      tl.to(`.dot-${i}`, { backgroundColor: "#38c8f5", scale: 1.7, boxShadow: "0 0 22px 4px rgba(56,200,245,.8)", duration: 0.08 }, at)
        .to(`.step-${i}`, { opacity: 1, y: 0, duration: 0.1 }, at)
        .to(`.ring-${i}`, { scale: 1, opacity: 1, duration: 0.1 }, at);
    });

    gsap.to(".dot-ring", { rotate: 360, duration: 6, repeat: -1, ease: "none" });
  });

  return (
    <section ref={root} id="process" className="relative border-t border-white/5 px-6 py-20 lg:px-10 lg:py-24">
      <div data-line className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glow/60 to-transparent" />
      <div className="mx-auto grid max-w-[1400px] gap-12 lg:grid-cols-[220px_1fr]">
        <div>
          <p data-reveal className="eyebrow mb-4">How we work</p>
          <h2 data-split className="h-display text-3xl [perspective:600px]">
            <SplitChars text="OUR" />
            <br />
            <SplitChars text="PROCESS" />
          </h2>
        </div>

        <div className="proc-steps relative grid gap-10 md:grid-cols-5 md:gap-4">
          <div className="absolute left-1.5 right-0 top-[7px] hidden h-px bg-white/10 md:block">
            <div className="proc-line h-px w-full bg-glow shadow-[0_0_12px_#38c8f5]" />
          </div>
          {steps.map((s, i) => (
            <div key={s.t} className={`step step-${i} relative pl-8 md:pl-0 md:pt-10`}>
              <span className={`absolute left-0 top-0 flex h-4 w-4 items-center justify-center`}>
                <span className={`dot-ring ring-${i} absolute -inset-2 rounded-full border border-dashed border-glow/70`} />
                <span className={`step-dot dot-${i} h-2.5 w-2.5 rounded-full border border-glow/80`} />
              </span>
              <div className="font-display text-xl text-slate-500">0{i + 1}</div>
              <h3 className="mt-2 font-display text-[0.7rem] uppercase tracking-[0.2em] text-white">{s.t}</h3>
              <p className="mt-2 max-w-[180px] text-xs leading-relaxed text-slate-400">{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
