import { useLayoutEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import { Logo } from "./ui";

export default function Preloader({ onExit, onDone }: { onExit: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const counter = { v: 0 };
    const numEl = root.current!.querySelector<HTMLElement>(".pl-num")!;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      tl.from(".pl-logo", { opacity: 0, scale: 0.85, duration: 0.9, ease: "power3.out" })
        .from(".logo-moon", { strokeDasharray: 120, strokeDashoffset: 120, duration: 1.4, ease: "power2.inOut" }, 0)
        .to(counter, {
          v: 100,
          duration: 1.9,
          ease: "power2.inOut",
          onUpdate: () => {
            numEl.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        }, 0.2)
        .to(".pl-bar", { scaleX: 1, duration: 1.9, ease: "power2.inOut" }, 0.2)
        .to(".pl-meta", { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" }, ">+0.15")
        .to(".pl-logo", { opacity: 0, y: -30, duration: 0.5, ease: "power2.in" }, "<")
        .add(() => onExit())
        .to(".pl-panel-a", { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, "<")
        .to(".pl-panel-b", { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, "<+0.12")
        .add(() => onDone());
    }, root);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={root} className="fixed inset-0 z-[100]">
      <div className="pl-panel-b absolute inset-0 bg-[#0b2a38]" />
      <div className="pl-panel-a absolute inset-0 flex flex-col items-center justify-center bg-ink">
        <div className="absolute inset-0 grid-bg opacity-70" />
        <div className="pl-logo relative">
          <Logo className="scale-125" />
        </div>
        <div className="pl-meta relative mt-14 w-64">
          <div className="mb-3 flex items-end justify-between font-display text-[0.6rem] tracking-[0.3em] text-slate-500">
            <span>INITIALIZING</span>
            <span className="pl-num text-lg text-glow">000</span>
          </div>
          <div className="h-px w-full bg-white/10">
            <div className="pl-bar h-px origin-left scale-x-0 bg-glow shadow-[0_0_12px_#38c8f5]" />
          </div>
        </div>
      </div>
    </div>
  );
}
