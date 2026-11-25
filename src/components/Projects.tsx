import { useRef } from "react";
import { ArrowRight, Plus } from "lucide-react";
import { gsap } from "../lib/gsap";
import { useReveal } from "../lib/useReveal";
import { SplitChars } from "./ui";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";

const projects = [
  { name: "Azure Peak Residence", place: "Malibu, California", img: p1 },
  { name: "Infinity Horizon", place: "Dubai, UAE", img: p2 },
  { name: "Luna Crest Estate", place: "Lake Como, Italy", img: p3 },
  { name: "Solaris Pavilion", place: "Singapore", img: p4 },
];

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useReveal(root, () => {
    gsap.from(".proj-card", {
      clipPath: "inset(100% 0 0 0)",
      y: 80,
      stagger: 0.15,
      duration: 1.3,
      ease: "power4.out",
      scrollTrigger: { trigger: ".proj-row", start: "top 85%", toggleActions: "play none none reverse" },
    });
    gsap.from(".proj-img", {
      scale: 1.5,
      stagger: 0.15,
      duration: 1.8,
      ease: "power3.out",
      scrollTrigger: { trigger: ".proj-row", start: "top 85%", toggleActions: "play none none reverse" },
    });
    gsap.utils.toArray<HTMLElement>(".proj-img-p").forEach((el, i) => {
      gsap.to(el, {
        yPercent: i % 2 ? -7 : 7,
        ease: "none",
        scrollTrigger: { trigger: ".proj-row", start: "top bottom", end: "bottom top", scrub: true },
      });
    });
  });

  const grow = (i: number, hovering: boolean) => {
    if (!window.matchMedia("(min-width: 1024px)").matches) return;
    const cards = gsap.utils.toArray<HTMLElement>(".proj-card");
    cards.forEach((c, idx) => {
      gsap.to(c, {
        flexGrow: hovering ? (idx === i ? 2.3 : 0.8) : 1,
        duration: 0.8,
        ease: "power3.out",
        overwrite: "auto",
      });
    });
    gsap.to(`.proj-more-${i}`, { opacity: hovering ? 1 : 0, y: hovering ? 0 : 10, duration: 0.5 });
    gsap.to(`.proj-plus-${i}`, { rotate: hovering ? 90 : 0, scale: hovering ? 1.15 : 1, duration: 0.6, ease: "back.out(2)" });
  };

  return (
    <section ref={root} id="projects" className="relative px-6 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-10 flex items-end justify-between">
          <h2 data-split className="h-display text-2xl sm:text-3xl [perspective:600px]">
            <SplitChars text="SIGNATURE PROJECTS" />
          </h2>
          <a data-reveal="right" href="#projects" className="group hidden items-center gap-2 font-display text-[0.6rem] tracking-[0.22em] text-slate-300 transition hover:text-glow sm:inline-flex">
            VIEW ALL PROJECTS
            <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
          </a>
        </div>

        <div className="proj-row flex flex-col gap-4 lg:flex-row">
          {projects.map((p, i) => (
            <article
              key={p.name}
              onMouseEnter={() => grow(i, true)}
              onMouseLeave={() => grow(i, false)}
              className="proj-card group relative h-[340px] min-w-0 cursor-pointer overflow-hidden rounded-xl border border-white/10 transition-[border-color,box-shadow] duration-500 hover:border-glow/50 hover:shadow-[0_0_50px_-12px_rgba(56,200,245,0.55)] lg:h-[400px] lg:flex-1"
            >
              <div className="proj-img-p absolute -inset-y-6 inset-x-0">
                <img src={p.img} alt={p.name} className="proj-img h-full w-full object-cover transition-transform duration-[1.4s] ease-out group-hover:scale-110" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/25 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-5">
                <div>
                  <h3 className="font-display text-[0.72rem] uppercase tracking-[0.12em] text-white">{p.name}</h3>
                  <p className="mt-1 text-xs text-slate-400">{p.place}</p>
                  <span className={`proj-more-${i} mt-3 hidden text-[0.65rem] tracking-widest text-glow opacity-0 lg:block`}>
                    VIEW PROJECT →
                  </span>
                </div>
                <span className={`proj-plus-${i} flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-glow/60 bg-black/40 text-glow backdrop-blur transition-colors group-hover:bg-glow group-hover:text-black`}>
                  <Plus size={16} />
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
