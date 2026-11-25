import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export { gsap, ScrollTrigger };

export function scrollToTarget(target: string) {
  gsap.to(window, {
    scrollTo: { y: target, offsetY: 64 },
    duration: 1.4,
    ease: "power3.inOut",
  });
}
