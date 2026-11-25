import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Quote } from "lucide-react";
import { gsap } from "../lib/gsap";
import { useReveal } from "../lib/useReveal";
import { SplitChars, TiltCard } from "./ui";

const reviews = [
  { q: "Luna Glass Estates turned our dream into a breathtaking reality. Every detail is beyond extraordinary.", n: "Alexander M.", c: "Los Angeles, CA" },
  { q: "The smart features and seamless design make our home feel like it's from the future.", n: "Sofia R.", c: "Dubai, UAE" },
  { q: "Their team's vision, professionalism, and craftsmanship are unmatched in the industry.", n: "James T.", c: "London, UK" },
  { q: "From the first sketch to the final handover, the process was effortless and inspiring.", n: "Elena V.", c: "Lake Como, IT" },
  { q: "Light, glass and technology in perfect harmony. We wake up inside a work of art.", n: "Kenji H.", c: "Singapore" },
  { q: "An estate that adapts to us — climate, privacy, mood. Absolutely flawless execution.", n: "Marcus L.", c: "Miami, FL" },
];

function useVisible() {
  const [v, setV] = useState(3);
  useEffect(() => {
    const f = () => setV(window.innerWidth >= 1024 ? 3 : window.innerWidth >= 640 ? 2 : 1);
    f();
    window.addEventListener("resize", f);
    return () => window.removeEventListener("resize", f);
  }, []);
  return v;
}

export default function Testimonials() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const paused = useRef(false);
  const idxRef = useRef(0);
  const visible = useVisible();
  const max = reviews.length - visible;

  useReveal(root);

  const goTo = useCallback((i: number) => {
    setIdx(i);
    idxRef.current = i;
    const t = track.current;
    if (!t) return;
    const w = (t.children[0] as HTMLElement).offsetWidth;
    gsap.to(t, { x: -i * w, duration: 1, ease: "power4.inOut" });
    gsap.fromTo(
      Array.from(t.children).slice(i, i + visible).map((c) => c.querySelector(".rv-inner")),
      { opacity: 0.3, y: 20 },
      { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, delay: 0.25, ease: "power3.out" }
    );
  }, [visible]);

  useEffect(() => {
    if (idx > max) goTo(0);
  }, [max, idx, goTo]);

  useEffect(() => {
    const id = setInterval(() => {
      if (paused.current) return;
      const cur = idxRef.current;
      goTo(cur >= max ? 0 : cur + 1);
    }, 5200);
    return () => clearInterval(id);
  }, [max, goTo]);

  return (
    <section ref={root} id="journal" className="relative px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-end justify-between">
          <h2 data-split className="h-display text-xl sm:text-2xl [perspective:600px]">
            <SplitChars text="WHAT OUR CLIENTS SAY" />
          </h2>
          <a data-reveal="right" href="#journal" className="group hidden items-center gap-2 font-display text-[0.6rem] tracking-[0.22em] text-glow sm:inline-flex">
            VIEW ALL REVIEWS
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
          </a>
        </div>

        <div
          data-reveal="up"
          className="overflow-hidden py-2"
          onMouseEnter={() => (paused.current = true)}
          onMouseLeave={() => (paused.current = false)}
        >
          <div ref={track} className="flex">
            {reviews.map((r, i) => (
              <div key={i} className="w-full shrink-0 px-2 sm:w-1/2 lg:w-1/3">
                <TiltCard max={4} className="glass rv-card h-full rounded-xl p-7">
                  <div className="rv-inner">
                    <Quote size={22} className="mb-4 text-glow/70" />
                    <p className="min-h-[84px] text-[0.85rem] leading-relaxed text-slate-300">“{r.q}”</p>
                    <div className="mt-7 flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-glow to-blue-700 font-display text-xs font-semibold text-black ring-2 ring-white/10">
                        {r.n[0]}
                      </span>
                      <div>
                        <div className="font-display text-[0.62rem] uppercase tracking-[0.18em] text-white">{r.n}</div>
                        <div className="mt-0.5 text-[0.7rem] text-slate-500">{r.c}</div>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-2.5">
          {Array.from({ length: max + 1 }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === idx ? "w-8 bg-glow shadow-[0_0_10px_#38c8f5]" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
