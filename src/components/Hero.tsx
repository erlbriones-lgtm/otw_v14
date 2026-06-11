import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion } from "motion/react";

interface HeroProps {
  onSwitchToHeritage: () => void;
  onPlanVisit?: () => void;
  weatherDescription?: string;
  temperature?: number;
}

export default function Hero({ onSwitchToHeritage, onPlanVisit, weatherDescription, temperature }: HeroProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // To comply with modern browser autoplay policies, autoplay must be muted initially.
    video.muted = true;
    video.play().catch((err) => {
      console.log("[Hero Video] Autoplay initiated or state blocked:", err);
    });
  }, []);

  const handleToggleMute = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isAudioMuted) {
      video.muted = false;
      setIsAudioMuted(false);
      // Double check play state when unmuting
      video.play().catch(() => {});
    } else {
      video.muted = true;
      setIsAudioMuted(true);
    }
  };

  return (
    <section
      id="gateway-hero"
      className="relative min-h-[82vh] xl:min-h-[84vh] flex items-center justify-center bg-transparent px-6 sm:px-12 md:px-16 lg:px-24 pt-40 pb-20 select-none"
    >
      {/* 
        PREMIUM FULL-SCREEN BACKDROP
        Restored beautiful background video using public/webp/home.mp4 with custom audio controls.
      */}
      <div 
        id="hero-background-media" 
        className="absolute inset-0 z-0 overflow-hidden bg-gradient-to-b from-[#0c180b] via-[#142813] to-[#0d1b0c]"
      >
        {/* Full-bleed background video */}
        <div className="absolute inset-0 select-none transition-opacity duration-1000">
          <video
            ref={videoRef}
            src="/webp/home.mp4"
            aria-hidden="true"
            muted={isAudioMuted}
            autoPlay
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover filter saturate-[1.12] brightness-[0.75] contrast-[1.02]"
          />
          {/* Deep environmental tint overlays for maximum readability */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#152614]/30 via-transparent to-[#152614]/45 pointer-events-none z-15" />
        </div>

        {/* Soft edge gradients and atmospheric overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#32e875]/6 via-transparent to-[#32e875]/6 z-20 pointer-events-none" />
        <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-28 bg-gradient-to-b from-[#32e875]/12 to-transparent z-25 pointer-events-none" />
        
        {/* Floating atmospheric sunbeam of color to enrich scene */}
        <div className="absolute top-1/4 right-[25%] w-96 h-96 rounded-full bg-[#FFD54F]/4 blur-[120px] mix-blend-screen pointer-events-none z-15" />
      </div>

      {/* 
        PREMIUM DYNAMIC IMAGE SEPARATOR
        Uses temp/divider2.png as the separator,
        carefully styled to be perfectly proportioned and seamless.
      */}
      <img 
        src="/temp/divider2.png"
        alt="Heritage Separator Curve"
        className="absolute bottom-[-2px] left-0 w-full overflow-hidden pointer-events-none z-32 h-[11px] sm:h-[16px] md:h-[21px] lg:h-[28px] object-fill select-none"
        id="hero-bottom-artwork-separator"
      />

      {/* FOREGROUND MAIN TEXT CONTENT */}
      <div className="relative z-40 w-full max-w-7xl flex flex-col items-center justify-center text-center mx-auto px-4" id="hero-main-content">
        {/* Primary Page Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="font-display text-[12.5vw] sm:text-[12.5vw] md:text-[12vw] lg:text-[12vw] xl:text-[11.5vw] 2xl:text-[15.5rem] font-black -tracking-[0.01em] text-white leading-none block uppercase text-center w-full whitespace-nowrap"
          id="hero-main-headline"
        >
          <span className="inline-block transform scale-y-[1.15] origin-center text-center w-full">
            TAGBILARAN
          </span>
        </motion.h1>

        {/* Subtitle with elegant Moderniz font inside hero */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.45 }}
          className="font-moderniz text-[10px] sm:text-xs md:text-sm font-medium tracking-widest text-[#32e875] max-w-3xl mx-auto mt-2 filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.98)] text-center block w-full uppercase"
          id="hero-subtitle"
        >
          WHERE HISTORY MEETS FRIENDSHIP
        </motion.p>
      </div>

      {/* Mute/unmute button floating in the bottom-right corner */}
      <div className="absolute bottom-10 right-6 z-[40] flex items-center gap-2" id="hero-audio-controls">
        {isAudioMuted && (
          <span className="bg-[#05461a]/90 text-white border border-[#32e875]/30 text-[10px] font-mono tracking-wider font-extrabold px-3 py-1.5 rounded-full shadow-lg select-none backdrop-blur-xs animate-pulse uppercase">
            Tap to play audio
          </span>
        )}
        <button
          type="button"
          onClick={handleToggleMute}
          aria-label={isAudioMuted ? "Unmute background audio" : "Mute background audio"}
          className={`h-10 w-10 sm:h-11 sm:w-11 rounded-full border border-[#8EE6A8]/85 text-[#F2FFF6] transition-transform duration-200 hover:scale-110 active:scale-95 flex items-center justify-center relative cursor-pointer ${
            isAudioMuted 
              ? "bg-gradient-to-br from-[#FF5555] to-[#D32F2F] shadow-[0_0_15px_rgba(255,85,85,0.6)] animate-bounce" 
              : "bg-gradient-to-br from-[#66D17F] to-[#49B368] hover:shadow-[0_0_10px_rgba(102,209,127,0.4)]"
          }`}
          id="hero-mute-button"
        >
          {isAudioMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
          {isAudioMuted && (
            <span className="absolute -inset-1 rounded-full border border-[#FF5555]/40 animate-ping pointer-events-none" />
          )}
        </button>
      </div>
    </section>
  );
}
