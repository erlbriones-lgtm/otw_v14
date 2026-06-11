import { Compass } from "lucide-react";

interface FooterProps {
  setActiveView: (view: "home" | "heritage" | "tagbeats" | "downloadables" | "barangay" | "saulog" | "travel" | "about") => void;
  onPlanVisit: () => void;
}

export default function Footer({ setActiveView, onPlanVisit }: FooterProps) {
  return (
    <footer 
      className="relative z-10 px-6 sm:px-12 pb-12 pt-16 bg-[#031d09] text-white transition-all duration-300"
      id="main-app-footer"
    >
      {/* Decorative Top Divider Image (Edge to Edge) */}
      <div className="absolute top-0 left-0 right-0 w-full flex justify-center -translate-y-1/2 pointer-events-none z-20">
        <img 
          src="/temp/GreenDivider.png" 
          alt="Top Footer Divider" 
          className="w-full h-5 md:h-6 object-fill"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col gap-12">
        {/* Main Footer Links & Brand Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12" id="footer-main-grid">
          
          {/* Column 1: Brand & Municipal Mission */}
          <div className="lg:col-span-4 flex flex-col gap-4 text-left" id="footer-col-brand">
            {/* Logos above the header (non-enclosed) */}
            <div className="flex items-center gap-4 mb-2">
              <img 
                src="/temp/cropped-Tagbilaran-LOGO.png" 
                alt="City Government of Tagbilaran Seal" 
                className="h-12 w-auto object-contain filter brightness-110"
                referrerPolicy="no-referrer" 
              />
              <img 
                src="/temp/TAGB-CTO.png" 
                alt="City Tourism Office Logo" 
                className="h-12 w-auto object-contain"
                referrerPolicy="no-referrer" 
              />
            </div>

            <div className="flex items-center">
              <span className="font-sans font-black text-lg tracking-wider text-white uppercase">
                TAGBILARAN <span className="text-[#FFD54F]">TOURISM</span>
              </span>
            </div>
            <p className="text-white/70 text-xs sm:text-sm leading-relaxed max-w-sm">
              The official digital tourism gateway of the City Government of Tagbilaran, Bohol. Explore our ancient covenants, living traditions, sandugo legacy, and pioneering creative communities.
            </p>
          </div>

          {/* Column 2: Location & Hours */}
          <div className="lg:col-span-3 text-left flex flex-col gap-4" id="footer-col-location">
            <h4 className="text-[#70E000] font-sans font-extrabold text-xs uppercase tracking-widest">
              Location &amp; Hours
            </h4>
            <div className="space-y-4 text-xs text-white/70">
              <div className="flex flex-col">
                <span className="font-sans font-bold text-white uppercase tracking-wider mb-1">
                  Tagbilaran City Hall
                </span>
                <p className="text-white/60 leading-relaxed">
                  Dampas District, Tagbilaran City<br />
                  Government Center, Bohol 6300
                </p>
              </div>

              <div className="flex flex-col">
                <span className="font-sans font-bold text-white uppercase tracking-wider mb-1">
                  Office Hours
                </span>
                <p className="text-white/60 font-mono">Mon – Fri: 8:00 AM – 5:00 PM PST</p>
              </div>
            </div>
          </div>

          {/* Column 3: Official Directory */}
          <div className="lg:col-span-5 text-left flex flex-col gap-4" id="footer-col-directory">
            <h4 className="text-[#70E000] font-sans font-extrabold text-xs uppercase tracking-widest">
              Official Directory
            </h4>
            <div className="space-y-5 text-xs text-white/70 font-sans">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-[#FFD54F] uppercase tracking-wider block mb-2">
                      City Mayor's Office
                    </span>
                    <div className="space-y-1 text-white/60 font-medium">
                      <p className="h-5 flex items-center"><span className="text-white/45">BABA Hotline:</span>&nbsp;<span className="font-semibold text-[#FFD54F] font-mono">411 2222</span></p>
                      <p className="h-5 flex items-center"><span className="text-white/45">Office Line 1:</span>&nbsp;<span className="font-mono">(038) 412-3715</span></p>
                      <p className="h-5 flex items-center"><span className="text-white/45">Office Line 2:</span>&nbsp;<span className="font-mono">(038) 422-8011</span></p>
                    </div>
                  </div>

                  <div className="flex flex-col border-t border-white/10 pt-3">
                    <span className="font-sans font-bold text-[#FFD54F] uppercase tracking-wider block mb-2">
                      City Tourism Office
                    </span>
                    <div className="space-y-1 text-white/60 font-medium">
                      <p className="h-5 flex items-center"><span className="text-white/45">Direct Line:</span>&nbsp;<span className="font-mono">(038) 411-2222</span></p>
                      <p className="h-5 flex items-center"><span className="text-white/45">Extension:</span>&nbsp;<span className="font-mono">Local 167</span></p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col space-y-4">
                  <div className="flex flex-col">
                    <span className="font-sans font-bold text-[#FFD54F] uppercase tracking-wider block mb-2">
                      Tagbilaran City Police (PNP)
                    </span>
                    <div className="space-y-1 text-white/60 font-medium">
                      <p className="h-5 flex items-center"><span className="text-white/45">Hotline 1:</span>&nbsp;<span className="font-mono">0912 624 4203</span></p>
                      <p className="h-5 flex items-center"><span className="text-white/45">Hotline 2:</span>&nbsp;<span className="font-mono">0906 746 4252</span></p>
                      <p className="h-5 flex items-center">
                        <a 
                          href="https://www.facebook.com/TagbilaranCPS/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#70E000] hover:text-[#FFD54F] underline font-bold tracking-wide transition-colors"
                          id="footer-pnp-fb"
                        >
                          Click to Visit PNP Official FB Page
                        </a>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col border-t border-white/10 pt-3">
                    <span className="font-sans font-bold text-[#FFD54F] uppercase tracking-wider block mb-2">
                      Tagbilaran BFP
                    </span>
                    <div className="space-y-2 text-white/60 font-medium">
                      <div>
                        <p className="text-[#FFD54F]/80 text-[10px] font-sans font-bold uppercase tracking-wider mb-0.5">Central Fire Station</p>
                        <p><span className="text-white/45">Globe:</span> <span className="font-mono">0965 320 3000</span></p>
                        <p><span className="text-white/45">Smart:</span> <span className="font-mono">0948 984 7487</span></p>
                        <p><span className="text-white/45">Landline:</span> <span className="font-mono">(038) 235-3911</span></p>
                      </div>
                      <div className="pt-1.5 border-t border-white/5">
                        <p className="text-[#FFD54F]/80 text-[10px] font-sans font-bold uppercase tracking-wider mb-0.5">Substation 2 (Ubujan)</p>
                        <p><span className="text-white/45">Hotline:</span> <span className="font-mono">0924 074 8652</span></p>
                      </div>
                      <p className="pt-1">
                        <a 
                          href="https://www.facebook.com/bfptagbilaran/" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-[#70E000] hover:text-[#FFD54F] underline font-bold tracking-wide transition-colors"
                          id="footer-bfp-fb"
                        >
                          Click to Visit BFP Official FB Page
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto">
        {/* Elegant horizontal border divider line */}
        <div className="w-full h-[1px] bg-white/10 my-8" />

        {/* Bottom Legal & Credits Row */}
        <div className="flex flex-col md:flex-row items-center justify-between text-xs font-sans text-white/50 gap-4" id="footer-bottom-row">
          <div className="flex flex-col sm:flex-row items-center gap-x-4 gap-y-1 text-center md:text-left">
            <span>
              © {new Date().getFullYear()} City Government of Tagbilaran. All rights reserved.
            </span>
            <span className="hidden sm:inline text-white/20">|</span>
            <span className="text-white/40">
              City Mayor's Office StratCom • Tourism &amp; Cultural Affairs Office
            </span>
          </div>

          <div className="flex items-center gap-1 font-semibold text-white/60">
            <span>Made in Bohol, Philippines</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
