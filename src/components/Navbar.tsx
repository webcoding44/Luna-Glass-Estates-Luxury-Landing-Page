import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import { gsap, ScrollTrigger, scrollToTarget } from "../lib/gsap";
import { Button, Logo } from "./ui";

const links = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "technology", label: "Technology" },
  { id: "process", label: "Process" },
  { id: "journal", label: "Journal" },
  { id: "contact", label: "Contact" },
];

export default function Navbar({ ready }: { ready: boolean }) {
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  // entrance
  useLayoutEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      gsap.from(".nav-item", { y: -30, opacity: 0, stagger: 0.07, duration: 0.9, ease: "power3.out", delay: 0.5 });
    }, root);
    return () => ctx.revert();
  }, [ready]);

  // scroll state + active section
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];
    triggers.push(
      ScrollTrigger.create({
        start: 80,
        end: "max",
        onUpdate: (self) => {
          const el = root.current;
          if (!el) return;
          const scrolled = self.scroll() > 80;
          el.dataset.scrolled = scrolled ? "1" : "0";
          const hide = self.direction === 1 && self.scroll() > 500;
          gsap.to(el, { yPercent: hide ? -110 : 0, duration: 0.5, ease: "power3.out", overwrite: "auto" });
        },
      })
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) => self.isActive && setActive(id),
        })
      );
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  // mobile menu
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
      gsap.fromTo(".m-link", { y: 40, opacity: 0 }, { y: 0, opacity: 1, stagger: 0.06, duration: 0.7, ease: "power3.out", delay: 0.15 });
    }
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    setTimeout(() => scrollToTarget("#" + id), open ? 250 : 0);
  };

  return (
    <>
      <header
        ref={root}
        className="group fixed inset-x-0 top-0 z-50 border-b border-transparent transition-[background,border-color,backdrop-filter] duration-500 data-[scrolled='1']:border-white/5 data-[scrolled='1']:bg-ink/70 data-[scrolled='1']:backdrop-blur-xl"
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 lg:px-10">
          <a
            href="#home"
            className="nav-item"
            onClick={(e) => {
              e.preventDefault();
              go("home");
            }}
          >
            <Logo />
          </a>
          <nav className="hidden items-center gap-8 xl:flex">
            {links.map((l) => (
              <a
                key={l.id}
                href={"#" + l.id}
                className={`nav-item nav-link ${active === l.id ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  go(l.id);
                }}
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-item hidden xl:block">
            <Button variant="ghost" href="#contact" arrow={false} className="!px-6 !py-3">
              Book Consultation
            </Button>
          </div>
          <button
            aria-label="Menu"
            className="nav-item relative z-[70] flex h-11 w-11 items-center justify-center rounded-md border border-white/15 text-white xl:hidden"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] flex flex-col items-start justify-center gap-5 bg-ink/95 px-10 backdrop-blur-xl xl:hidden">
          <div className="absolute inset-0 grid-bg" />
          {links.map((l, i) => (
            <button
              key={l.id}
              onClick={() => go(l.id)}
              className={`m-link relative font-display text-3xl uppercase tracking-[0.15em] ${
                active === l.id ? "text-glow" : "text-white"
              }`}
            >
              <span className="mr-4 text-xs text-slate-500">0{i + 1}</span>
              {l.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
