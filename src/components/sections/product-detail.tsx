"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import VideoScrollPlayer from "@/components/ui/video-scroll-player";

export default function ProductDetail() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const annotations = [
    { title: "Metallic Gold Lid", desc: "Reflective crown finish.", x: 50, y: 15 },
    { title: "Signature SH Mark", desc: "Gold monogram with a crown.", x: 50, y: 35 },
    { title: "Power Bulk Label", desc: "Brush-style typography.", x: 50, y: 55 },
    { title: "60-Tablet Pack", desc: "Dietary supplement quantity.", x: 50, y: 75 },
    { title: "Glossy Black Bottle", desc: "Premium cylindrical form.", x: 20, y: 60 }
  ];

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;
    
    // Animate annotations fading in progressively
    const triggers = gsap.utils.toArray<HTMLElement>('.annotation-marker').map((el, index) => {
      return ScrollTrigger.create({
        trigger: containerRef.current,
        start: () => `top ${60 - index * 5}%`,
        end: "bottom top",
        onEnter: () => gsap.to(el, { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.5)" }),
        onLeaveBack: () => gsap.to(el, { opacity: 0, scale: 0.8, duration: 0.3 }),
      });
    });

    return () => {
      triggers.forEach(t => t.kill());
    };
  }, []);

  return (
    <section ref={sectionRef} id="product" className="relative h-[100svh] md:h-[250vh] bg-canvas">
      <div ref={containerRef} className="sticky top-0 h-[100svh] md:h-screen w-full flex flex-col md:flex-row items-center justify-center overflow-hidden">
        
        {/* Background Haze */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,#141414_0%,#090909_100%)]"></div>

        <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center z-20 w-full px-6">
          <h2 className="font-barlow font-bold text-4xl md:text-5xl text-ivory uppercase tracking-wide">
            Every detail. Deliberate.
          </h2>
        </div>

        {/* Product Media */}
        <div className="relative w-full max-w-lg h-[80vh] md:h-[90vh] z-10 mx-auto mt-20">
          <VideoScrollPlayer 
            src="/video-2.mp4" 
            containerRef={containerRef}
            className="object-contain"
          />

          {/* Desktop Annotations overlay */}
          <div className="absolute inset-0 hidden md:block pointer-events-none">
            {annotations.map((item, i) => (
              <div 
                key={i}
                className="annotation-marker absolute flex flex-col items-center opacity-0 scale-90"
                style={{ 
                  left: `${item.x}%`, 
                  top: `${item.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
              >
                {/* Pointer dot */}
                <div className="w-2 h-2 rounded-full bg-gold shadow-[0_0_10px_rgba(214,173,53,0.5)]"></div>
                {/* Connector line */}
                <div className="w-[1px] h-8 bg-gold/50 my-1"></div>
                {/* Label */}
                <div className="bg-surface/80 backdrop-blur-sm border border-gold/20 px-4 py-2 rounded-sm text-center">
                  <h4 className="text-ivory font-inter font-semibold text-sm">{item.title}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Detail List */}
        <div className="absolute bottom-12 left-0 right-0 px-6 md:hidden z-20">
          <ul className="flex flex-col gap-4 bg-canvas/80 backdrop-blur-md p-6 border border-surface rounded-sm">
            {annotations.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-gold mt-2 shrink-0"></span>
                <div>
                  <h4 className="text-ivory font-inter font-semibold text-sm">{item.title}</h4>
                  <p className="text-muted text-xs font-light">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
        
      </div>
    </section>
  );
}
