import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

/** Scroll progress bar + cursor-following glow (desktop only). */
export default function Effects() {
  const bar = useRef<HTMLDivElement>(null);
  const glow = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(bar.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });

      if (window.matchMedia("(pointer: fine)").matches) {
        const gx = gsap.quickTo(glow.current, "x", { duration: 0.9, ease: "power3.out" });
        const gy = gsap.quickTo(glow.current, "y", { duration: 0.9, ease: "power3.out" });
        const dx = gsap.quickTo(dot.current, "x", { duration: 0.15, ease: "power3.out" });
        const dy = gsap.quickTo(dot.current, "y", { duration: 0.15, ease: "power3.out" });
        const move = (e: MouseEvent) => {
          gx(e.clientX - 250);
          gy(e.clientY - 250);
          dx(e.clientX - 4);
          dy(e.clientY - 4);
        };
        window.addEventListener("mousemove", move);
        const over = (e: MouseEvent) => {
          const hit = (e.target as HTMLElement).closest("a,button,input,textarea,article");
          gsap.to(dot.current, { scale: hit ? 3.2 : 1, opacity: hit ? 0.5 : 1, duration: 0.35 });
        };
        window.addEventListener("mouseover", over);
        return () => {
          window.removeEventListener("mousemove", move);
          window.removeEventListener("mouseover", over);
        };
      }
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-[80] h-[2px] bg-transparent">
        <div ref={bar} className="h-full origin-left scale-x-0 bg-glow shadow-[0_0_12px_#38c8f5]" />
      </div>
      <div
        ref={glow}
        className="pointer-events-none fixed left-0 top-0 z-[5] hidden h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,rgba(56,200,245,0.10),transparent_65%)] [@media(pointer:fine)]:block"
      />
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[95] hidden h-2 w-2 rounded-full bg-glow mix-blend-screen shadow-[0_0_12px_#38c8f5] [@media(pointer:fine)]:block"
      />
    </>
  );
}
