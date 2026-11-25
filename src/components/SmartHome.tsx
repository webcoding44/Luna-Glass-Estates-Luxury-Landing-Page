import { useRef, useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { gsap } from "../lib/gsap";
import { useReveal } from "../lib/useReveal";
import { Button, SplitChars } from "./ui";
import smartImg from "../assets/smart.jpg";

const features = [
  "Automated Climate Control",
  "Energy Management",
  "Adaptive Lighting",
  "Voice & App Integration",
  "Advanced Security",
  "Wellness & Comfort",
];

export default function SmartHome() {
  const root = useRef<HTMLElement>(null);
  const [temp, setTemp] = useState(21);
  const [light, setLight] = useState(72);

  useReveal(root, () => {
    // image curtain reveal
    gsap.from(".sh-media", {
      clipPath: "inset(0 100% 0 0)",
      duration: 1.6,
      ease: "power4.inOut",
      scrollTrigger: { trigger: root.current, start: "top 70%", toggleActions: "play none none reverse" },
    });
    gsap.from(".sh-img", {
      scale: 1.4,
      duration: 2.2,
      ease: "power3.out",
      scrollTrigger: { trigger: root.current, start: "top 70%", toggleActions: "play none none reverse" },
    });
    gsap.to(".sh-img", {
      yPercent: -8,
      ease: "none",
      scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
    });

    // hub rings
    gsap.to(".ring-a", { rotate: 360, duration: 22, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
    gsap.to(".ring-b", { rotate: -360, duration: 14, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
    gsap.to(".ring-c", { rotate: 360, duration: 8, repeat: -1, ease: "none", transformOrigin: "50% 50%" });
    gsap.to(".hub-core", { scale: 1.25, opacity: 0.6, duration: 1.4, repeat: -1, yoyo: true, ease: "sine.inOut", transformOrigin: "50% 50%" });
    gsap.to(".chip", { y: -8, duration: 2.6, repeat: -1, yoyo: true, ease: "sine.inOut", stagger: { each: 0.5, from: "random" } });

    gsap.from(".sh-chip-in", {
      opacity: 0,
      scale: 0.6,
      stagger: 0.2,
      duration: 0.9,
      ease: "back.out(2)",
      scrollTrigger: { trigger: root.current, start: "top 55%", toggleActions: "play none none reverse" },
    });

    gsap.from(".feat", {
      opacity: 0,
      x: 40,
      stagger: 0.09,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".feat-list", start: "top 88%", toggleActions: "play none none reverse" },
    });
    gsap.from(".feat-check", {
      scale: 0,
      stagger: 0.09,
      duration: 0.6,
      ease: "back.out(3)",
      delay: 0.25,
      scrollTrigger: { trigger: ".feat-list", start: "top 88%", toggleActions: "play none none reverse" },
    });
  });

  const bump = (fn: () => void) => {
    fn();
    gsap.fromTo(".temp-val", { scale: 1.4, color: "#fff" }, { scale: 1, color: "#38c8f5", duration: 0.5, ease: "back.out(3)" });
  };

  return (
    <section ref={root} id="technology" className="relative border-y border-white/5 bg-[#050910]">
      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[1.25fr_1fr]">
        <div className="sh-media relative min-h-[420px] overflow-hidden lg:min-h-[560px]">
          <img src={smartImg} alt="Smart home interior" className="sh-img absolute inset-0 h-[115%] w-full object-cover" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,9,16,0.1),#050910_98%)] max-lg:bg-[linear-gradient(180deg,transparent,#050910)]" />

          {/* holographic hub */}
          <div className="absolute left-[10%] top-[34%] h-56 w-56 sm:left-[16%] sm:h-64 sm:w-64">
            <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full overflow-visible">
              <circle className="ring-a" cx="100" cy="100" r="92" fill="none" stroke="#38c8f5" strokeWidth="1" strokeDasharray="4 8" opacity="0.8" />
              <circle className="ring-b" cx="100" cy="100" r="72" fill="none" stroke="#7fdcff" strokeWidth="1.2" strokeDasharray="60 20 10 20" opacity="0.7" />
              <circle className="ring-c" cx="100" cy="100" r="52" fill="none" stroke="#38c8f5" strokeWidth="2" strokeDasharray="30 90" strokeLinecap="round" />
              <circle className="hub-core" cx="100" cy="100" r="22" fill="#38c8f5" opacity="0.9" style={{ filter: "drop-shadow(0 0 18px #38c8f5)" }} />
              <circle cx="100" cy="100" r="10" fill="#e6faff" />
            </svg>
          </div>

          {/* interactive chips */}
          <div className="sh-chip-in chip glass absolute bottom-8 left-6 rounded-lg px-4 py-3 sm:left-12">
            <div className="font-display text-[0.5rem] tracking-[0.25em] text-slate-400">CLIMATE</div>
            <div className="mt-1 flex items-center gap-3">
              <button aria-label="cooler" onClick={() => bump(() => setTemp((t) => Math.max(16, t - 1)))} className="rounded border border-white/15 p-1 text-slate-300 transition hover:border-glow hover:text-glow">
                <Minus size={12} />
              </button>
              <span className="temp-val w-12 text-center font-display text-lg text-glow">{temp}°C</span>
              <button aria-label="warmer" onClick={() => bump(() => setTemp((t) => Math.min(28, t + 1)))} className="rounded border border-white/15 p-1 text-slate-300 transition hover:border-glow hover:text-glow">
                <Plus size={12} />
              </button>
            </div>
          </div>
          <div className="sh-chip-in chip glass absolute bottom-8 left-44 hidden rounded-lg px-4 py-3 sm:left-60 sm:block">
            <div className="font-display text-[0.5rem] tracking-[0.25em] text-slate-400">AMBIENT LIGHT · {light}%</div>
            <input
              type="range"
              min={0}
              max={100}
              value={light}
              onChange={(e) => setLight(+e.target.value)}
              className="mt-2 h-1 w-36 cursor-pointer appearance-none rounded bg-white/15 accent-[#38c8f5]"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center px-6 py-16 lg:px-14 xl:px-20">
          <p data-reveal className="eyebrow mb-4">Innovation at every level</p>
          <h2 data-split className="h-display text-3xl sm:text-4xl [perspective:600px]">
            <SplitChars text="SMART HOME." />
            <br />
            <SplitChars text="INTELLIGENT LIVING." />
          </h2>
          <p data-reveal data-delay="0.1" className="mt-6 max-w-md text-sm leading-relaxed text-slate-400">
            Control your environment with a touch, a voice, or automatically — from anywhere in the world.
          </p>
          <ul className="feat-list mt-8 grid gap-x-8 gap-y-4 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="feat flex items-center gap-3 text-[0.8rem] text-slate-300">
                <span className="feat-check flex h-5 w-5 items-center justify-center rounded-full border border-glow/60 text-glow">
                  <Check size={11} />
                </span>
                {f}
              </li>
            ))}
          </ul>
          <div data-reveal data-delay="0.2" className="mt-10">
            <Button variant="ghost" href="#process">
              Explore Technology
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
