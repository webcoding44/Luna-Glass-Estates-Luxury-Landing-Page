import { useEffect, useRef, type ReactNode, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";
import { gsap, scrollToTarget } from "../lib/gsap";

/* ---------------- Logo ---------------- */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg viewBox="0 0 48 48" className="h-9 w-9 overflow-visible" fill="none">
        <path
          className="logo-moon"
          d="M34 8 A18 18 0 1 0 34 40 A17 17 0 0 1 34 8Z"
          stroke="#38c8f5"
          strokeWidth="2"
          strokeLinejoin="round"
          style={{ filter: "drop-shadow(0 0 6px rgba(56,200,245,.9))" }}
        />
        <circle cx="30" cy="24" r="1.6" fill="#7fdcff" />
      </svg>
      <div className="leading-none">
        <div className="font-display text-xl font-semibold tracking-[0.28em] text-white">LUNA</div>
        <div className="mt-1 font-display text-[0.45rem] tracking-[0.34em] text-slate-400">GLASS ESTATES</div>
      </div>
    </div>
  );
}

/* ---------------- Split text ---------------- */
export function SplitChars({
  text,
  className = "",
  charClass = "char",
}: {
  text: string;
  className?: string;
  charClass?: string;
}) {
  const words = text.split(" ");
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} aria-hidden="true">
          {i > 0 && " "}
          <span className="inline-block whitespace-nowrap">
            {[...w].map((c, j) => (
              <span key={j} className={`${charClass} inline-block will-change-transform`}>
                {c}
              </span>
            ))}
          </span>
        </span>
      ))}
    </span>
  );
}

/* ---------------- Button ---------------- */
type BtnProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  href?: string;
  arrow?: boolean;
  className?: string;
  type?: "button" | "submit";
  onClick?: () => void;
  disabled?: boolean;
};

export function Button({
  children,
  variant = "primary",
  href,
  arrow = true,
  className = "",
  type = "button",
  onClick,
  disabled,
}: BtnProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(pointer: coarse)").matches) return;
    const xTo = gsap.quickTo(el, "x", { duration: 0.6, ease: "elastic.out(1, 0.55)" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.6, ease: "elastic.out(1, 0.55)" });
    const move = (e: globalThis.MouseEvent) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
      yTo((e.clientY - (r.top + r.height / 2)) * 0.4);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    el.addEventListener("mousemove", move);
    el.addEventListener("mouseleave", leave);
    return () => {
      el.removeEventListener("mousemove", move);
      el.removeEventListener("mouseleave", leave);
      gsap.set(el, { clearProps: "x,y" });
    };
  }, []);

  const cls = `btn ${variant === "primary" ? "btn-primary" : "btn-ghost"} group ${className}`;
  const inner = (
    <>
      <span className="relative z-10">{children}</span>
      {arrow && (
        <ArrowRight className="relative z-10 h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" />
      )}
    </>
  );

  if (href) {
    return (
      <a
        ref={(n) => {
          ref.current = n;
        }}
        href={href}
        className={cls}
        onClick={(e) => {
          if (href.startsWith("#")) {
            e.preventDefault();
            scrollToTarget(href);
          }
          onClick?.();
        }}
      >
        {inner}
      </a>
    );
  }
  return (
    <button
      ref={(n) => {
        ref.current = n;
      }}
      type={type}
      className={cls}
      onClick={onClick}
      disabled={disabled}
    >
      {inner}
    </button>
  );
}

/* ---------------- Tilt + spotlight card ---------------- */
export function TiltCard({
  children,
  className = "",
  max = 8,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    gsap.to(el, {
      rotateY: (px - 0.5) * max * 2,
      rotateX: -(py - 0.5) * max * 2,
      transformPerspective: 900,
      duration: 0.5,
      ease: "power2.out",
    });
  };
  const onLeave = () => {
    if (ref.current)
      gsap.to(ref.current, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "elastic.out(1, 0.6)" });
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} className={`spot ${className}`}>
      {children}
    </div>
  );
}

/* ---------------- Social icons (inline svg) ---------------- */
const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
export const InstagramIcon = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
  </svg>
);
export const FacebookIcon = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z" />
  </svg>
);
export const LinkedinIcon = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <path d="M6 9v10M6 5v.01M11 19V9m0 4a4 4 0 0 1 8 0v6" />
  </svg>
);
export const YoutubeIcon = ({ className = "h-4 w-4" }) => (
  <svg viewBox="0 0 24 24" className={className} {...stroke}>
    <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
    <path d="M10 9.5v5l4.5-2.5z" />
  </svg>
);
