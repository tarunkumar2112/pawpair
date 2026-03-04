"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/Background.png')",
          backgroundColor: "#F6F2EA",
        }}
      />

      <div className="relative z-10 w-full min-h-screen flex items-center">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-8 py-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div
              className={`order-2 lg:order-1 flex justify-center lg:justify-start transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="relative w-full max-w-[450px] lg:max-w-[500px]">
                <Image
                  src="/left-dog.png"
                  alt="Happy dog"
                  width={500}
                  height={600}
                  className="w-full h-auto"
                  priority
                />
              </div>
            </div>

            <div
              className={`order-1 lg:order-2 space-y-6 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: "400ms" }}
            >
              <h1 
                className="text-[#2F3E4E] font-semibold text-[36px] sm:text-[48px] lg:text-[60px] leading-[120%] tracking-[0%]"
                style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif", fontWeight: 600 }}
              >
                Pet care, perfectly matched.
              </h1>

              <p 
                className="text-[#2F3E4E] font-normal text-[16px] sm:text-[18px] leading-[120%] tracking-[0%] max-w-[500px]"
                style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
              >
                The trusted starting place for new dog parents.
              </p>

              <Link
                href="/find-care"
                className="mt-8 inline-block px-8 py-3.5 bg-[#5F7E9D] text-white font-normal text-[18px] leading-[100%] rounded-[10px] border-2 border-transparent hover:bg-white hover:text-[#5F7E9D] hover:border-[#5F7E9D] transition-all duration-300"
                style={{ fontFamily: "var(--font-modern-sans), ui-sans-serif, system-ui, sans-serif" }}
              >
                Find Care That Fits
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={scrollToBottom}
        className={`absolute bottom-8 right-8 z-20 transition-all duration-1000 hover:scale-110 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
        style={{ transitionDelay: "800ms" }}
        aria-label="Scroll to bottom"
      >
        <div className="relative w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 animate-bounce">
          <Image
            src="/scrolltobottom.png"
            alt="Scroll to bottom"
            fill
            className="object-contain"
          />
        </div>
      </button>
    </section>
  );
}
