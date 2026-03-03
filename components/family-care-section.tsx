"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function FamilyCareSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24 lg:py-32 bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h2
              className="text-[#2F3E4E] font-semibold text-[36px] sm:text-[42px] lg:text-[48px] leading-[120%] tracking-[0%]"
              style={{
                fontFamily:
                  "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              Care that feels like family.
            </h2>

            <p
              className="text-[#2F3E4E] font-normal text-[16px] sm:text-[18px] leading-[120%] tracking-[0%]"
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              The right match feels obvious.
            </p>

            <p
              className="text-[#2F3E4E] font-normal text-[16px] sm:text-[18px] leading-[120%] tracking-[0%]"
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              Your dog is calm. You feel confident. And everyone looks forward to
              the next stay.
            </p>

            <p
              className="text-[#2F3E4E] font-semibold text-[16px] sm:text-[18px] leading-[120%] tracking-[0%]"
              style={{
                fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              That's the standard.
            </p>
          </div>

          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <div className="relative w-full max-w-[600px] mx-auto lg:ml-auto">
              <Image
                src="/familycare.png"
                alt="Family with baby and dog"
                width={600}
                height={450}
                className="w-full h-auto rounded-[20px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
