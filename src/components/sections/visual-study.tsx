"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function VisualStudy() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // Subtle pointer tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20 });
  
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Only apply on desktop
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 768) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;
    
    // Auto-play the macro video when in view
    ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top 80%",
      end: "bottom 20%",
      onEnter: () => { videoRef.current?.play()?.catch(() => {}); },
      onLeave: () => { videoRef.current?.pause(); },
      onEnterBack: () => { videoRef.current?.play()?.catch(() => {}); },
      onLeaveBack: () => { videoRef.current?.pause(); },
    });
  }, []);

  return (
    <section ref={containerRef} className="py-32 bg-canvas relative z-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="font-barlow font-bold text-4xl md:text-7xl uppercase text-ivory">
              An unmistakable identity.
            </h2>
          </div>
          <div className="md:max-w-xs">
            <p className="font-inter text-muted text-sm font-light">
              Gold lid reflections, black surface highlights, and the signature white-and-gold brush lettering.
            </p>
          </div>
        </div>

        <motion.div 
          className="relative w-full aspect-[4/5] md:aspect-video rounded-sm overflow-hidden"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY, transformPerspective: 1000 }}
        >
          {/* Inner wrapper to handle scale without breaking border */}
          <div className="absolute inset-0 scale-105">
            <video 
              ref={videoRef}
              src="/video-5.mp4"
              muted 
              loop 
              playsInline
              preload="metadata"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLVideoElement).style.display = "none";
              }}
            />
          </div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-canvas/80 via-transparent to-canvas/20 mix-blend-multiply pointer-events-none"></div>

          {/* Info Cards over negative space */}
          <div className="absolute bottom-8 left-8 md:bottom-12 md:left-12 max-w-xs pointer-events-none">
            <div className="bg-canvas/40 backdrop-blur-md border border-surface/50 p-6 rounded-sm">
              <span className="text-gold font-barlow font-bold tracking-widest text-sm uppercase mb-2 block">
                Texture
              </span>
              <p className="text-ivory font-inter text-sm font-light leading-relaxed">
                The diagonal graphic strokes and crown monogram define a premium aesthetic that commands attention on any shelf.
              </p>
            </div>
          </div>
          
          <div className="absolute top-8 right-8 md:top-12 md:right-12 hidden md:block pointer-events-none">
            <div className="flex items-center gap-4">
              <div className="w-[1px] h-12 bg-gold/50"></div>
              <span className="font-inter text-xs text-ivory/80 uppercase tracking-[0.2em] [writing-mode:vertical-lr]">
                MACRO STUDY
              </span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
