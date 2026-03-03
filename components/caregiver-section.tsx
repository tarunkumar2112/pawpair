"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function CaregiverSection() {
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

  const features = [
    {
      icon: "/one1.png",
      title: "Availability isn't compatibility",
      description: "Just because someone is free doesn't mean they're the right fit.",
    },
    {
      icon: "/two2.png",
      title: "Every dog has a personality",
      description: "Energy levels, sensitivities, quirks — they all matter.",
    },
    {
      icon: "/three3.png",
      title: "Trust takes intention",
      description: "The best matches are built thoughtfully, not instantly.",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24 lg:py-32 bg-white"
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
            <div className="relative w-full max-w-[450px] mx-auto lg:mx-0">
              <Image
                src="/left.png"
                alt="Woman with happy dog"
                width={450}
                height={600}
                className="w-full h-auto rounded-[20px]"
              />
            </div>
          </div>

          <div
            className={`space-y-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h2
              className="text-[#2F3E4E] font-semibold text-[32px] sm:text-[40px] lg:text-[48px] leading-[120%] tracking-[0%]"
              style={{
                fontFamily:
                  "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif",
                fontWeight: 600,
              }}
            >
              Finding the right caregiver shouldn't feel like a gamble.
            </h2>

            <p
              className="text-[#2F3E4E] text-[16px] sm:text-[18px] leading-[120%] tracking-[0%]"
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              Most platforms match based on location and availability. But every
              dog is different.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center space-y-3 transition-all duration-1000`}
                  style={{
                    transitionDelay: `${(index + 1) * 200}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0)"
                      : "translateY(20px)",
                  }}
                >
                  <div className="relative w-[120px] h-[80px] sm:w-[140px] sm:h-[90px]">
                    <Image
                      src={feature.icon}
                      alt={feature.title}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <h3
                    className="text-[#2F3E4E] font-normal text-[20px] sm:text-[24px] leading-[120%] tracking-[0%]"
                    style={{
                      fontFamily:
                        "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif",
                    }}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="text-[#2F3E4E] font-normal text-[16px] sm:text-[18px] leading-[120%] tracking-[0%]"
                    style={{
                      fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                    }}
                  >
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
