import { useState } from "react";
import { motion } from "motion/react";
import { ExternalLink } from "lucide-react";

export default function Saulog() {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  return (
    <div className="w-full bg-white select-none" id="saulog-view-root">
      {/* HERO SECTION WITH DYNAMIC VIDEO */}
      <section
        id="saulog-hero"
        className="relative min-h-[25vh] sm:min-h-[45vh] md:min-h-[82vh] xl:min-h-[84vh] flex items-center justify-center bg-[#0d210c] px-6 sm:px-12 md:px-16 lg:px-24 pt-24 sm:pt-40 pb-12 sm:pb-24 overflow-hidden animate-fade-in"
      >
        {/* Background media wrapper */}
        <div id="saulog-bg-media" className="absolute inset-0 z-0 overflow-hidden flex items-center justify-center bg-[#0d210c]">
          {/* Low-res deep atmospheric green background placeholder */}
          <div 
            className={`absolute inset-0 bg-[#0d210c] transition-opacity duration-700 ease-out z-10 ${
              isImageLoaded ? "opacity-0" : "opacity-100"
            }`}
          />
          
          {/* Full screen background image with optimized transitions */}
          <img
            src="/webp/SAULOGBG.png"
            alt="Saulog Full Screen Background"
            referrerPolicy="no-referrer"
            decoding="async"
            loading="eager"
            onLoad={() => setIsImageLoaded(true)}
            className={`absolute inset-0 w-full h-full object-cover select-none transition-all duration-[1200ms] cubic-bezier(0.16, 1, 0.3, 1) ${
              isImageLoaded ? "opacity-100 scale-100 blur-0" : "opacity-0 scale-105 blur-lg"
            }`}
            style={{ imageRendering: "auto", willChange: "transform, opacity" }}
            id="saulog-full-bg-image"
          />
          
          {/* Depth gradients and atmospheric overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none z-15" />
          
          {/* Soft upper edge light */}
          <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#32e875]/12 to-transparent z-25 pointer-events-none" />
        </div>

        {/* Premium bottom curve separator transitioning exactly into white background */}
        <img 
          src="/temp/divider2.png"
          alt="Saulog curve separator"
          className="absolute bottom-[-1px] left-0 w-full overflow-hidden pointer-events-none z-32 h-[12px] sm:h-[18px] md:h-[24px] lg:h-[32px] object-fill select-none"
          id="saulog-bottom-separator"
        />

      </section>

      {/* Elegant minimalist content canvas below the separator */}
      <div className="w-full bg-white flex flex-col items-center px-6 sm:px-12 py-16 sm:py-24" id="saulog-content-canvas">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="max-w-3xl w-full flex flex-col items-center"
        >
          {/* Theme font centered heading exactly matching HISTORY style with normal tracking */}
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black tracking-normal text-[#006400] uppercase text-center mb-2" id="saulog-heading-text">
            SAULOG TAGBILARAN
          </h2>
          
          <p className="font-sans text-xs sm:text-sm font-semibold tracking-normal text-[#38B000] uppercase mb-10 text-center">
            One Family, One City
          </p>

          {/* Theme text styling with normal weight and graceful readability */}
          <div className="space-y-8 text-[#006400]/90 text-sm sm:text-base md:text-lg leading-relaxed font-sans text-center font-normal max-w-3xl px-4" id="saulog-body-text-wrap">
            <p className="text-justify sm:text-center">
              Saulog Tagbilaran is the annual celebration of Tagbilaran City, the capital of Bohol, showcasing the rich culture, heritage, and community spirit of its people. The word <span className="font-sans italic font-semibold text-[#186a30]">"Saulog"</span> means to celebrate in Visayan, and this festival does exactly that, bringing together locals and visitors for a week of street dancing, cultural shows, concerts, trade fairs, and more.
            </p>
            <p className="text-justify sm:text-center">
              Saulog 2026 is set to be a bigger and more festive celebration than ever. Whether you're a proud Tagbilaranon or a visitor exploring Bohol, this is one event you don't want to miss. Check out the official website for the latest event schedules, updates, and announcements.
            </p>
          </div>

          {/* Premium interactive connection link styled precisely to match the theme */}
          <div className="mt-12 flex justify-center w-full" id="saulog-website-link-wrap">
            <a
              href="https://saulogtagbilaran.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 font-sans font-black text-center text-[#186a30] hover:text-[#38B000] text-sm sm:text-base md:text-lg tracking-normal underline underline-offset-8 decoration-[#38B000] transition-all duration-300 hover:scale-102 cursor-pointer group"
              id="saulog-cta-button"
            >
              <span>👉 Visit the Official Saulog Tagbilaran Website</span>
              <ExternalLink size={16} className="transition-transform duration-300 group-hover:translate-x-1 text-[#38B000]" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
