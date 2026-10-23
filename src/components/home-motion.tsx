"use client";

import {useGSAP} from "@gsap/react";
import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function HomeMotion() {
  useGSAP(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const desktop = gsap.matchMedia();
    desktop.add("(min-width: 1024px)", () => {
      ScrollTrigger.create({
        trigger: ".project-chapter",
        start: "top top+=110",
        end: "bottom bottom-=80",
        pin: ".project-heading",
        pinSpacing: false
      });
      gsap.utils.toArray<HTMLElement>(".project-panel").forEach((panel, index) => {
        gsap.fromTo(panel, {y: 80, scale: .94, opacity: .55}, {
          y: 0, scale: 1, opacity: 1, ease: "none",
          scrollTrigger: {
            trigger: panel,
            start: "top bottom-=90",
            end: "top center+=80",
            scrub: 1
          }
        });
        if (index < 2) {
          gsap.to(panel, {
            scale: .94, opacity: .35, ease: "none",
            scrollTrigger: {
              trigger: gsap.utils.toArray<HTMLElement>(".project-panel")[index + 1],
              start: "top bottom-=150",
              end: "top top+=155",
              scrub: 1
            }
          });
        }
      });
    });
    return () => desktop.revert();
  });
  return null;
}

