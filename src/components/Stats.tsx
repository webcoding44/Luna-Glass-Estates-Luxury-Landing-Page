import { useRef } from "react";
import { Award, Globe, House, Ruler, Star } from "lucide-react";
import { gsap } from "../lib/gsap";
import { useReveal } from "../lib/useReveal";

const stats = [
  { Icon: House, value: 250, suffix: "+", label: "Estates Built", dec: 0 },
  { Icon: Globe, value: 18, suffix: "+", label: "Countries", dec: 0 },
  { Icon: Ruler, value: 1.2, suffix: "M+", label: "Sq.Ft. Built", dec: 1 },
  { Icon: Star, value: 98, suffix: "%", label: "Client Satisfaction", dec: 0 },
  { Icon: Award, value: 15, suffix: "+", label: "Years of Excellence", dec: 0 },
];

export default function Stats() {
  const root = useRef<HTMLElement>(null);

  useReveal(root, () => {
    gsap.utils.toArray<HTMLElement>(".stat-num").forEach((el) => {
      const end = parseFloat(el.dataset.value || "0");
      const dec = parseInt(el.dataset.dec || "0", 10);
      const suffix = el.dataset.suffix || "";
      const o = { v: 0 };
      gsap.to(o, {
        v: end,
        duration: 2.4,
        ease: "power3.out",
        onUpdate: () => {
          el.textContent = o.v.toFixed(dec) + suffix;
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    });
    gsap.from(".stat-icon", {
      rotate: -180,
      scale: 0,
      stagger: 0.1,
      duration: 1,
      ease: "back.out(2)",
      scrollTrigger: { trigger: ".stat-box", start: "top 85%", toggleActions: "play none none reverse" },
    });
    gsap.to(".stat-sweep", { xPercent: 400, duration: 3.5, repeat: -1, repeatDelay: 2, ease: "power2.inOut" });
  });

  return (
    <section ref={root} className="px-6 py-6 lg:px-10">
      <div data-reveal="zoom" className="stat-box glass relative mx-auto max-w-[1400px] overflow-hidden rounded-2xl">
        <div className="stat-sweep pointer-events-none absolute inset-y-0 -left-1/4 w-1/5 -skew-x-12 bg-gradient-to-r from-transparent via-glow/10 to-transparent" />
        <div className="relative grid grid-cols-2 divide-white/5 md:grid-cols-5 md:divide-x">
          {stats.map(({ Icon, value, suffix, label, dec }) => (
            <div key={label} className="group flex flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-center sm:gap-5">
              <Icon size={36} strokeWidth={1.1} className="stat-icon shrink-0 text-glow transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_10px_#38c8f5]" />
              <div className="text-center sm:text-left">
                <div
                  className="stat-num font-display text-3xl font-medium text-white"
                  data-value={value}
                  data-dec={dec}
                  data-suffix={suffix}
                >
                  0{suffix}
                </div>
                <div className="mt-1 font-display text-[0.55rem] uppercase tracking-[0.2em] text-slate-500">{label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
