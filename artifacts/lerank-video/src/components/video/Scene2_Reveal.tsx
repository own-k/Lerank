import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AnimatedText } from './Typography';
import { sceneTransitions } from '@/lib/video';

export function Scene2_Reveal() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 2500),
      setTimeout(() => setPhase(3), 4000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-bg-dark overflow-hidden"
      {...sceneTransitions.zoomThrough}
    >
      <motion.img 
        src={`${import.meta.env.BASE_URL}bg-abstract.png`} 
        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-lighten"
        initial={{ rotate: 5, scale: 1.2 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ duration: 8, ease: "easeOut" }}
      />
      
      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="mb-[4vh]"
        >
          <img src={`${import.meta.env.BASE_URL}shield-3d.png`} alt="Escrow Shield" className="w-[12vw] h-[12vw] drop-shadow-[0_0_40px_rgba(234,179,8,0.3)]" />
        </motion.div>

        {phase >= 1 && (
          <AnimatedText 
            text="Lerank" 
            className="font-display font-bold text-[8vw] mb-[2vh] tracking-tight text-white drop-shadow-2xl"
          />
        )}
        
        {phase >= 2 && (
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            className="text-[3vw] font-body text-text-secondary mb-[6vh]"
          >
            Escrow-Protected Consulting
          </motion.div>
        )}

        {phase >= 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-[2vw] bg-primary/10 border border-primary/30 px-[4vw] py-[2vh] rounded-full backdrop-blur-sm"
          >
            <span className="text-primary text-[2vw] font-bold font-display">Pay per milestone.</span>
            <span className="text-white text-[2vw] font-display">Not upfront.</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
