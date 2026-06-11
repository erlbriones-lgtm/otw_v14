import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, ExternalLink, Minimize2, Sparkles, MapPin, Milestone, BookOpen, Gift, Compass } from "lucide-react";
import { tagbilaranBarangays } from "../data";

// Explicit visual mapping matching real local scenic assets (using original trios)
const barangayImages: Record<string, string> = {
  "Barangay Bool": "/webp/Blood Compact Shrine (21).webp",
  "Barangay Booy": "/webp/Taloto to Manga Coastline (6).webp",
  "Barangay Cabawan": "/webp/Blood Compact Shrine (20).webp",
  "Barangay Cogon": "/webp/City Lights of Tagbilaran (11).webp",
  "Barangay Dampas": "/webp/Bohol Blades (3).webp",
  "Barangay Dao": "/webp/City Lights of Tagbilaran (9).webp",
  "Barangay Manga": "/webp/Taloto to Manga Coastline (1).webp",
  "Barangay Mansasa": "/webp/Taloto to Manga Coastline (6).webp",
  "Barangay Poblacion I": "/webp/Poblacion 1, Tagbilaran City (2).webp",
  "Barangay Poblacion II": "/webp/Poblacion 1, Tagbilaran City (1).webp",
  "Barangay Poblacion III": "/webp/Old House in Poblacion 1 (7).webp",
  "Barangay San Isidro": "/webp/Blood Compact Shrine (2).webp",
  "Barangay Taloto": "/webp/Tubig Dako in Taloto (1).webp",
  "Barangay Tiptip": "/webp/City Lights of Tagbilaran (8).webp",
  "Barangay Ubujan": "/webp/Capt. Salazar Monument (1).webp"
};

interface BarangayExtraDetails {
  origin: string;
  specialty: string;
  heritageHighlight: string;
  products: string[];
  productDesc: string;
}

const barangayDetails: Record<string, BarangayExtraDetails> = {
  "Barangay Bool": {
    origin: "Named after the historic Bool (or 'Bo-ol') tree sub-species which once flourished along the coast. It was on these shores on March 16, 1565, that native Chieftain Datu Sikatuna and Spanish General Miguel López de Legazpi executed the legendary Blood Compact (Sandugo), forming the first international treaty of peace and global friendship.",
    specialty: "Houses the world-renowned bronze Sandugo monument sculpted by Boholano National Artist Napoleon Abueva. It commands spectacular coastal overlooks of the Mindanao Sea and serves as a peaceful hub for cross-cultural reflection.",
    heritageHighlight: "The sovereign birthplace of international diplomacy and peaceful East-West alliances.",
    products: ["Clay Commemorative Replicas", "Sandugo Souvenirs", "Commemorative Medallions", "Cliffside Native Wines"],
    productDesc: "Local artisans curate high-quality clay moldings of the Sandugo cup and miniature galleon models that celebrate history."
  },
  "Barangay Booy": {
    origin: "Venerated through oral folklore, Booy's name stems from 'boyo' (the native betel nut leaf vine) which coastal travelers picked in great abundance along resting trails during pre-colonial maritime trade.",
    specialty: "Boasts a highly preserved mangrove protection zone, quiet seaside chapels, active fishing harbors, and premium shoreline views that catch beautiful Visayan sunrises.",
    heritageHighlight: "A serene coastal paradise balancing ecological conservation and local fisheries.",
    products: ["Cured Sea Salt (Asin Tibuok style)", "Sun-dried Skipjack Flakes", "Betel Nut Preparations", "Shell-built Necklaces"],
    productDesc: "Traditional fishing folk maintain custom marine preservation methods, drying sweet seafood and curing unique artisanal salt."
  },
  "Barangay Cabawan": {
    origin: "Emerged from the word 'kabaw' (the water buffalo or carabao), identifying this rural upland terrain as the historic municipal grazing meadow where early farmers gathered to graze their herds.",
    specialty: "The lush countryside lung of Tagbilaran, offering wide rolling emerald ridges, family-led organic farms, quiet woodland paths, and incredible eco-tourism potential.",
    heritageHighlight: "Peaceful inland agro-forestry and traditional pastoral customs.",
    products: ["Wild Forest Honey", "Kesong Puti (Carabao Cheese)", "Handwoven Carabao Harnesses", "Splintered Bamboo Baskets"],
    productDesc: "Agro-forestry products flourish here with high-grade organic honeycomb harvesting and traditional wood-stove dairy crafting."
  },
  "Barangay Cogon": {
    origin: "Named after 'cogon grass' (Imperata cylindrica) which natively blanketed the high, flat plains of pre-war Tagbilaran prior to its commercial development as a core city district.",
    specialty: "The primary commercial nerve center of Tagbilaran, hosting key transport lanes, bustling shops, regional retail departments, and rich local food markets.",
    heritageHighlight: "A lively trade district driving Tagbilaran's busy economic growth.",
    products: ["Classic Sweet Calamay", "Gourmet Peanut Kisses", "Traditional Tablea Rolls", "Handwoven Abaca Purses"],
    productDesc: "Acts as the central market for Bohol's most famous delicacies, serving freshly packed calamay cooked inside polished coconuts."
  },
  "Barangay Dampas": {
    origin: "Rooted in the Visayan term 'dampas', which described the laborious manual clearing of dense, thorny thickets undertaken by early settlers to build agricultural settlements.",
    specialty: "The historic craft capital keeping traditional loom weaving (hablon) and heavy steel blacksmithing alive, preserving incredible manual arts against automation.",
    heritageHighlight: "Preserving the fiery historical craft of handloom weaving and blacksmithing.",
    products: ["Tempered Steel Bolo Knives", "Loom-woven Hablon Textiles", "High-Carbon Cleavers", "Traditional Native Sacks"],
    productDesc: "Veteran metalworkers manually forge historic Boholano blades, and senior weavers operate massive traditional wooden frames."
  },
  "Barangay Dao": {
    origin: "Derived from the majestic, century-old 'Dao Tree' (Dracontomelon dao) which once stood tall at the primary crossroad, providing cooling shade for incoming inland travelers.",
    specialty: "Hosts the provincial transport focal point (Bohol Integrated Bus Terminal) and the sprawling Island City Mall, serving as the commercial core connecting all Bohol towns.",
    heritageHighlight: "The main regional transportation gateway and retail epicenter of Bohol.",
    products: ["Travel Memorabilia Packs", "Polished Native Woodcrafts", "Regional Food Samplers", "Traditional Carry-on Cases"],
    productDesc: "A bustling commerce gateway where travelers can conveniently pick up handmade souvenirs and Bohol-grown delicacies."
  },
  "Barangay Manga": {
    origin: "Named after the wild, sturdy mango trees ('manga') that natively lined the marine coasts, providing shelter and shade to early fishers returning with their daily catch.",
    specialty: "Famed for its traditional wood-fired brick sheds and clay potteries (turning native mud into elegant earthenware). Holds a modern fish port and busy coastal trade.",
    heritageHighlight: "The premier terracotta pottery center and primary seaside fishing base.",
    products: ["Earthen Cooking Pots (Anglit)", "Terracotta Jars & Urns", "Fresh Catch Skipjack", "Hand-molded Tiles"],
    productDesc: "Artisans shape durable local clay on hand-powered kick-wheels, firing kitchen pottery inside ancient wood-stoved stone kilns."
  },
  "Barangay Mansasa": {
    origin: "Named from 'pansasa' or 'sasa' (wild thatch palms), reflecting the dense coastal nipa swamps where early residents harvested material to braid windproof thatched roofing panels.",
    specialty: "Features historic stone-built spring wells, colonial steps, and beautiful high cliffside vistas looking directly down into the Tagbilaran-Panglao strait.",
    heritageHighlight: "Natural cliffside spring chambers and breathtaking sunset straits vistas.",
    products: ["Braided Palm Thatch Panels", "Premium Virgin Coconut Oil", "Copra Charcoal Briquettes", "Fresh Coconut Husks"],
    productDesc: "Rich coconut groves power a highly preserved family tradition of slow-extracting cold-pressed virgin coconut oil."
  },
  "Barangay Poblacion I": {
    origin: "The original Spanish settlement nucleus founded under the Jesuit mission of 1595, serving as the sovereign administrative, historical, and religious heart of the province.",
    specialty: "Home to the historic Cathedral of St. Joseph the Worker, City Plaza Rizal, and the historical Municipal City Hall buildings (displaying classical Spanish layouts).",
    heritageHighlight: "The sovereign administrative, religious, and historical focus of Tagbilaran.",
    products: ["High-Grade Cacao Tablea", "Artisanal Broas (Sponge Cookies)", "Scapulars & Wood Statuary", "Spanish Egg-Polvoron"],
    productDesc: "Local bakeries continue baking ancestral egg-heavy broas, and traditional roasters grind raw cacao seeds into dark morning tablets."
  },
  "Barangay Poblacion II": {
    origin: "Emerged as the progressive intellectual extension area during the late Spanish and pre-war American eras, hosting the city's first high schools and academies.",
    specialty: "Anchors the Bohol National Museum (previously the historic Provincial Capitol), beautiful university campus parks, and the main banking financial avenues.",
    heritageHighlight: "Museum archives, premium universities, and historical library collections.",
    products: ["Handcarved Wooden Chess Sets", "Bohol Historical Journals", "Fine Arts Prints", "Heritage Greeting Cards"],
    productDesc: "Local craft shops produce custom hand-carved chess sets, honoring former Philippine President Carlos P. Garcia's famous chessboard hobbies."
  },
  "Barangay Poblacion III": {
    origin: "The oldest maritime port base ('Sitio Ubos'), representing the historical lower harbor district where Spanish-Filipino-Chinese merchants built stone warehouses.",
    specialty: "Home to the main modern Tagbilaran Passenger seaport and blocks of original, magnificently preserved Spanish-colonial ancestral 'Bahay na Bato' houses.",
    heritageHighlight: "Vibrant maritime seaport gateway and ancestral timber architecture.",
    products: ["Ancestral House Miniatures", "Spiced Dried Flying Fish", "Seaweed Salad (Guso) Packs", "Scenic Postcards"],
    productDesc: "Portside craftsmen create beautiful wood-and-capiz miniatures of native ancestral houses, popular with global collectors."
  },
  "Barangay San Isidro": {
    origin: "Named in honor of San Isidro Labrador, the patron saint of farmers, marking the deep agrarian roots and heritage of its early inland farming families.",
    specialty: "Blessed with deep, rich red clay deposits. Home to beautiful ornamental plant nurseries, organic vegetable greenhouses, and family-owned agricultural centers.",
    heritageHighlight: "A green farming sanctuary rich in high-quality natural red clay.",
    products: ["Red Clay Flower Pots (Paso)", "Organic Herbal Plants", "Homegrown Dragon Fruits", "Handspun Red Vases"],
    productDesc: "Families harvest local red clay to craft rustic structural planters and garden elements distributed across Central Visayas."
  },
  "Barangay Taloto": {
    origin: "Named after the historic 'taloto' tree or 'talo' (natural bee wax), which early tribal groups gathered inside dense woodlands to trade with early global mariners.",
    specialty: "Houses the unique 'Tubig Dako' freshwater spring cave system, quiet coastal beaches, and vast mangrove preservation forests.",
    heritageHighlight: "Mysterious freshwater cave springs and lush coastal mangrove reserves.",
    products: ["Mangrove Blossom Honey", "Tuba (Fermented Coconut Wine)", "Nipa Hand-brooms", "Traditional Forest Balms"],
    productDesc: "Experienced tuba gatherers scale coconut crowns daily to ferment sweet, organic coconut sap into legendary native wine."
  },
  "Barangay Tiptip": {
    origin: "Derived from 'tip-tip', the repetitive sound of masonry chisels tapping against limestone blocks. Historically, early craftsmen quarried lime blocks here to construct Bohol churches.",
    specialty: "Upland rolling trails, pristine limestone quarry sights, quiet rustic roads, and progressive suburban community growth.",
    heritageHighlight: "Historic limestone quarries and gorgeous panoramic upland walking routes.",
    products: ["Carved Limestone Sculptures", "Upland Honeycomb", "Pure Lime Dust Blocks", "Sweet Cassava Crackers"],
    productDesc: "Local stone artists chip beautiful limestone garden figurines, and home-bakers bake crunchy, sweet cassava chips."
  },
  "Barangay Ubujan": {
    origin: "Named after 'ubod' or 'ubuj' (the edible heart of palm), highlighting the edible wild palm species harvested along the ridges by early revolutionary forces.",
    specialty: "Perched on spectacular cliffside ridges overlooking the ocean. Anchors the Holy Name University campus and wartime memorials celebrating guerrilla heroism.",
    heritageHighlight: "Scenic university ridges and historical World War II battlefield memorials.",
    products: ["Gourmet Pickled Palm Hearts", "Artisanal Highland Teas", "Wartime Heritage Medals", "Polished Shell Wall Arts"],
    productDesc: "Gourmet kitchens bottle sweet, spicy pickled palm hearts harvested ethically from non-threatened agricultural palm groves."
  }
};


export const TagbilaranDashboard: React.FC = () => {
  const [selectedBarangayName, setSelectedBarangayName] = useState<string>("Barangay Bool");
  const [isDetailMode, setIsDetailMode] = useState<boolean>(false);

  // Auto scroll to top on change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [isDetailMode]);

  const activeBarangay = tagbilaranBarangays.find(b => b.name === selectedBarangayName) || tagbilaranBarangays[0];
  const activeImage = barangayImages[activeBarangay.name] || "/webp/Poblacion 1, Tagbilaran City (2).webp";

  return (
    <div className="w-full relative min-h-screen bg-stone-50 text-[#05461a] select-none overflow-hidden pb-0 transition-colors duration-1000" id="barangay-dashboard-outer">
      
      {/* Elegant Shared Dynamic Blurred Background that updates when user hovers or is in full screen */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white">
        <motion.img
          key={activeImage}
          src={activeImage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.70 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="w-full h-full object-cover filter blur-[12px] scale-105 will-change-transform translate-z-0"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-white/40" />
      </div>

      <AnimatePresence mode="wait">
        {!isDetailMode ? (
          /* ================= FIRST VIEW: PORTAL SPLIT SYSTEM ================= */
          <motion.div
            key="split-portal"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-[1550px] mx-auto px-4 sm:px-6 md:px-8 mt-2 lg:mt-4 relative z-20 min-h-[72vh]"
            id="barangay-split-portal"
          >
            {/* DESKTOP SPLIT SYSTEM: Visible only on lg (1024px) screens and up */}
            <div className="hidden lg:grid lg:grid-cols-12 gap-8 items-stretch w-full min-h-[72vh]" id="barangay-desktop-portal">
              {/* COLUMN 1: CLICKABLE LIST (Left Third, original width, with separator moved left next to the text) */}
              <div className="lg:col-span-3 flex flex-col justify-center max-h-[70vh] lg:max-h-none overflow-y-auto lg:overflow-visible scrollbar-none lg:-ml-6" id="brgy-clickable-list-col">
                <div className="space-y-3 border-r border-[#05461a]/10 pr-6 w-fit" id="brgy-list-inner">
                  {tagbilaranBarangays.map((brgy) => {
                    const isSelected = brgy.name === selectedBarangayName;
                    const cleanName = brgy.name.replace("Barangay ", "").toUpperCase();

                    return (
                      <button
                        key={brgy.name}
                        onMouseEnter={() => setSelectedBarangayName(brgy.name)}
                        onClick={() => setIsDetailMode(true)}
                        className={`w-full text-left flex items-baseline gap-3 cursor-pointer focus:outline-none group transition-all duration-300 ${
                          isSelected 
                            ? "text-[#38B000] scale-102 font-black pl-2 border-l-2 border-[#38B000]" 
                            : "text-[#05461a]/50 hover:text-[#38B000] hover:pl-1 font-semibold"
                        }`}
                      >
                        <span className="font-sans text-xl sm:text-2xl lg:text-3xl font-black tracking-tight leading-none uppercase">
                          {cleanName}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* COLUMN 2: MAIN IMAGE CANVAS (Center, original wider column-span and aspect-ratio) */}
              <div className="lg:col-span-6 flex items-center justify-start lg:-ml-12 xl:-ml-16 relative bg-transparent" id="brgy-image-canvas-col">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedBarangayName}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4 }}
                    className="w-full relative aspect-[4/5] lg:aspect-[4/3] xl:aspect-[1.12/1] rounded-[24px] overflow-hidden shadow-2xl border border-[#05461a]/15 group bg-[#05461a]/5 cursor-pointer"
                    onClick={() => setIsDetailMode(true)}
                  >
                    <img
                      src={activeImage}
                      alt={activeBarangay.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#02200a]/80 via-transparent to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* COLUMN 3: BRIEF DESCRIPTION & ENTRY TO FULLSCREEN (Right Third) */}
              <div className="lg:col-span-3 flex flex-col justify-end text-left" id="brgy-desc-action-col">
                <div className="space-y-6 pb-6 pr-2 lg:pl-4">
                  <div className="space-y-2">
                    <span className="font-mono text-[9px] tracking-widest text-[#05461a]/60 font-black uppercase block">
                      {activeBarangay.category} COMMUNITY DISTRICT
                    </span>
                    <p className="font-sans text-sm sm:text-base text-[#05461a]/85 leading-relaxed font-semibold">
                      {activeBarangay.desc}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* MOBILE & TABLET SYSTEM: Visible only below lg breakpoint (1024px) */}
            <div className="lg:hidden flex flex-col space-y-4 pt-2" id="barangay-mobile-portal">
              {/* Header */}
              <div className="text-left py-1">
                <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#38B000] font-black uppercase">
                  TAGBILARAN LOCAL HERITAGE HUB
                </span>
                <h3 className="font-sans text-2xl sm:text-3xl font-black text-[#05461a] tracking-tight uppercase leading-tight mt-0.5">
                  Explore The 15 Districts
                </h3>
              </div>

              {/* Touch Scroll Swiper of Barangays */}
              <div className="w-full overflow-x-auto scrollbar-none -mx-4 px-4 py-1" id="mobile-capsule-scroller">
                <div className="flex gap-2.5 pb-2 min-w-max">
                  {tagbilaranBarangays.map((brgy) => {
                    const isSelected = brgy.name === selectedBarangayName;
                    const cleanNameStr = brgy.name.replace("Barangay ", "");
                    const brgyImg = barangayImages[brgy.name] || "";

                    return (
                      <button
                        key={brgy.name}
                        onClick={() => setSelectedBarangayName(brgy.name)}
                        className={`flex items-center gap-2 px-3.5 py-2.5 rounded-full border text-xs sm:text-sm font-black uppercase transition-all duration-300 cursor-pointer ${
                          isSelected
                            ? "bg-[#05461a] border-[#38B000] text-white shadow-lg scale-102"
                            : "bg-white/90 text-[#05461a]/80 border-[#05461a]/15 hover:border-[#38B000]/60 hover:bg-white"
                        }`}
                      >
                        <div className="w-5 h-5 rounded-full overflow-hidden border border-emerald-100 flex-shrink-0 bg-stone-100">
                          <img src={brgyImg} className="w-full h-full object-cover" alt="" referrerPolicy="no-referrer" />
                        </div>
                        <span className="tracking-wide">{cleanNameStr}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Unified Hero Interactive Sandbox Card for Mobile & Tablet */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedBarangayName}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-[#05461a]/15 shadow-xl space-y-4 text-left"
                >
                  {/* Aspect Locked Media Frame */}
                  <div 
                    onClick={() => setIsDetailMode(true)}
                    className="w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden relative shadow-md cursor-pointer group"
                  >
                    <img
                      src={activeImage}
                      alt={activeBarangay.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />
                    
                    {/* Category Overlay Pill */}
                    <span className="absolute top-3 left-3 bg-[#38B000] text-white text-[9px] sm:text-[10px] font-mono tracking-widest px-2.5 py-1 rounded font-black uppercase shadow-md">
                      {activeBarangay.category}
                    </span>

                    {/* Touch Prompt Callout */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#FFD54F]/95 text-black text-[9px] sm:text-[10px] font-mono tracking-widest px-3 py-1.5 rounded-sm font-black uppercase shadow-lg animate-pulse">
                      <Sparkles className="w-3.5 h-3.5 text-black" />
                      Tap To Explore History
                    </div>
                  </div>

                  {/* Informational Sub-Panel */}
                  <div className="space-y-3.5">
                    <div>
                      <h4 className="font-sans text-xl sm:text-2xl font-black text-[#05461a] uppercase tracking-tight leading-tight">
                        {activeBarangay.name}
                      </h4>
                      <p className="font-mono text-[10px] sm:text-xs tracking-widest text-[#38B000] font-black uppercase mt-0.5">
                        {activeBarangay.heritage}
                      </p>
                    </div>

                    <p className="font-sans text-xs sm:text-sm text-[#05461a]/80 leading-relaxed font-semibold">
                      {activeBarangay.desc}
                    </p>

                    {/* Highly tactile thumb-friendly Action Button */}
                    <button
                      onClick={() => setIsDetailMode(true)}
                      className="w-full py-3.5 sm:py-4 px-4 rounded-xl bg-gradient-to-r from-[#05461a] to-[#043313] hover:from-[#38B000] hover:to-[#05461a] text-white font-sans text-xs sm:text-sm tracking-wider font-extrabold uppercase shadow-lg flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.98] transition-all cursor-pointer border border-[#8EE6A8]/30"
                    >
                      EXPLORE RICH HERITAGE & CRAFTS
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : (
          /* ================= SECOND VIEW: CINEMATIC FULLSCREEN DETAIL ================= */
          <motion.div
            key="cinematic-fullscreen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.55 }}
            className="w-full relative flex flex-col select-none"
            id="barangay-cinematic-view-container"
          >
            {/* Cinematic Section (takes responsive min-h with background, title and navigation) */}
            <div className="w-full min-h-[40vh] sm:min-h-[55vh] md:min-h-[82vh] relative flex flex-col justify-between items-center px-4 md:px-12 py-8 sm:py-12 text-center overflow-hidden" id="barangay-cinematic-hero">
              {/* Absolute Background image with custom forest-green / dark vignette cover */}
              <div className="absolute inset-0 z-0">
                <img
                  src={activeImage}
                  alt={activeBarangay.name}
                  className="w-full h-full object-cover transition-all duration-500 filter blur-md scale-102 will-change-transform translate-z-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#064a1b]/90 via-[#0d6b2c]/60 to-black/55 pointer-events-none" />
                <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#064a1b]/90 to-transparent pointer-events-none" />
              </div>

              {/* Back button (Positioned absolute in the top-left corner and smaller) */}
              <button
                onClick={() => setIsDetailMode(false)}
                className="absolute top-6 left-6 md:top-8 md:left-12 z-30 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#0b6326]/95 hover:bg-[#FF9850] text-[#FFD54F] hover:text-black font-sans font-black tracking-widest text-[10px] sm:text-xs uppercase border border-[#FFD54F]/20 transition-all cursor-pointer pointer-events-auto shadow-md"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                BACK TO OVERVIEW
              </button>

              {/* Content Core: Large centered texts */}
              <div className="w-full max-w-6xl text-center py-12 md:py-20 z-10 space-y-10 my-auto" id="cinematic-content">
                {/* Giant Name with adaptive scaling (never wraps to 1 letter or truncates with ellipsis) */}
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className={`font-sans font-black text-[#FFD54F] leading-none tracking-tight uppercase drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)] text-center break-words select-none px-2 ${
                    activeBarangay.name.replace("Barangay ", "").length > 10 
                      ? "text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-[7.5rem]" 
                      : "text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] xl:text-[11.5rem]"
                  }`}
                >
                  {activeBarangay.name.replace("Barangay ", "")}
                </motion.h2>

                {/* Full descriptive text of the Barangay */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="font-sans text-white text-sm sm:text-base md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto font-black drop-shadow-[0_2px_12px_rgba(0,0,0,0.95)] text-center px-4"
                >
                  {activeBarangay.desc} {activeBarangay.tip ? `Venture to find our ${activeBarangay.tip}.` : ""}
                </motion.p>
              </div>

              {/* Bounce Down indicator to encourage scrolling */}
              <div className="z-10 flex flex-col items-center gap-1.5 animate-bounce text-[#FFD54F] opacity-90 pb-2">
                <span className="font-mono text-[9px] font-black tracking-widest uppercase">DISCOVER HISTORY & SPECIALTY</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </div>
            </div>

            {/* WHITE BACKGROUND ONLY SECTION (Beautiful 3-Column Editorial Layout) */}
            <div className="w-full bg-white text-[#05461a] py-16 px-6 sm:px-12 md:px-16 lg:px-24 border-t border-emerald-100 z-10 relative text-left" id="barangay-white-section">
              <div className="max-w-7xl mx-auto space-y-12">
                
                {/* Section Header */}
                <div className="border-b border-[#05461a]/10 pb-6">
                  <h3 className="font-sans text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">
                    Cultural Identity of {activeBarangay.name}
                  </h3>
                </div>

                {/* 3-Column Informational Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 items-stretch" id="heritage-columns-grid">
                  
                  {/* Column 1: ORIGIN & HISTORY */}
                  <div className="flex flex-col space-y-4 p-6 rounded-2xl bg-stone-50/50 border border-stone-200/40">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#38B000]/10 flex items-center justify-center text-[#38B000]">
                        <Compass className="w-5 h-5" />
                      </div>
                      <h4 className="font-sans text-lg font-black tracking-wider uppercase text-[#05461a]">
                        Origin & History
                      </h4>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-[#05461a]/80 leading-relaxed text-justify">
                      {barangayDetails[activeBarangay.name]?.origin || "This neighborhood roots state traditional Boholano foundations, established over decades of family-run operations of agricultural, coastal, and urban heritage."}
                    </p>
                  </div>

                  {/* Column 2: BARANGAY SPECIALTY */}
                  <div className="flex flex-col space-y-4 p-6 rounded-2xl bg-[#0d6b2c]/6 border border-[#0d6b2c]/12">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#0d6b2c]/10 flex items-center justify-center text-[#0d6b2c]">
                        <BookOpen className="w-5 h-5" />
                      </div>
                      <h4 className="font-sans text-lg font-black tracking-wider uppercase text-[#05461a]">
                        Barangay Specialty
                      </h4>
                    </div>
                    <p className="font-sans text-sm sm:text-base text-[#05461a]/85 leading-relaxed text-justify">
                      <span className="font-bold text-[#38B000] block mb-1">
                        {barangayDetails[activeBarangay.name]?.heritageHighlight || activeBarangay.heritage}
                      </span>
                      {barangayDetails[activeBarangay.name]?.specialty || "Fosters a beautiful community of craftsman and deep local tourist hubs, keeping our historic legacy highly relevant."}
                    </p>
                  </div>

                  {/* Column 3: PRODUCTS & CRAFTS */}
                  <div className="flex flex-col space-y-4 p-6 rounded-2xl bg-[#FF9850]/5 border border-[#FF9850]/20">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#FF9850]/15 flex items-center justify-center text-[#e65100]">
                        <Gift className="w-5 h-5" />
                      </div>
                      <h4 className="font-sans text-lg font-black tracking-wider uppercase text-[#05461a]">
                        Local Products & Crafts
                      </h4>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {(barangayDetails[activeBarangay.name]?.products || ["Handwoven baskets", "Agricultural crops", "Fresh catch"]).map((item, idx) => (
                          <span 
                            key={idx} 
                            className="bg-white border border-stone-200 text-stone-700 px-3 py-1 rounded-full text-xs font-mono font-semibold hover:border-[#38B000] transition-colors"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-[#05461a]/80 leading-relaxed italic border-t border-stone-100 pt-3">
                        {barangayDetails[activeBarangay.name]?.productDesc || "Traditional families produce agricultural items and home crafts sourced directly from the local materials found within the barangay boundaries."}
                      </p>
                    </div>
                  </div>

                </div>

                {/* Sub-navigation link pointing back to map hub */}
                <div className="pt-8 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between text-xs gap-4">
                  <div className="text-stone-500 font-mono flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#38B000] animate-pulse"></span>
                    Currently viewing: <strong className="text-[#05461a]">{activeBarangay.name}</strong>
                  </div>
                  <button
                    onClick={() => {
                      setIsDetailMode(false);
                      window.scrollTo({ top: 350, behavior: "smooth" });
                    }}
                    className="font-sans font-black tracking-wider text-[#38B000] hover:text-[#05461a] transition-all uppercase cursor-pointer flex items-center gap-1.5 hover:translate-x-[-2px]"
                  >
                    &larr; BACK TO MAP HUB
                  </button>
                </div>

              </div>
            </div>

            {/* TAKE A LOOK CAROUSEL SECTION (Wavy connector path, right-to-left smooth hardware accelerated sliding) */}
            <div className="w-full bg-gradient-to-b from-[#064a1b] via-[#0e6128] to-[#033010] py-10 md:py-20 relative overflow-hidden text-left border-t border-emerald-500/10" id="barangay-take-a-look-section">
              {/* Injecting hardware-accelerated CSS Marquee Animation with slower, smoother pacing */}
              <style dangerouslySetInnerHTML={{ __html: `
                @keyframes marquee-rtl {
                  0% { transform: translate3d(0, 0, 0); }
                  100% { transform: translate3d(-50%, 0, 0); }
                }
                @media (min-width: 1024px) {
                  .animate-marquee-custom {
                    display: flex;
                    width: max-content;
                    animation: marquee-rtl 95s linear infinite;
                    will-change: transform;
                    backface-visibility: hidden;
                  }
                  .animate-marquee-custom:hover {
                    animation-play-state: paused;
                  }
                }
                @media (max-width: 1023px) {
                  .animate-marquee-custom {
                    display: flex;
                    width: auto !important;
                    overflow-x: auto;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                    gap: 1rem;
                    padding-bottom: 12px;
                  }
                  .animate-marquee-custom::-webkit-scrollbar {
                    display: none;
                  }
                }
              `}} />

              {/* Background Glows and Connecting Amber Trail Line */}
              <div className="absolute top-1/4 left-[-10%] w-[500px] h-[500px] rounded-full bg-[#FFD54F]/5 blur-[120px] pointer-events-none" />
              <div className="absolute bottom-1/4 right-[-10%] w-[500px] h-[500px] rounded-full bg-[#38B000]/10 blur-[120px] pointer-events-none" />
              
              {/* Wavy Horizontal Path Line representing the local network connecting neighborhoods */}
              <div className="absolute top-[52%] md:top-[56%] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#FF9850]/25 to-transparent pointer-events-none z-0" />

              {/* Header Container */}
              <div className="max-w-3xl mx-auto px-6 mb-12 relative z-10 text-center flex flex-col items-center justify-center" id="carousel-header-container">
                <h2 className="font-sans text-3xl sm:text-5xl md:text-6xl font-black text-[#FFD54F] tracking-tight uppercase drop-shadow-[0_2px_12px_rgba(0,0,0,0.4)] select-none">
                  HERITAGE DISTRICTS
                </h2>
              </div>

              {/* Infinite Scrolling Track */}
              <div className="w-full relative overflow-hidden z-10 py-4" id="infinite-scrolling-track">
                <div className="animate-marquee-custom flex gap-6 md:gap-8 px-4">
                  {/* Triple rendering array ensures there are no gaps on high-resolution widescreen displays */}
                  {[...tagbilaranBarangays, ...tagbilaranBarangays, ...tagbilaranBarangays].map((otherBarangay, index) => {
                    const uniqueIndexId = `${otherBarangay.name}-${index}`;
                    const isActive = otherBarangay.name === activeBarangay.name;
                    const cleanNameStr = otherBarangay.name.replace("Barangay ", "");
                    
                    return (
                      <div
                        key={uniqueIndexId}
                        onClick={() => {
                          setSelectedBarangayName(otherBarangay.name);
                          // Soft, gorgeous transition: scroll up elegantly to active detail view
                          const heroContainer = document.getElementById("barangay-cinematic-hero");
                          if (heroContainer) {
                            heroContainer.scrollIntoView({ behavior: "smooth" });
                          } else {
                            window.scrollTo({ top: 350, behavior: "smooth" });
                          }
                        }}
                        className={`w-[280px] md:w-[340px] h-[370px] md:h-[440px] relative rounded-2xl overflow-hidden bg-black/60 border ${
                          isActive 
                            ? "border-[#FFD54F] shadow-[0_0_20px_rgba(255,213,79,0.3)] bg-[#0d6b2c]/90 scale-[1.02]" 
                            : "border-emerald-500/20 hover:border-[#FFD54F]/70 hover:bg-[#0d6b2c]/30"
                        } transition-all duration-300 flex-shrink-0 flex flex-col justify-between p-2 group cursor-pointer`}
                      >
                        {/* Image Frame - Expanded taller size */}
                        <div className="w-full h-[230px] md:h-[280px] rounded-xl overflow-hidden relative border border-white/10 group-hover:border-[#FFD54F]/40 transition-all pointer-events-none select-none">
                          <img 
                            src={barangayImages[otherBarangay.name] || "/webp/Blood Compact Shrine (28).webp"} 
                            alt={otherBarangay.name}
                            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            referrerPolicy="no-referrer"
                            loading="lazy"
                            decoding="async"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent text-left" />
                          
                          {/* Active Overlay Label */}
                          {isActive && (
                            <div className="absolute top-3 right-3 flex items-center gap-1 bg-[#FFD54F] text-black text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-md font-black uppercase shadow-lg">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-700 animate-ping" />
                              ACTIVE
                            </div>
                          )}

                          {/* Title - Centered at the bottom of the image */}
                          <div className="absolute bottom-4 inset-x-0 text-center font-sans px-3 flex justify-center items-center w-full z-10">
                            <h4 className="font-black text-xl md:text-2xl text-white group-hover:text-[#FFD54F] transition-colors leading-tight tracking-wide uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                              {cleanNameStr}
                            </h4>
                          </div>
                        </div>

                        {/* Brief Description below the image */}
                        <div className="text-center font-sans select-none pointer-events-none mt-2 px-3 pb-2 flex-grow flex flex-col justify-center items-center">
                          <p className="font-mono text-[9px] md:text-[10px] tracking-wider text-[#38B000] font-black uppercase mb-1">
                            {otherBarangay.heritage}
                          </p>
                          <p className="font-sans text-[11px] md:text-xs text-stone-300 group-hover:text-white transition-colors leading-relaxed line-clamp-3">
                            {otherBarangay.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>



          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
