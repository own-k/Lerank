import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AnimatedText } from './Typography';
import { sceneTransitions } from '@/lib/video';

export function Scene1_Hook() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),
      setTimeout(() => setPhase(2), 3500),
      setTimeout(() => setPhase(3), 5500),
      setTimeout(() => setPhase(4), 8000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-bg-dark"
      initial={{ opacity: 1, scale: 1 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: 'circOut' }}
    >
      {/* Background Image / Texture */}
      <motion.img 
        src={`${import.meta.env.BASE_URL}student-stressed.jpg`} 
        className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale mix-blend-overlay"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/80 to-transparent" />

      {/* Content Container */}
      <div className="relative z-10 text-center w-[80vw] flex flex-col items-center">
        {phase >= 0 && (
          <AnimatedText 
            text="International students pay thousands upfront." 
            className="font-display font-bold text-[5vw] mb-[4vh] leading-tight text-gradient"
          />
        )}

        <div className="grid grid-cols-3 gap-[2vw] mt-[6vh] w-full">
          {phase >= 1 && (
            <motion.div 
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-bg-muted/40 backdrop-blur-xl border border-white/10 p-[2vw] rounded-2xl flex flex-col items-center"
            >
              <span className="text-error font-mono text-[4vw] font-bold mb-[2vh]">67%</span>
              <span className="text-text-secondary text-[1.5vw] font-body">face communication blackouts</span>
            </motion.div>
          )}

          {phase >= 2 && (
            <motion.div 
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-bg-muted/40 backdrop-blur-xl border border-white/10 p-[2vw] rounded-2xl flex flex-col items-center"
            >
              <span className="text-error font-mono text-[4vw] font-bold mb-[2vh]">$3k+</span>
              <span className="text-text-secondary text-[1.5vw] font-body">paid before any deliverable</span>
            </motion.div>
          )}

          {phase >= 3 && (
            <motion.div 
              initial={{ opacity: 0, y: 40, rotateX: 20 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              className="bg-bg-muted/40 backdrop-blur-xl border border-white/10 p-[2vw] rounded-2xl flex flex-col items-center"
            >
              <span className="text-error font-mono text-[4vw] font-bold mb-[2vh]">1 in 4</span>
              <span className="text-text-secondary text-[1.5vw] font-body">feel entirely oversold</span>
            </motion.div>
          )}
        </div>

        {phase >= 4 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-[8vh] text-[2.5vw] font-display text-text-primary bg-error/20 border border-error/30 px-[4vw] py-[2vh] rounded-full"
          >
            Zero Accountability.
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
