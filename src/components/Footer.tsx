import { useRef } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { useReveal } from "../lib/useReveal";
import { scrollToTarget } from "../lib/gsap";
import { FacebookIcon, InstagramIcon, LinkedinIcon, Logo, YoutubeIcon } from "./ui";

const quick = [
  ["About Us", "about"],
  ["Technology", "technology"],
  ["Services", "services"],
  ["Process", "process"],
  ["Projects", "projects"],
  ["Journal", "journal"],
];
const services = ["Smart Glass Architecture", "Luxury Estates", "Renovations", "Interior Design", "Consulting"];

export default function Footer() {
  const root = useRef<HTMLElement>(null);
  useReveal(root);

  const h = "mb-5 font-display text-[0.6rem] uppercase tracking-[0.25em] text-white";
  const socials = [InstagramIcon, FacebookIcon, LinkedinIcon, YoutubeIcon];

  return (
    <footer ref={root} className="relative border-t border-white/5 bg-[#03060a] px-6 pt-16 lg:px-10">
      <div data-line className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-glow to-transparent" />
      <div data-stagger className="mx-auto grid max-w-[1400px] gap-10 pb-14 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_1.3fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-[220px] text-xs leading-relaxed text-slate-500">Building the world's most extraordinary glass estates.</p>
        </div>
        <div>
          <h4 className={h}>Quick Links</h4>
          <ul className="space-y-3 text-xs text-slate-400">
            {quick.map(([l, id]) => (
              <li key={l}>
                <button onClick={() => scrollToTarget("#" + id)} className="transition-all hover:translate-x-1 hover:text-glow">
                  {l}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={h}>Services</h4>
          <ul className="space-y-3 text-xs text-slate-400">
            {services.map((s) => (
              <li key={s} className="cursor-default transition-all hover:translate-x-1 hover:text-glow">
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className={h}>Contact</h4>
          <ul className="space-y-3 text-xs text-slate-400">
            <li className="flex items-center gap-3"><Mail size={13} className="text-glow" /> hello@lunaglassestates.com</li>
            <li className="flex items-center gap-3"><Phone size={13} className="text-glow" /> +1 (424) 555-0198</li>
            <li className="flex items-center gap-3"><MapPin size={13} className="text-glow" /> Beverly Hills, California</li>
          </ul>
        </div>
        <div>
          <h4 className={h}>Follow Us</h4>
          <div className="flex gap-3">
            {socials.map((Icon, i) => (
              <a
                key={i}
                href="#home"
                onClick={(e) => e.preventDefault()}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-slate-400 transition-all duration-300 hover:-translate-y-1 hover:border-glow hover:text-glow hover:shadow-[0_0_18px_-2px_#38c8f5]"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-3 border-t border-white/5 py-6 text-[0.68rem] text-slate-600 sm:flex-row">
        <span>© 2025 Luna Glass Estates. All rights reserved.</span>
        <span className="flex gap-6">
          <a href="#home" onClick={(e) => e.preventDefault()} className="hover:text-glow">Privacy Policy</a>
          <a href="#home" onClick={(e) => e.preventDefault()} className="hover:text-glow">Terms of Service</a>
        </span>
      </div>
    </footer>
  );
}
