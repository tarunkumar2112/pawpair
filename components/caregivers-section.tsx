"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function CaregiversSection() {
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

  const caregiverTypes = [
    "Former vet techs",
    "Trainers",
    "Long-time pet sitters",
    "Retired pet lovers",
    "Passion-driven small business owners",
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24 lg:py-32 bg-[#5F7E9D]"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div
            className={`transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="relative w-full max-w-[500px] mx-auto lg:mx-0">
              <Image
                src="/petcuddle.png"
                alt="Caregivers with dog"
                width={500}
                height={600}
                className="w-full h-auto rounded-[20px]"
              />
            </div>
          </div>

          <div
            className={`space-y-6 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h2
              className="text-white font-semibold text-[36px] sm:text-[42px] lg:text-[48px] leading-[120%] tracking-[0%]"
              style={{
                fontFamily:
                  "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              Caregivers Who Care Deeply
            </h2>

            <p
              className="text-white font-normal text-[16px] sm:text-[18px] leading-[120%] tracking-[0%]"
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              Our caregivers aren't just available — they're experienced,
              intentional, and invested in building real relationships with the
              dogs they care for.
            </p>

            <div className="space-y-4 pt-4">
              <h3
                className="text-white font-semibold text-[18px] sm:text-[20px] leading-[120%] tracking-[0%]"
                style={{
                  fontFamily:
                    "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif",
                  fontWeight: 600,
                }}
              >
                Many are:
              </h3>

              <div className="space-y-3">
                {caregiverTypes.map((item, index) => (
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
                    <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center flex-shrink-0">
                      <svg
                        className="w-3 h-3 text-white"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <p
                      className="text-white font-normal text-[16px] sm:text-[18px] leading-[120%] tracking-[0%]"
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
              className="text-white font-normal text-[16px] sm:text-[18px] leading-[120%] tracking-[0%] pt-4"
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              We prioritize heart, patience, and experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
