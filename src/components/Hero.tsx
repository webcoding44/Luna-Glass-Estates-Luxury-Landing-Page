import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Blinds, Lightbulb, ShieldCheck, Thermometer, ChevronDown } from "lucide-react";
import { gsap } from "../lib/gsap";
import { Button, SplitChars } from "./ui";
import heroImg from "../assets/hero.jpg";

const controls = [
  { label: "Lighting", Icon: Lightbulb },
  { label: "Climate", Icon: Thermometer },
  { label: "Security", Icon: ShieldCheck },
  { label: "Shades", Icon: Blinds },
];

export default function Hero({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [on, setOn] = useState([true, true, true, false]);

  const particles = useMemo(
    () =>
      Array.from({ length: 34 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 20 + Math.random() * 80,
        size: 1 + Math.random() * 2.5,
      })),
    []
  );

  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.from(".hero-img", { scale: 1.4, opacity: 0, duration: 2.6, ease: "power2.out" }, 0)
        .from(".hero-shade", { opacity: 0, duration: 2 }, 0)
        .from(".hero-badge", { y: 20, opacity: 0, duration: 0.9 }, 0.5)
        .from(".hero-char", { yPercent: 130, rotateX: -90, opacity: 0, stagger: 0.04, duration: 1.2, transformOrigin: "50% 100%" }, 0.6)
        .from(".hero-sub", { y: 30, opacity: 0, duration: 1 }, 1.3)
        .from(".hero-cta", { y: 30, opacity: 0, stagger: 0.12, duration: 0.9 }, 1.5)
        .from(".hero-card", { x: 90, opacity: 0, duration: 1.3 }, 1.4)
        .from(".hero-card-icon", { scale: 0, stagger: 0.09, ease: "back.out(2.4)", duration: 0.7 }, 2)
        .from(".hero-scroll", { opacity: 0, y: -20, duration: 1 }, 2.2);

      // glow flicker on "TODAY."
      gsap.to(".hero-today", {
        textShadow: "0 0 40px rgba(56,200,245,1), 0 0 90px rgba(56,200,245,.6)",
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });

      // floating card
      gsap.to(".hero-card-float", { y: -12, duration: 3.2, repeat: -1, yoyo: true, ease: "sine.inOut" });

      // scanning line
      gsap.fromTo(".scan-line", { top: "0%", opacity: 0.8 }, { top: "100%", opacity: 0, duration: 5.5, repeat: -1, ease: "power1.in" });

      // particles
      gsap.utils.toArray<HTMLElement>(".particle").forEach((p) => {
        gsap.to(p, {
          y: -gsap.utils.random(80, 260),
          x: gsap.utils.random(-40, 40),
          opacity: gsap.utils.random(0.2, 0.9),
          duration: gsap.utils.random(5, 11),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: gsap.utils.random(0, 3),
        });
      });

      // mouse parallax
      const xImg = gsap.quickTo(".hero-img-mouse", "x", { duration: 1.2, ease: "power3.out" });
      const yImg = gsap.quickTo(".hero-img-mouse", "y", { duration: 1.2, ease: "power3.out" });
      const move = (e: MouseEvent) => {
        xImg((e.clientX / window.innerWidth - 0.5) * -30);
        yImg((e.clientY / window.innerHeight - 0.5) * -20);
      };
      window.addEventListener("mousemove", move);

      // scroll parallax
      gsap.to(".hero-img-wrap", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-content", {
        y: -90,
        opacity: 0.1,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom 20%", scrub: true },
      });

      return () => window.removeEventListener("mousemove", move);
    }, root);
    return () => ctx.revert();
  }, [ready]);

  const toggle = (i: number) => {
    setOn((s) => s.map((v, idx) => (idx === i ? !v : v)));
    gsap.fromTo(`.hero-card-icon-${i}`, { scale: 0.7 }, { scale: 1, duration: 0.7, ease: "elastic.out(1.2,0.4)" });
  };

  const lines = ["BUILDING", "TOMORROW."];

  return (
    <section ref={root} id="home" className="relative min-h-[100svh] overflow-hidden bg-ink">
      {/* image */}
      <div className="hero-img-wrap absolute inset-0">
        <div className="hero-img-mouse absolute -inset-10">
          <img
            src={heroImg}
            alt="Luna glass mansion at night"
            className="hero-img h-full w-full object-cover object-[70%_center]"
          />
        </div>
      </div>
      <div className="hero-shade absolute inset-0 bg-[linear-gradient(90deg,#04070b_8%,rgba(4,7,11,0.82)_38%,rgba(4,7,11,0.1)_75%)]" />
      <div className="hero-shade absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,11,0.65)_0%,transparent_28%,transparent_70%,#04070b_100%)]" />
      <div className="scan-line pointer-events-none absolute inset-x-0 z-[1] h-px bg-gradient-to-r from-transparent via-glow to-transparent shadow-[0_0_20px_2px_rgba(56,200,245,0.6)]" />

      {/* particles */}
      <div className="pointer-events-none absolute inset-0 z-[1]">
        {particles.map((p) => (
          <span
            key={p.id}
            className="particle absolute rounded-full bg-glow-soft opacity-30"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size, boxShadow: "0 0 8px #38c8f5" }}
          />
        ))}
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1400px] flex-col justify-center px-6 pb-24 pt-32 lg:px-10">
        <div className="hero-content max-w-2xl">
          <div className="hero-badge mb-8 inline-flex items-center gap-3 rounded border border-white/15 bg-white/[0.04] px-4 py-2 backdrop-blur">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-glow shadow-[0_0_10px_#38c8f5]" />
            <span className="font-display text-[0.58rem] tracking-[0.25em] text-slate-300">
              FUTURISTIC &nbsp;•&nbsp; SMART &nbsp;•&nbsp; SUSTAINABLE
            </span>
          </div>

          <h1 className="font-display text-[2.6rem] font-medium leading-[1.12] tracking-[0.1em] sm:text-6xl lg:text-[4.6rem]">
            {lines.map((l) => (
              <span key={l} className="block overflow-hidden pb-1 text-slate-100 [perspective:700px]">
                <SplitChars text={l} charClass="hero-char" />
              </span>
            ))}
            <span className="hero-today glow-text block overflow-hidden pb-2 [perspective:700px]">
              <SplitChars text="TODAY." charClass="hero-char" />
            </span>
          </h1>

          <p className="hero-sub mt-8 max-w-md text-[0.95rem] leading-relaxed text-slate-300/90">
            Luna Glass Estates crafts ultra-modern <strong className="font-semibold text-white">smart-glass mansions</strong>{" "}
            that redefine luxury living.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <div className="hero-cta">
              <Button href="#contact">Start Your Journey</Button>
            </div>
            <div className="hero-cta">
              <Button variant="ghost" href="#projects">
                Explore Projects
              </Button>
            </div>
          </div>
        </div>

        {/* smart status card */}
        <div className="hero-card mt-14 w-full max-w-sm lg:absolute lg:bottom-24 lg:right-10 lg:mt-0">
          <div className="hero-card-float glass rounded-xl p-5">
            <div className="flex items-start justify-between">
              <div>
                <div className="font-display text-[0.55rem] tracking-[0.25em] text-slate-300">SMART HOME STATUS</div>
                <div className="mt-1 text-[0.7rem] text-slate-500">All Systems Operational</div>
              </div>
              <span className="relative flex h-6 w-6 items-center justify-center rounded-full border border-glow/50">
                <span className="absolute h-full w-full animate-ping rounded-full bg-glow/30" />
                <span className="h-1.5 w-1.5 rounded-full bg-glow" />
              </span>
            </div>
            <div className="mt-5 grid grid-cols-4 gap-2">
              {controls.map(({ label, Icon }, i) => (
                <button
                  key={label}
                  onClick={() => toggle(i)}
                  className="hero-card-icon group flex flex-col items-center gap-2"
                >
                  <span
                    className={`hero-card-icon-${i} flex h-11 w-11 items-center justify-center rounded-lg border transition-all duration-300 ${
                      on[i]
                        ? "border-glow/70 bg-glow/10 text-glow shadow-[0_0_20px_-2px_rgba(56,200,245,0.7)]"
                        : "border-white/10 text-slate-500 group-hover:border-white/30"
                    }`}
                  >
                    <Icon size={18} />
                  </span>
                  <span className="text-[0.62rem] text-slate-400">{label}</span>
                </button>
              ))}
            </div>
            <a href="#technology" className="mt-5 block text-center font-display text-[0.55rem] tracking-[0.25em] text-glow hover:text-white">
              VIEW DASHBOARD
            </a>
          </div>
        </div>
      </div>

      <div className="hero-scroll absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 md:flex">
        <span className="font-display text-[0.5rem] tracking-[0.35em]">SCROLL</span>
        <ChevronDown size={16} className="animate-bounce text-glow" />
      </div>
    </section>
  );
}
