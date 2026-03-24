import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AnimatedText } from './Typography';
import { sceneTransitions } from '@/lib/video';

export function Scene6_Closing() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),
      setTimeout(() => setPhase(2), 3000),
      setTimeout(() => setPhase(3), 5000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-bg-dark"
      {...sceneTransitions.fadeBlur}
    >
      <motion.img 
        src={`${import.meta.env.BASE_URL}student-happy.jpg`} 
        className="absolute inset-0 w-full h-full object-cover opacity-20"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "linear" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/90 to-bg-dark/40" />

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="w-[8vw] h-[8vw] bg-primary rounded-2xl flex items-center justify-center mb-[4vh] rotate-12 shadow-[0_0_50px_rgba(234,179,8,0.4)]"
        >
          <span className="text-bg-dark text-[4vw] font-bold font-display -rotate-12">L</span>
        </motion.div>

        <AnimatedText 
          text="Lerank" 
          className="font-display font-bold text-[7vw] mb-[3vh] text-white"
        />
        
        {phase >= 1 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[3vw] font-display text-primary mb-[6vh]"
          >
            Premium Guidance. Real Accountability.
          </motion.div>
        )}

        {phase >= 2 && (
          <motion.div 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            className="bg-white/5 border border-white/10 backdrop-blur-md px-[6vw] py-[3vh] rounded-full"
          >
            <span className="text-white text-[2vw] font-body">The trust-first marketplace.</span>
          </motion.div>
        )}

        {phase >= 3 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute bottom-[6vh] text-text-secondary text-[1.5vw] font-mono flex items-center gap-[1vw]"
          >
            <span>2,400+ Students matched</span>
            <span className="w-[0.5vw] h-[0.5vw] rounded-full bg-primary" />
            <span>Verified Consultants Only</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
