"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitType from "split-type";
import Image from "next/image";

export default function BrandExpression() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current || !textRef.current || !imageWrapperRef.current) return;

    // Split text for animation, keep original structure for accessibility
    const splitHeadline = new SplitType(headlineRef.current, { types: "lines" });
    const splitText = new SplitType(textRef.current, { types: "lines" });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 60%",
        end: "bottom bottom",
        toggleActions: "play none none reverse",
      }
    });

    // Animate image reveal (clipping mask)
    tl.fromTo(imageWrapperRef.current, 
      { clipPath: "inset(100% 0% 0% 0%)" },
      { clipPath: "inset(0% 0% 0% 0%)", duration: 1.5, ease: "power4.inOut" }
    )
    // Image slight scale down
    .fromTo(imageWrapperRef.current.querySelector("img"),
      { scale: 1.1 },
      { scale: 1, duration: 1.5, ease: "power2.out" },
      "<"
    )
    // Stagger headline lines
    .fromTo(splitHeadline.lines,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" },
      "-=1"
    )
    // Fade in text lines
    .fromTo(splitText.lines,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05, ease: "power2.out" },
      "-=0.6"
    );

    return () => {
      splitHeadline.revert();
      splitText.revert();
    };
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="brand"
      className="py-32 md:py-48 bg-ivory text-canvas relative z-10"
    >
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-center">
        
        {/* Editorial Typography */}
        <div className="flex flex-col justify-center order-2 md:order-1">
          <div className="flex items-center gap-4 mb-8">
            <span className="text-sm font-barlow font-bold tracking-widest text-canvas/50">02</span>
            <div className="h-[1px] w-12 bg-canvas/30" />
            <span className="text-sm font-inter tracking-[0.2em] uppercase font-semibold text-canvas/70">The Brand</span>
          </div>
          
          <h2 
            ref={headlineRef}
            className="font-barlow font-bold text-4xl md:text-7xl uppercase leading-tight mb-8 text-canvas"
            style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
          >
            Built around the work.
          </h2>
          
          <p 
            ref={textRef}
            className="font-inter text-lg md:text-xl text-canvas/80 leading-relaxed font-light max-w-md"
          >
            The early starts. The repeated sets. The patience to keep showing up. Shakti House brings a bold visual identity to a routine built on consistency.
          </p>
        </div>

        {/* Product / Training Image */}
        <div className="order-1 md:order-2 h-[60vh] md:h-[80vh] relative">
          <div 
            ref={imageWrapperRef}
            className="w-full h-full relative overflow-hidden bg-surface rounded-sm"
          >
            <Image 
              src="/image-1.png" 
              alt="Shakti House Power Bulk training aesthetics" 
              fill
              className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-1000"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          {/* Subtle decoration */}
          <div className="absolute -right-4 -bottom-4 w-24 h-24 border-r border-b border-canvas/20 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
