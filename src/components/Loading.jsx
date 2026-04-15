import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const Loading = () => {
  // --- SLOWER Animation variants for the geometric rings ---
  const ringVariants = {
    rotate: (custom) => ({
      rotate: custom.direction === 'clockwise' ? 360 : -360,
      transition: {
        duration: custom.duration, // Now custom tailored for slower speeds
        repeat: Infinity,
        ease: "linear"
      }
    })
  };

  // Variants for background particles
  const particleVariants = {
    animate: () => ({
      y: [0, -100, 0],
      x: [0, Math.random() * 50 - 25, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 10 + Math.random() * 10,
        repeat: Infinity,
        ease: "easeInOut",
        delay: Math.random() * 5,
      }
    })
  };

  return (
    <div className="min-h-screen w-full bg-[#030303] flex flex-col items-center justify-center gap-16 px-4 overflow-hidden relative">
      
      {/* --- PREMIUM DARK BACKGROUND ANIMATION --- */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Pulsing Dark Vignette */}
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#000_100%)]"
        />
        
        {/* Floating "Data" Particles */}
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={particleVariants}
            animate="animate"
            className="absolute w-1 h-1 bg-[#2ECC71]/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              filter: `blur(${Math.random() * 2}px)`,
            }}
          />
        ))}

        {/* Full-screen subtle scanline overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
      </div>

      {/* --- PREMIUM HUD ANIMATION (SLOWED DOWN) --- */}
      <div className="relative flex items-center justify-center w-48 h-48 z-10">
        
        {/* SLOWER Central Core Glow */}
        <motion.div 
          animate={{ 
            scale: [1, 1.15, 1],
            opacity: [0.6, 1, 0.6],
            boxShadow: [
              "0 0 20px rgba(46, 204, 113, 0.3)",
              "0 0 70px rgba(46, 204, 113, 0.7)",
              "0 0 20px rgba(46, 204, 113, 0.3)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-7 h-7 bg-[#2ECC71] rounded-full z-20 shadow-[0_0_15px_#2ECC71]"
        />

        {/* Outer Tech Ring 1 (Dashed) - Slower (3s -> 8s) */}
        <motion.div
          custom={{ direction: 'clockwise', duration: 8 }}
          variants={ringVariants}
          animate="rotate"
          className="absolute inset-0 rounded-full border-2 border-dashed border-[#2ECC71]/20"
        />

        {/* Outer Tech Ring 2 (Partial border) - Slower (2s -> 6s) */}
        <motion.div
          custom={{ direction: 'anticlockwise', duration: 6 }}
          variants={ringVariants}
          animate="rotate"
          className="absolute inset-4 rounded-full border-t-2 border-l-2 border-[#2ECC71] shadow-[0_0_20px_#2ECC71]"
        />

        {/* Triangle HUD Element - Slower (8s -> 15s) */}
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-25px] opacity-15"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-[#2ECC71] stroke-1">
             <polygon points="50,5 95,80 5,80" />
          </svg>
        </motion.div>

        {/* Status Indicator Dot (Gaming Feel) */}
        <div className="absolute top-2 right-2 flex items-center gap-1.5 p-1.5 px-3 rounded-full bg-black/50 border border-white/5 backdrop-blur-sm">
           <div className="w-2 h-2 rounded-full bg-[#2ECC71] animate-pulse" />
           <span className="text-[9px] font-black uppercase text-gray-500 tracking-widest">Online</span>
        </div>
      </div>

      {/* --- TEXT SECTION --- */}
      <div className="relative space-y-5 text-center z-10">
        
        {/* Main Title with "Glitch" feel (Slower glitch cycle) */}
        <motion.div
          className="relative inline-block"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-4xl md:text-7xl font-black italic tracking-[0.25em] text-white uppercase"
            animate={{ 
              textShadow: [
                "2px 2px #2ECC71",
                "-2px -2px #27ae60",
                "2px 2px #2ECC71"
              ] 
            }}
            transition={{ duration: 0.4, repeat: Infinity, repeatType: "mirror" }}
          >
            INITIALIZING
          </motion.h1>
        </motion.div>

        {/* Subtitle Staggered Reveal */}
        <div className="overflow-hidden">
          <motion.p 
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ delay: 0.5, duration: 1, ease: "circOut" }}
            className="text-[#2ECC71] font-mono text-sm md:text-lg tracking-[0.3em] uppercase opacity-80"
          >
            System.Booting_Experience.exe
          </motion.p>
        </div>

        {/* SLOWER Progress bar line (Decorative) */}
        <div className="w-64 h-[3px] bg-white/10 mx-auto mt-8 relative overflow-hidden rounded-full border border-white/5 shadow-inner">
           <motion.div 
             animate={{ x: ["-100%", "100%"] }}
             transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
             className="absolute inset-0 w-1/2 bg-[#2ECC71] shadow-[0_0_15px_#2ECC71]"
           />
        </div>
      </div>
    </div>
  )
}

export default Loading