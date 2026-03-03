"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function EnergyMatchSection() {
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

  const criteria = [
    "Energy compatibility",
    "Size comfort",
    "Behavioral experience",
    "Medical comfort",
    "Home environment fit",
    "Multi-dog tolerance",
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24 lg:py-32 bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <h2
              className="text-[#2F3E4E] font-normal text-[36px] sm:text-[42px] lg:text-[48px] leading-[120%] tracking-[0%]"
              style={{
                fontFamily:
                  "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif",
                fontWeight: 400,
              }}
            >
              We match for energy — not just availability.
            </h2>

            <p
              className="text-[#2F3E4E] font-normal text-[16px] sm:text-[18px] leading-[120%] tracking-[0%]"
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              Dogs thrive in environments that align with who they are. That's
              why PawPair considers more than location and price.
            </p>

            <div className="space-y-4 pt-4">
              <h3
                className="text-[#2F3E4E] font-semibold text-[18px] sm:text-[20px] leading-[120%] tracking-[0%]"
                style={{
                  fontFamily:
                    "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 600,
                }}
              >
                We look at:
              </h3>

              <div className="space-y-3">
                {criteria.map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 transition-all duration-700`}
                    style={{
                      transitionDelay: `${(index + 1) * 100}ms`,
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible
                        ? "translateX(0)"
                        : "translateX(-20px)",
                    }}
                  >
                    <div className="w-5 h-5 rounded-full border-2 border-[#5F7E9D] flex items-center justify-center flex-shrink-0">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#5F7E9D]" />
                    </div>
                    <p
                      className="text-[#2F3E4E] font-normal text-[16px] sm:text-[18px] leading-[120%] tracking-[0%]"
                      style={{
                        fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                      }}
                    >
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <p
              className="text-[#2F3E4E] font-normal text-[16px] sm:text-[18px] leading-[120%] tracking-[0%] italic pt-4"
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              Thoughtful matching creates calmer stays — for dogs and humans
              alike.
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
                src="/caredog.png"
                alt="Man with dog in kitchen"
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
