import { useRef } from "react";
import { gsap } from "../lib/gsap";
import { useReveal } from "../lib/useReveal";

const brands = [
  { name: "SAINT-GOBAIN", cls: "font-sans font-light tracking-[0.2em] text-base" },
  { name: "SCHÜCO", cls: "font-display font-semibold tracking-[0.18em] text-lg" },
  { name: "LUTRON", cls: "font-display font-bold tracking-[0.12em] text-lg" },
  { name: "CRESTRON", cls: "font-display font-bold italic tracking-[0.05em] text-lg" },
  { name: "TESLA", cls: "font-display font-semibold tracking-[0.35em] text-xl" },
  { name: "SONOS", cls: "font-sans font-semibold tracking-[0.3em] text-lg" },
];

export default function Brands() {
  const root = useRef<HTMLElement>(null);

  useReveal(root, () => {
    const track = root.current!.querySelector(".marquee-track")!;
    const tween = gsap.to(track, { xPercent: -50, duration: 28, ease: "none", repeat: -1 });
    const row = root.current!.querySelector(".marquee")!;
    row.addEventListener("mouseenter", () => gsap.to(tween, { timeScale: 0.2, duration: 0.6 }));
    row.addEventListener("mouseleave", () => gsap.to(tween, { timeScale: 1, duration: 0.6 }));
  });

  const row = [...brands, ...brands, ...brands, ...brands];

  return (
    <section ref={root} className="relative border-y border-white/5 bg-[#060a10] py-9">
      <div className="mx-auto flex max-w-[1400px] items-center gap-8 px-6 lg:px-10">
        <div data-reveal="left" className="hidden shrink-0 font-display text-[0.55rem] tracking-[0.3em] text-slate-500 md:block">
          POWERED BY
        </div>
        <div
          className="marquee relative flex-1 overflow-hidden"
          style={{ maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}
        >
          <div className="marquee-track flex w-max items-center">
            {row.map((b, i) => (
              <span
                key={i}
                className={`${b.cls} mx-10 cursor-default whitespace-nowrap text-slate-500 transition-all duration-500 hover:text-glow hover:[text-shadow:0_0_18px_rgba(56,200,245,0.8)] md:mx-14`}
              >
                {b.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
