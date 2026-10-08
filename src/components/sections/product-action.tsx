"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductAction() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("submitting");

    // We do not have a verified submission endpoint, so we deliberately fail validation
    // to clearly indicate this is a preview only.
    setTimeout(() => {
      setStatus("error");
      setErrorMessage("Form submissions are not currently configured for this preview.");
    }, 800);
  };

  return (
    <section id="enquire" className="py-32 md:py-48 bg-ivory text-canvas relative z-10 border-t border-surface/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-24 items-center">
        
        {/* Confident Product Composition */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          
          <div className="relative w-64 h-64 md:w-96 md:h-96 mb-12 drop-shadow-2xl">
            <Image 
              src="/image-1.png" // We use image-1 as fallback if product hero static is missing
              alt="Power Bulk by Shakti House" 
              fill
              className="object-cover rounded-full filter grayscale contrast-125"
            />
            {/* Minimal border ring */}
            <div className="absolute inset-0 border border-canvas/20 rounded-full scale-105 pointer-events-none"></div>
          </div>

          <h2 className="font-barlow font-bold text-5xl md:text-8xl uppercase tracking-tight text-canvas mb-8">
            Meet<br/>Power Bulk.
          </h2>

          <div className="flex flex-col gap-2 font-inter font-semibold uppercase tracking-widest text-sm text-canvas/80">
            <p className="text-canvas font-bold">SHAKTI HOUSE</p>
            <p>BUILD • FUEL • GROW</p>
            <p>60 TABLETS</p>
            <p>DIETARY SUPPLEMENT</p>
          </div>
        </div>

        {/* Enquiry Form */}
        <div className="bg-canvas p-8 md:p-12 rounded-sm shadow-xl relative overflow-hidden">
          {/* Subtle gold accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gold"></div>

          <h3 className="font-barlow font-bold text-3xl uppercase text-ivory mb-2">
            Enquire About Power Bulk
          </h3>
          <p className="font-inter text-muted text-sm font-light mb-8">
            This is a preview experience. Purchases and inquiries are currently disabled.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-inter text-xs font-semibold text-ivory uppercase tracking-wider">
                Name
              </label>
              <input 
                type="text" 
                id="name" 
                required
                className="bg-surface border border-surface text-ivory px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors font-inter font-light"
              />
            </div>
            
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-inter text-xs font-semibold text-ivory uppercase tracking-wider">
                Email
              </label>
              <input 
                type="email" 
                id="email" 
                required
                className="bg-surface border border-surface text-ivory px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors font-inter font-light"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="font-inter text-xs font-semibold text-ivory uppercase tracking-wider">
                Message
              </label>
              <textarea 
                id="message" 
                required
                rows={4}
                className="bg-surface border border-surface text-ivory px-4 py-3 rounded-sm focus:outline-none focus:border-gold transition-colors font-inter font-light resize-none"
              ></textarea>
            </div>

            <button 
              type="submit"
              disabled={status === "submitting"}
              className="mt-4 bg-gold hover:bg-accent text-canvas font-inter font-bold uppercase tracking-widest text-sm py-4 rounded-sm transition-all transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-canvas disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {status === "submitting" ? "Sending..." : "Submit Enquiry"}
            </button>

            {status === "error" && (
              <div className="mt-2 p-4 border border-red-500/50 bg-red-500/10 rounded-sm">
                <p className="font-inter text-sm text-red-200" role="alert">
                  {errorMessage}
                </p>
              </div>
            )}
          </form>
        </div>

      </div>
    </section>
  );
}
