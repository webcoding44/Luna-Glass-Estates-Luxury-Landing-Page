import { useLayoutEffect, type RefObject } from "react";
import { gsap } from "./gsap";

/**
 * Generic scroll reveal driven by data attributes inside `scope`:
 *  - data-reveal="up|left|right|zoom|fade"  (+ data-delay)
 *  - data-stagger                            -> animates direct children
 *  - data-split                              -> animates .char children
 *  - data-line                               -> draws a divider (scaleX)
 * `extra` runs inside the same gsap context for custom animation.
 */
export function useReveal(scope: RefObject<HTMLElement | null>, extra?: () => void) {
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const st = (el: Element, start = "top 88%") => ({
        trigger: el,
        start,
        toggleActions: "play none none reverse",
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        const dir = el.dataset.reveal || "up";
        const vars: gsap.TweenVars = {
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: parseFloat(el.dataset.delay || "0"),
          scrollTrigger: st(el),
        };
        if (dir === "up") vars.y = 50;
        if (dir === "left") vars.x = -70;
        if (dir === "right") vars.x = 70;
        if (dir === "zoom") {
          vars.scale = 0.9;
          vars.y = 30;
        }
        gsap.from(el, vars);
      });

      gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
        gsap.from(el.children, {
          opacity: 0,
          y: 60,
          rotateX: -12,
          transformPerspective: 900,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: st(el, "top 85%"),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        const chars = el.querySelectorAll(".char");
        gsap.from(chars, {
          opacity: 0,
          y: 34,
          rotateX: -70,
          transformPerspective: 600,
          duration: 0.9,
          stagger: 0.025,
          ease: "power3.out",
          scrollTrigger: st(el, "top 90%"),
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.6,
          ease: "power3.inOut",
          scrollTrigger: st(el, "top 95%"),
        });
      });

      extra?.();
    }, scope);
    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
