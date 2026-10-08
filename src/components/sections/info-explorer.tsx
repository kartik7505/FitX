"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import VideoScrollPlayer from "@/components/ui/video-scroll-player";
import { ChevronRight, X } from "lucide-react";

type InfoNode = {
  id: string;
  title: string;
  content: string;
  status: "verified" | "missing";
};

const nodes: InfoNode[] = [
  {
    id: "overview",
    title: "Product Overview",
    content: "Shakti House Power Bulk\nDietary supplement\n60 tablets",
    status: "verified"
  },
  {
    id: "ingredients",
    title: "Ingredients",
    content: "Ingredient details have not been supplied.",
    status: "missing"
  },
  {
    id: "directions",
    title: "Directions",
    content: "Follow the directions on the verified product label.",
    status: "missing"
  },
  {
    id: "quality",
    title: "Quality Documentation",
    content: "Documentation pending verification.",
    status: "missing"
  }
];

export default function InfoExplorer() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const activeContent = nodes.find(n => n.id === activeNode);

  return (
    <section id="details" className="relative py-24 min-h-screen bg-canvas flex flex-col justify-center overflow-hidden">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none md:mix-blend-screen">
        <video 
          src="/video-3.mp4" 
          autoPlay 
          muted 
          loop 
          playsInline 
          className="w-full h-full object-cover md:grayscale transform-gpu"
          onError={(e) => {
            (e.target as HTMLVideoElement).style.display = "none";
          }}
        />
        {/* Dark vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#090909_100%)]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 md:grid-cols-12 gap-12">
        
        <div className="md:col-span-4 flex flex-col justify-center">
          <h2 className="font-barlow font-bold text-4xl md:text-7xl text-ivory uppercase mb-12">
            Clarity comes first.
          </h2>

          <div className="flex flex-col gap-4">
            {nodes.map(node => (
              <button
                key={node.id}
                onClick={() => setActiveNode(activeNode === node.id ? null : node.id)}
                className={`text-left px-6 py-4 border rounded-sm transition-all duration-300 flex items-center justify-between group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                  activeNode === node.id 
                    ? "border-gold bg-gold/10 shadow-[0_0_15px_rgba(214,173,53,0.15)]" 
                    : "border-surface bg-surface/50 hover:border-gold/50 hover:bg-surface"
                }`}
                aria-expanded={activeNode === node.id}
              >
                <span className={`font-inter font-semibold uppercase tracking-wider text-sm ${
                  activeNode === node.id ? "text-gold" : "text-ivory group-hover:text-gold"
                }`}>
                  {node.title}
                </span>
                <ChevronRight 
                  size={16} 
                  className={`transition-transform duration-300 ${
                    activeNode === node.id ? "rotate-90 text-gold" : "text-muted group-hover:text-gold"
                  }`} 
                />
              </button>
            ))}
          </div>
        </div>

        <div className="md:col-span-8 flex items-center justify-center min-h-[400px]">
          <AnimatePresence mode="wait">
            {activeContent ? (
              <motion.div
                key={activeContent.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-2xl bg-surface/95 md:bg-surface/80 md:backdrop-blur-md border border-surface p-8 md:p-12 rounded-sm relative overflow-hidden"
              >
                {/* Accent line */}
                <div className="absolute top-0 left-0 w-1 h-full bg-gold"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-barlow font-bold text-3xl uppercase text-ivory">
                    {activeContent.title}
                  </h3>
                  <button 
                    onClick={() => setActiveNode(null)}
                    className="text-muted hover:text-gold transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gold"
                    aria-label="Close details"
                  >
                    <X size={24} />
                  </button>
                </div>
                
                <div className="prose prose-invert prose-p:font-inter prose-p:font-light prose-p:text-ivory/80 prose-p:leading-relaxed">
                  {activeContent.content.split('\n').map((line, i) => (
                    <p key={i} className={activeContent.status === "missing" ? "text-muted italic" : ""}>
                      {line}
                    </p>
                  ))}
                </div>

                {activeContent.status === "missing" && (
                  <div className="mt-8 pt-6 border-t border-canvas">
                    <span className="inline-block px-3 py-1 bg-canvas text-muted text-xs uppercase tracking-widest font-semibold rounded-sm">
                      Information Unavailable
                    </span>
                  </div>
                )}
              </motion.div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center"
              >
                <div className="w-16 h-16 border border-surface rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="w-2 h-2 bg-gold rounded-full animate-pulse"></div>
                </div>
                <p className="font-inter text-muted uppercase tracking-widest text-sm">
                  Select a category to explore details
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
