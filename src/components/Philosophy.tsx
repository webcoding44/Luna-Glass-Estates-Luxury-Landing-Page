import { useRef } from "react";
import { ArrowRight, BrainCircuit, Gem, LayoutGrid, Leaf } from "lucide-react";
import { gsap } from "../lib/gsap";
import { useReveal } from "../lib/useReveal";
import { Button, SplitChars, TiltCard } from "./ui";

const cards = [
  { Icon: LayoutGrid, title: "Smart Glass Technology", text: "Dynamic glass that adapts to light, heat, and privacy instantly." },
  { Icon: BrainCircuit, title: "AI-Powered Living", text: "Intelligent systems that learn your preferences and optimize comfort." },
  { Icon: Leaf, title: "Sustainable By Design", text: "Eco-conscious materials and energy systems for a greener tomorrow." },
  { Icon: Gem, title: "Bespoke Experience", text: "Every estate is a unique reflection of your vision and lifestyle." },
];

export default function Philosophy() {
  const root = useRef<HTMLElement>(null);

  useReveal(root, () => {
    gsap.to(".orb-a", { x: 60, y: -40, duration: 9, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.to(".orb-b", { x: -50, y: 50, duration: 11, repeat: -1, yoyo: true, ease: "sine.inOut" });
    gsap.utils.toArray<HTMLElement>(".card-icon").forEach((el) => {
      gsap.from(el, {
        scale: 0,
        rotate: -90,
        duration: 0.9,
        ease: "back.out(2)",
        scrollTrigger: { trigger: el, start: "top 92%", toggleActions: "play none none reverse" },
      });
    });
  });

  return (
    <section ref={root} id="about" className="relative overflow-hidden px-6 py-24 lg:px-10 lg:py-32">
      <div className="orb-a pointer-events-none absolute -left-32 top-10 h-96 w-96 rounded-full bg-glow/10 blur-[120px]" />
      <div className="orb-b pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-blue-600/10 blur-[120px]" />

      <div className="relative mx-auto grid max-w-[1400px] gap-14 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2.2fr)] lg:items-center">
        <div>
          <p data-reveal className="eyebrow mb-5">// Our Philosophy</p>
          <h2 data-split className="h-display text-3xl sm:text-4xl [perspective:600px]">
            <SplitChars text="ARCHITECTURE" />
            <br />
            <SplitChars text="BEYOND LIMITS" />
          </h2>
          <div data-line className="my-7 h-px w-20 bg-glow shadow-[0_0_14px_#38c8f5]" />
          <p data-reveal data-delay="0.1" className="max-w-xs text-sm leading-relaxed text-slate-400">
            We combine vision, technology, and craftsmanship to create iconic glass estates that adapt to your lifestyle and the world around you.
          </p>
          <div data-reveal data-delay="0.2" className="mt-9">
            <Button variant="ghost" href="#technology">
              Discover Our Philosophy
            </Button>
          </div>
        </div>

        <div id="services" data-stagger className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ Icon, title, text }) => (
            <TiltCard key={title} className="glass group flex min-h-[280px] flex-col rounded-xl p-6">
              <div className="card-icon mb-8 flex h-11 w-11 items-center justify-center text-glow transition-transform duration-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_12px_#38c8f5]">
                <Icon size={34} strokeWidth={1.2} />
              </div>
              <h3 className="font-display text-[0.8rem] uppercase leading-snug tracking-[0.12em] text-white">{title}</h3>
              <p className="mt-4 flex-1 text-[0.78rem] leading-relaxed text-slate-400">{text}</p>
              <a href="#technology" className="mt-6 inline-flex items-center gap-2 text-[0.72rem] text-glow">
                Learn More
                <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-2" />
              </a>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}
