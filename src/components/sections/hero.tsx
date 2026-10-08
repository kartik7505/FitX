"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import VideoScrollPlayer from "@/components/ui/video-scroll-player";
import { motion } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const videoWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax text vs video
    if (!containerRef.current || !textRef.current) return;
    
    // Only apply on desktop
    const mm = gsap.matchMedia();
    mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(textRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        }
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative h-[100svh] md:h-[200vh] w-full bg-canvas">
      {/* Pinned Viewport */}
      <div className="sticky top-0 h-[100svh] md:h-screen w-full overflow-hidden flex flex-col md:flex-row items-center justify-center pt-20">
        
        {/* Background Grain */}
        <div className="absolute inset-0 bg-noise opacity-50 z-0 pointer-events-none mix-blend-overlay"></div>

        {/* Video / 3D Element Layer */}
        <div ref={videoWrapperRef} className="absolute inset-0 z-0 flex justify-end opacity-60 md:opacity-100 pointer-events-none">
          <div className="w-full h-full md:w-[75%] relative origin-center bg-canvas">
            <video 
              src="/video-1.mp4" 
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover transform-gpu"
              onError={(e) => {
                (e.target as HTMLVideoElement).style.display = "none";
              }}
            />
            
            {/* Top and Bottom fade to blend with canvas */}
            <div className="absolute inset-0 bg-gradient-to-b from-canvas via-transparent to-canvas pointer-events-none"></div>
            
            {/* Right side fade */}
            <div className="absolute top-0 bottom-0 right-0 w-1/4 bg-gradient-to-l from-canvas to-transparent pointer-events-none"></div>

            {/* Subtle color grading overlay */}
            <div className="absolute inset-0 bg-gold/5 mix-blend-overlay pointer-events-none"></div>
            
            {/* Essential shadow gradient for text readability on the left */}
            <div className="absolute inset-0 bg-gradient-to-r from-canvas via-canvas/90 to-transparent pointer-events-none w-full md:w-2/3"></div>
          </div>
        </div>

        {/* Typography Overlay */}
        <div 
          ref={textRef} 
          className="relative z-10 w-full max-w-7xl mx-auto px-6 h-full flex flex-col justify-center pb-20 md:pb-0 pointer-events-none"
        >
          <div className="md:w-1/2 flex flex-col items-start pointer-events-auto">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-gold font-inter font-semibold tracking-widest uppercase text-sm mb-4 flex items-center gap-4"
            >
              <span className="w-8 h-[1px] bg-gold"></span>
              Shakti House
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1 }}
              className="font-barlow font-bold text-6xl md:text-9xl leading-[0.85] text-ivory mb-6 mt-4 md:mt-0"
            >
              BUILD.<br/>
              FUEL.<br/>
              <span className="text-accent">GROW.</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-xl md:text-2xl font-inter text-ivory/90 font-light mb-2 max-w-md"
            >
              Meet Power Bulk by Shakti House.
            </motion.p>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="text-xs font-inter text-muted uppercase tracking-widest mb-10"
            >
              60 TABLETS / DIETARY SUPPLEMENT
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
            >
              <a href="#details" className="px-8 py-4 bg-ivory text-canvas font-inter font-semibold uppercase tracking-wider text-sm rounded-sm hover:bg-white transition-all transform hover:-translate-y-0.5 text-center flex-1 sm:flex-none">
                Explore Power Bulk
              </a>
              <a href="#product" className="px-8 py-4 bg-transparent border border-surface text-ivory font-inter font-semibold uppercase tracking-wider text-sm rounded-sm hover:border-gold hover:text-gold transition-all flex-1 sm:flex-none text-center">
                View Product Details
              </a>
            </motion.div>
          </div>
        </div>

        {/* Scroll Cue */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-inter uppercase tracking-[0.2em] text-muted">Scroll</span>
          <div className="w-[1px] h-12 bg-surface overflow-hidden relative">
            <motion.div 
              animate={{ y: [0, 48] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="w-full h-1/2 bg-gold absolute top-0"
            />
          </div>
        </motion.div>
        
        {/* Chapter Indicator */}
        <div className="absolute top-1/2 -translate-y-1/2 right-8 hidden md:flex flex-col items-center gap-8 pointer-events-none mix-blend-difference z-20">
           <span className="text-xs font-barlow font-bold text-ivory/50">01</span>
           <div className="h-24 w-[1px] bg-ivory/20 relative">
             <div className="absolute top-0 w-full bg-ivory origin-top scale-y-0" />
           </div>
           <span className="text-xs font-barlow font-bold text-ivory/50" style={{ writingMode: 'vertical-rl' }}>INTRODUCTION</span>
        </div>
      </div>
    </section>
  );
}
