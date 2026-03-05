"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const milestones = [
  {
    label: "Week 1-4",
    description: "Early bonding & sleep routines",
  },
  {
    label: "Week 5-8",
    description: "Socialization begins",
  },
  {
    label: "Week 9-12",
    description: "Basic training milestones",
  },
  {
    label: "Month 4-6",
    description: "Teething & behavior changes",
  },
  {
    label: "Month 7-12",
    description: "Confidence & routine building",
  },
];

export function PuppyFirstYearSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const pawsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        // Dashed line grows downward on scroll
        if (lineRef.current) {
          gsap.fromTo(
            lineRef.current,
            { scaleY: 0 },
            {
              scaleY: 1,
              ease: "none",
              transformOrigin: "top center",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 55%",
                end: "bottom 75%",
                scrub: 1,
              },
            }
          );
        }

        // Cards stagger in from the right
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { opacity: 0, x: 50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.65,
              ease: "power2.out",
              delay: index * 0.1,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 65%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Paw icons bounce in after cards
        pawsRef.current.forEach((paw, index) => {
          if (!paw) return;
          gsap.fromTo(
            paw,
            { opacity: 0, scale: 0, rotation: -15 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.45,
              ease: "back.out(1.7)",
              delay: index * 0.1 + 0.25,
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 65%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Left column fades in
        const leftCol = sectionRef.current?.querySelector(".puppy-left-col");
        if (leftCol) {
          gsap.fromTo(
            leftCol,
            { opacity: 0, x: -50 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      }, sectionRef);

      return () => ctx.revert();
    };

    loadGsap();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-[60px] md:py-[70px] lg:py-[80px] bg-[#5F7E9D] relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-16">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start">

          {/* ══════════ LEFT 60% — Heading + Text + Image ══════════ */}
          <div className="puppy-left-col w-full lg:w-[60%] flex flex-col">
            {/* Heading */}
            <h2 className="font-['Modern_Sans'] font-normal text-[32px] md:text-[40px] lg:text-[44px] xl:text-[48px] leading-[120%] text-white mb-5">
              Your Puppy&apos;s First Year —{" "}
              <span className="inline">Guided Week by Week</span>
            </h2>

            {/* Description paragraphs */}
            <p
              className="text-[15px] md:text-[16px] leading-[145%] text-white/85 mb-3"
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              The first year of a dog&apos;s life is full of important milestones.
            </p>
            <p
              className="text-[15px] md:text-[16px] leading-[145%] text-white/85 mb-8"
              style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
            >
              PawPair guides new dog parents through every stage with weekly insights,
              reminders, and tips tailored to your puppy&apos;s development.
            </p>

            {/* kidcare.png image */}
            <div className="relative w-full">
              <Image
                src="/kidcare.png"
                alt="Girl bonding with puppy on sofa"
                width={650}
                height={450}
                className="w-full h-auto rounded-[18px] shadow-2xl object-cover"
              />
            </div>
          </div>

          {/* ══════════ RIGHT 40% — Bone + Cards + Timeline ══════════ */}
          <div className="relative w-full lg:w-[40%] lg:pt-1">
            {/* Bone icon — absolute top-right */}
            <div className="absolute -top-3 right-0 w-[50px] h-[50px] md:w-[60px] md:h-[60px] select-none pointer-events-none z-10">
              <Image
                src="/bone.png"
                alt="Bone icon"
                fill
                className="object-contain"
              />
            </div>

            {/* Timeline container */}
            <div className="relative pt-3 pr-[60px] md:pr-[70px]">
              {/* Ghost dashed line (background track) */}
              <div
                className="absolute right-[24px] md:right-[28px] top-[20px] bottom-[20px] w-[3px]"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(255,255,255,0.25) 50%, transparent 50%)",
                  backgroundSize: "3px 14px",
                  backgroundRepeat: "repeat-y",
                }}
              />
              
              {/* Animated dashed line (fills on scroll) */}
              <div
                ref={lineRef}
                className="absolute right-[24px] md:right-[28px] top-[20px] bottom-[20px] w-[3px] origin-top"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(255,255,255,0.8) 50%, transparent 50%)",
                  backgroundSize: "3px 14px",
                  backgroundRepeat: "repeat-y",
                }}
              />

              {/* Milestone cards */}
              <div className="space-y-4 md:space-y-5">
                {milestones.map((item, index) => (
                  <div key={index} className="relative">
                    {/* White rounded card */}
                    <div
                      ref={(el) => { cardsRef.current[index] = el; }}
                      className="bg-white rounded-[16px] px-5 py-4 shadow-lg
                                 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 
                                 cursor-default relative group"
                    >
                      <h3 className="font-['Modern_Sans'] font-semibold text-[18px] md:text-[20px] leading-[120%] text-[#1a1a1a] mb-1">
                        {item.label}
                      </h3>
                      <p
                        className="text-[14px] md:text-[15px] leading-[135%] text-[#555555]"
                        style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                      >
                        {item.description}
                      </p>

                      {/* Right arrow pointer (speech bubble style) */}
                      <div className="absolute top-1/2 -translate-y-1/2 -right-[10px] w-0 h-0 
                                    border-t-[10px] border-t-transparent 
                                    border-b-[10px] border-b-transparent 
                                    border-l-[10px] border-l-white
                                    drop-shadow-sm">
                      </div>
                    </div>

                    {/* Dot on timeline */}
                    <div className="absolute top-1/2 -translate-y-1/2 right-[16px] md:right-[20px] 
                                  w-[14px] h-[14px] rounded-full bg-white shadow-md border-2 border-[#5F7E9D] z-10">
                    </div>

                    {/* Paw icon */}
                    <div
                      ref={(el) => { pawsRef.current[index] = el; }}
                      className="absolute top-1/2 -translate-y-1/2 right-[-8px] md:right-[-6px]
                               w-[32px] h-[32px] md:w-[38px] md:h-[38px] 
                               transition-transform duration-300 hover:scale-110 hover:rotate-12"
                    >
                      <Image
                        src="/footstep.png"
                        alt="Paw print"
                        fill
                        className="object-contain opacity-80"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
