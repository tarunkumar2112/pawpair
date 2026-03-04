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
      className="w-full py-[60px] md:py-[80px] bg-white"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col items-center md:gap-[40px] lg:gap-[30px] md:flex-row xl:gap-[50px]">
          <div
            className={`w-full flex md:max-w-full lg:justify-start lg:max-w-[400px] xl:max-w-[536px] transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-10"
            }`}
          >
            <div className="image-box-feel relative w-full max-w-full mx-auto lg:mx-0">
              <Image
                src="/left.png"
                alt="Woman with happy dog"
                width={536}
                height={522}
                className="w-full max-w-full h-auto rounded-[20px]"
              />
            </div>
          </div>

          <div
            className={`w-full md:max-w-[744px] transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            }`}
          >
            <h2
              className="font-['Modern_Sans'] font-normal text-[27px] md:text-[36px] lg:text-[40px] xl:text-[46px] leading-[120%] text-[#2F3E4E]"
        >
              Finding the right caregiver shouldn't feel like a gamble.
            </h2>

            <p
              className="font-inter font-normal text-[18px] leading-[120%] text-[#4A5563] mt-[20px] "
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              Most platforms match based on location and availability. But every
              dog is different.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-[40px]">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className={`flex flex-col items-center text-center space-y-5 transition-all duration-1000`}
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
                    className=" text-[18px] !text-[#2F3E4E]  font-modern font-normal leading-[120%] text-center md:text-[20px] xl:text-[24px]"
                  
                  >
                    {feature.title}
                  </h3>

                  <p
                    className="font-sans font-normal text-[18px] leading-[120%] text-center text-[#4A5563"
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
