"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";

const milestones = [
  {
    label: "Week 1–4",
    description: "Early bonding & sleep routines",
  },
  {
    label: "Week 5–8",
    description: "Socialization begins",
  },
  {
    label: "Week 9–12",
    description: "Basic training milestones",
  },
  {
    label: "Month 4–6",
    description: "Teething & behavior changes",
  },
  {
    label: "Month 7–12",
    description: "Confidence & routine building",
  },
];

export function PuppyFirstYearSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const pawsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const loadGsap = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      if (!sectionRef.current) return;

      const ctx = gsap.context(() => {
        // Animate the vertical dashed line growing on scroll
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
                start: "top 60%",
                end: "bottom 80%",
                scrub: 1,
              },
            }
          );
        }

        // Staggered card reveal from right
        cardsRef.current.forEach((card, index) => {
          if (!card) return;
          gsap.fromTo(
            card,
            { opacity: 0, x: 60 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              ease: "power2.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.08,
            }
          );
        });

        // Paw icons bounce in
        pawsRef.current.forEach((paw, index) => {
          if (!paw) return;
          gsap.fromTo(
            paw,
            { opacity: 0, scale: 0, rotation: -20 },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 0.5,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: paw,
                start: "top 88%",
                toggleActions: "play none none reverse",
              },
              delay: index * 0.1 + 0.2,
            }
          );
        });

        // Left image parallax
        const leftImage = sectionRef.current?.querySelector(".puppy-left-image");
        if (leftImage) {
          gsap.fromTo(
            leftImage,
            { opacity: 0, x: -60 },
            {
              opacity: 1,
              x: 0,
              duration: 1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }

        // Heading and text fade in
        const headingBlock = sectionRef.current?.querySelector(".puppy-heading-block");
        if (headingBlock) {
          gsap.fromTo(
            headingBlock,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start">

          {/* LEFT — Image */}
          <div className="puppy-left-image w-full">
            <div className="relative w-full max-w-[560px] mx-auto lg:mx-0">
              <Image
                src="/kidcare.png"
                alt="Girl bonding with dog on sofa"
                width={560}
                height={520}
                className="w-full h-auto rounded-[20px] shadow-2xl object-cover"
              />
            </div>
          </div>

          {/* RIGHT — Content */}
          <div className="relative w-full">
            {/* Bone icon — top right */}
            <div className="absolute -top-3 right-0 w-[48px] h-[48px] md:w-[60px] md:h-[60px] select-none pointer-events-none">
              <Image
                src="/bone.png"
                alt="Bone icon"
                fill
                className="object-contain opacity-90"
              />
            </div>

            {/* Heading block */}
            <div className="puppy-heading-block pr-16 md:pr-20 mb-8">
              <h2 className="font-['Modern_Sans'] font-normal text-[27px] md:text-[36px] lg:text-[40px] xl:text-[46px] leading-[120%] text-white">
                Your Puppy&apos;s First Year —{" "}
                <span className="block">Guided Week by Week</span>
              </h2>
              <p
                className="mt-4 text-[15px] md:text-[16px] leading-[120%] text-white/80"
                style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
              >
                The first year of a dog&apos;s life is full of important milestones.
              </p>
              <p
                className="mt-3 text-[15px] md:text-[16px] leading-[120%] text-white/80"
                style={{ fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif" }}
              >
                PawPair guides new dog parents through every stage with weekly insights, reminders, and tips tailored to your puppy&apos;s development.
              </p>
            </div>

            {/* Timeline list */}
            <div className="relative">
              {/* Animated dashed vertical line */}
              <div
                className="absolute left-[11px] top-[14px] bottom-[14px] w-[2px] hidden sm:block"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, rgba(255,255,255,0.4) 50%, transparent 50%)",
                  backgroundSize: "2px 14px",
                  backgroundRepeat: "repeat-y",
                }}
              />
              <div
                ref={lineRef}
                className="absolute left-[11px] top-[14px] bottom-[14px] w-[2px] hidden sm:block origin-top scale-y-0"
                style={{
                  backgroundImage:
                    "linear-gradient(to bottom, white 50%, transparent 50%)",
                  backgroundSize: "2px 14px",
                  backgroundRepeat: "repeat-y",
                }}
              />

              <div className="space-y-3">
                {milestones.map((item, index) => (
                  <div key={index} className="relative flex items-stretch gap-4 sm:gap-6">
                    {/* Dot on line */}
                    <div className="hidden sm:flex flex-col items-center pt-[14px] flex-shrink-0">
                      <div className="w-[10px] h-[10px] rounded-full bg-white flex-shrink-0 shadow-md" />
                    </div>

                    {/* Card */}
                    <div
                      ref={(el) => {
                        if (el) cardsRef.current[index] = el;
                      }}
                      className="flex-1 group"
                    >
                      <div className="bg-white rounded-[14px] px-5 py-4 shadow-md flex items-center justify-between gap-4 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 cursor-default">
                        <div>
                          <h3 className="font-['Modern_Sans'] font-semibold text-[16px] md:text-[18px] leading-[120%] text-[#2F3E4E]">
                            {item.label}
                          </h3>
                          <p
                            className="text-[13px] md:text-[14px] leading-[120%] text-[#4A5563] mt-1"
                            style={{
                              fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
                            }}
                          >
                            {item.description}
                          </p>
                        </div>

                        {/* Paw icon — right side of card */}
                        <div
                          ref={(el) => {
                            if (el) pawsRef.current[index] = el;
                          }}
                          className="flex-shrink-0 w-[28px] h-[28px] md:w-[34px] md:h-[34px] relative transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                        >
                          <Image
                            src="/footstep.png"
                            alt="Paw"
                            fill
                            className="object-contain opacity-60"
                          />
                        </div>
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
