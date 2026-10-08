"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import VideoScrollPlayer from "@/components/ui/video-scroll-player";

const chapters = [
  {
    num: "01",
    title: "SHOW UP",
    desc: "Make room for the work.",
  },
  {
    num: "02",
    title: "PUT IN THE WORK",
    desc: "Give each session your attention.",
  },
  {
    num: "03",
    title: "KEEP YOUR ROUTINE",
    desc: "Progress takes patience and consistency.",
  }
];

export default function TrainingEditorial() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textTrackRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Only apply complex pinning on desktop
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      if (!containerRef.current || !textTrackRef.current) return;
      
      const textElements = gsap.utils.toArray<HTMLElement>('.chapter-text');
      
      // Horizontal scrub for text while video plays
      gsap.to(textElements, {
        xPercent: -100 * (textElements.length - 1),
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          scrub: 1,
          snap: 1 / (textElements.length - 1),
          end: () => "+=" + containerRef.current!.offsetWidth * textElements.length,
        }
      });
      
      // We also need to map the scroll of this section to the video.
      // But we have VideoScrollPlayer that maps to containerRef. Because we pinned containerRef,
      // the scroll progress of the pin will drive the video.
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative bg-canvas">
      {/* Desktop View (Pinned) */}
      <div className="hidden md:block h-screen w-full relative overflow-hidden">
        
        {/* Full bleed video */}
        <div className="absolute inset-0 z-0 opacity-40">
          <VideoScrollPlayer 
            src="/video-4.mp4"
            containerRef={containerRef}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-canvas/30 mix-blend-multiply"></div>
        </div>

        {/* Scrolling text track */}
        <div ref={textTrackRef} className="absolute inset-0 z-10 flex w-[300vw]">
          {chapters.map((chapter, i) => (
            <div key={i} className="chapter-text w-[100vw] h-full flex flex-col justify-center px-24">
              <span className="font-barlow font-bold text-9xl text-surface/50 absolute left-24 -top-10 pointer-events-none mix-blend-screen">
                {chapter.num}
              </span>
              <div className="relative">
                <span className="text-gold font-barlow font-bold text-xl tracking-[0.2em] mb-4 block">
                  {chapter.num} — {chapter.title}
                </span>
                <h3 className="font-barlow font-bold text-7xl md:text-8xl uppercase text-ivory max-w-4xl leading-none">
                  {chapter.desc}
                </h3>
              </div>
            </div>
          ))}
        </div>
        
        {/* Fixed Desktop Progress Indicator */}
        <div className="absolute bottom-12 left-24 right-24 z-20 flex justify-between items-center opacity-50">
          {chapters.map((c, i) => (
            <div key={i} className="flex-1 border-t border-ivory/30 pt-4 px-2">
               <span className="text-xs font-inter font-semibold uppercase tracking-widest text-ivory">{c.num}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile View (Natural Scroll) */}
      <div className="md:hidden flex flex-col min-h-screen relative z-10">
        <div className="sticky top-0 h-[60vh] w-full z-0 overflow-hidden">
          <video 
            src="/video-4.mp4" 
            autoPlay 
            muted 
            loop 
            playsInline 
            className="w-full h-full object-cover opacity-30 grayscale"
            onError={(e) => {
              (e.target as HTMLVideoElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-canvas to-transparent"></div>
        </div>
        
        <div className="relative z-10 -mt-20 px-6 pb-24 space-y-32">
          {chapters.map((chapter, i) => (
            <div key={i} className="flex flex-col">
              <span className="text-gold font-barlow font-bold text-lg tracking-[0.2em] mb-2">
                {chapter.num} — {chapter.title}
              </span>
              <h3 className="font-barlow font-bold text-5xl uppercase text-ivory leading-none">
                {chapter.desc}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
