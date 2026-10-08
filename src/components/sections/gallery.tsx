"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax on gallery items for desktop
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      if (!sectionRef.current) return;
      
      const images = gsap.utils.toArray<HTMLElement>('.gallery-img');
      images.forEach((img, i) => {
        const speed = i % 2 === 0 ? 0.05 : 0.1;
        gsap.to(img, {
          yPercent: 15 * (i % 2 === 0 ? -1 : 1),
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          }
        });
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-48 bg-canvas relative z-10">
      <div className="max-w-7xl mx-auto px-6 mb-16 md:mb-24 text-center md:text-left">
        <h2 className="font-barlow font-bold text-4xl md:text-6xl uppercase text-ivory mb-4">
          Made for your training shelf.
        </h2>
        <p className="font-inter text-gold uppercase tracking-[0.2em] font-semibold text-sm">
          Power Bulk. Shakti House.
        </p>
      </div>

      {/* Desktop Asymmetrical Gallery */}
      <div className="hidden md:grid grid-cols-12 gap-6 max-w-7xl mx-auto px-6" ref={galleryRef}>
        
        {/* Large Video Block */}
        <div className="col-span-7 h-[70vh] relative gallery-img rounded-sm overflow-hidden z-10">
          <video 
            src="/video-6.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLVideoElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-canvas/20 md:mix-blend-multiply pointer-events-none"></div>
        </div>

        {/* Tall Image Block */}
        <div className="col-span-5 h-[90vh] -mt-20 relative gallery-img rounded-sm overflow-hidden z-20">
          <Image 
            src="/image-2.png" 
            alt="Power Bulk in gym environment" 
            fill
            className="object-cover"
          />
        </div>

        {/* Square Image Block */}
        <div className="col-span-4 h-[50vh] -mt-32 ml-12 relative gallery-img rounded-sm overflow-hidden z-30">
          <Image 
            src="/image-3.png" 
            alt="Product focus" 
            fill
            className="object-cover"
          />
        </div>

        {/* Wide Image Block */}
        <div className="col-span-8 h-[60vh] mt-12 relative gallery-img rounded-sm overflow-hidden z-10">
          <Image 
            src="/image-4.png" 
            alt="Athletic photography" 
            fill
            className="object-cover md:grayscale"
          />
          <div className="absolute inset-0 bg-gold/10 mix-blend-overlay pointer-events-none"></div>
        </div>

      </div>

      {/* Mobile Scroll-Snap Gallery */}
      <div className="md:hidden flex overflow-x-auto snap-x snap-mandatory hide-scrollbar gap-4 px-6 pb-8">
        
        <div className="snap-center shrink-0 w-[85vw] aspect-[4/5] relative rounded-sm overflow-hidden">
          <video 
            src="/video-6.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLVideoElement).style.display = "none";
            }}
          />
        </div>
        
        <div className="snap-center shrink-0 w-[85vw] aspect-[4/5] relative rounded-sm overflow-hidden bg-surface">
          <Image 
            src="/image-2.png" 
            alt="Power Bulk in gym environment" 
            fill
            className="object-cover"
          />
        </div>

        <div className="snap-center shrink-0 w-[85vw] aspect-[4/5] relative rounded-sm overflow-hidden bg-surface">
          <Image 
            src="/image-3.png" 
            alt="Product focus" 
            fill
            className="object-cover"
          />
        </div>

        <div className="snap-center shrink-0 w-[85vw] aspect-[4/5] relative rounded-sm overflow-hidden bg-surface">
          <Image 
            src="/image-4.png" 
            alt="Athletic photography" 
            fill
            className="object-cover md:grayscale"
          />
        </div>

      </div>

      {/* Custom CSS to hide scrollbar on mobile */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}
