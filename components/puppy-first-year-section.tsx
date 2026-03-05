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

        // Left column fades in from left
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">

          {/* ── LEFT COLUMN ── Heading + text + image */}
          <div className="puppy-left-col flex flex-col gap-6">
            {/* Heading with small avatar */}
            <div className="flex items-start gap-3">
              <h2 className="font-['Modern_Sans'] font-normal text-[27px] md:text-[36px] lg:text-[38px] xl:text-[42px] leading-[120%] text-white">
                Your Puppy&apos;s First Year —{" "}
                Guided Week by Week
              </h2>
              {/* Small circular icon beside heading */}
              <div className="flex-shrink-0 w-[40px] h-[40px] mt-1 rounded-full overflow-hidden border-2 border-white/40 bg-white/20 flex items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-white"
                  fill="currentColor"
                >
                  <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                </svg>
              </div>
            </div>

            {/* Sub-text */}
            <div className="space-y-3">
              <p
                className="text-[14px] md:text-[15px] leading-[140%] text-white/80"
                style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
              >
                The first year of a dog&apos;s life is full of important milestones.
              </p>
              <p
                className="text-[14px] md:text-[15px] leading-[140%] text-white/80"
                style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
              >
                PawPair guides new dog parents through every stage with weekly insights,
                reminders, and tips tailored to your puppy&apos;s development.
              </p>
            </div>

            {/* kidcare.png image */}
            <div className="relative w-full mt-2">
              <Image
                src="/kidcare.png"
                alt="Girl bonding with puppy on sofa"
                width={560}
                height={380}
                className="w-full h-auto rounded-[16px] shadow-xl object-cover"
              />
            </div>
          </div>

          {/* ── RIGHT COLUMN ── Bone + cards with right-side timeline */}
          <div className="relative w-full">
            {/* Bone icon — absolute top-right */}
            <div className="absolute -top-4 right-0 w-[48px] h-[48px] md:w-[58px] md:h-[58px] select-none pointer-events-none z-10">
              <Image
                src="/bone.png"
                alt="Bone icon"
                fill
                className="object-contain"
              />
            </div>

            {/* Cards + right-side vertical timeline */}
            <div className="relative pt-2">
              {/* Ghost line (faded track) */}
              <div
                className="absolute right-[22px] top-[14px] bottom-[14px] w-[2px] hidden md:block"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(255,255,255,0.25) 55%, transparent 55%)",
                  backgroundSize: "2px 12px",
                  backgroundRepeat: "repeat-y",
                }}
              />
              {/* Animated line (fills on scroll) */}
              <div
                ref={lineRef}
                className="absolute right-[22px] top-[14px] bottom-[14px] w-[2px] hidden md:block origin-top"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(255,255,255,0.7) 55%, transparent 55%)",
                  backgroundSize: "2px 12px",
                  backgroundRepeat: "repeat-y",
                }}
              />

              {/* Milestone rows */}
              <div className="space-y-4 pr-[54px]">
                {milestones.map((item, index) => (
                  <div key={index} className="relative flex items-center gap-0">
                    {/* White card */}
                    <div
                      ref={(el) => { cardsRef.current[index] = el; }}
                      className="flex-1 group bg-white rounded-[14px] px-5 py-4 shadow-md
                                 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-default"
                    >
                      <h3
                        className="font-['Modern_Sans'] font-semibold text-[17px] md:text-[19px] leading-[120%] text-[#2F3E4E]"
                      >
                        {item.label}
                      </h3>
                      <p
                        className="text-[13px] md:text-[14px] leading-[130%] text-[#4A5563] mt-1"
                        style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
                      >
                        {item.description}
                      </p>
                    </div>

                    {/* Dot connector + paw icon — absolutely positioned to the right */}
                    <div className="hidden md:flex items-center absolute right-0 translate-x-0 gap-1">
                      {/* Connector dot */}
                      <div className="w-[10px] h-[10px] rounded-full bg-white shadow flex-shrink-0" />
                      {/* Paw icon */}
                      <div
                        ref={(el) => { pawsRef.current[index] = el; }}
                        className="w-[28px] h-[28px] relative ml-1 transition-transform duration-300 hover:scale-110 hover:rotate-6"
                      >
                        <Image
                          src="/footstep.png"
                          alt="Paw print"
                          fill
                          className="object-contain opacity-70"
                        />
                      </div>
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
