"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

interface VideoScrollPlayerProps {
  src: string;
  className?: string;
  poster?: string;
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export default function VideoScrollPlayer({ 
  src, 
  className, 
  poster,
  containerRef 
}: VideoScrollPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setIsLoaded(true);
    };

    const handleError = () => {
      setHasError(true);
    };

    video.addEventListener("loadedmetadata", handleLoadedMetadata);
    video.addEventListener("error", handleError);

    return () => {
      video.removeEventListener("loadedmetadata", handleLoadedMetadata);
      video.removeEventListener("error", handleError);
    };
  }, []);

  useEffect(() => {
    if (!isLoaded || !videoRef.current || hasError) return;
    
    // We only create the trigger if a container is passed, or we just rely on parent's timeline
    if (!containerRef?.current) return;

    const video = videoRef.current;
    
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: "top top",
      end: "bottom bottom",
      scrub: 1,
      onUpdate: (self) => {
        if (!video.duration || Number.isNaN(video.duration)) return;
        
        const targetTime = self.progress * video.duration;
        
        // Remove the 0.05 threshold that causes stuttering, and rely on GSAP's scrub easing
        if (Math.abs(video.currentTime - targetTime) > 0.01) {
          video.currentTime = Math.max(0, Math.min(targetTime, video.duration));
        }
      }
    });

    return () => {
      trigger.kill();
    };
  }, [isLoaded, containerRef, hasError]);

  if (hasError) {
    return (
      <div className={cn("w-full h-full bg-surface/50 flex flex-col items-center justify-center border border-surface/20", className)}>
        <span className="text-gold/50 font-inter text-xs uppercase tracking-widest">Media Unavailable</span>
        <span className="text-ivory/30 font-barlow text-sm mt-1">{src}</span>
      </div>
    );
  }

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className={cn("w-full h-full object-cover", className)}
      muted
      playsInline
      preload="metadata"
      onError={() => setHasError(true)}
    />
  );
}
