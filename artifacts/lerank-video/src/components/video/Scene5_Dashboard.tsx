import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AnimatedText } from './Typography';
import { sceneTransitions } from '@/lib/video';

export function Scene5_Dashboard() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1000),
      setTimeout(() => setPhase(2), 2500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-bg-dark"
      {...sceneTransitions.morphExpand}
    >
      <div className="absolute inset-0 z-0">
        <motion.img 
          src={`${import.meta.env.BASE_URL}dashboard-3d.png`} 
          className="w-full h-full object-cover opacity-30"
          initial={{ scale: 1.1, filter: 'blur(10px)' }}
          animate={{ scale: 1, filter: 'blur(0px)' }}
          transition={{ duration: 7, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg-dark via-bg-dark/50 to-transparent" />
      </div>

      <div className="relative z-10 text-center flex flex-col items-center w-[80vw]">
        <AnimatedText 
          text="Shared Dashboard" 
          className="font-display font-bold text-[6vw] mb-[3vh] text-white"
        />
        
        {phase >= 1 && (
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[2.5vw] text-text-secondary font-body mb-[8vh]"
          >
            Live progress. Timestamped deliverables.
          </motion.p>
        )}

        {phase >= 2 && (
          <div className="grid grid-cols-2 gap-[4vw] w-full">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="bg-bg-muted/80 backdrop-blur-md border border-white/10 p-[3vw] rounded-3xl flex flex-col items-center"
            >
              <div className="text-[4vw] mb-[2vh]">👀</div>
              <h4 className="text-[2vw] text-white font-bold mb-[1vh]">No More Blackouts</h4>
              <p className="text-text-secondary text-[1.5vw]">Both sides see exactly what's happening, in real-time.</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
              className="bg-bg-muted/80 backdrop-blur-md border border-primary/30 p-[3vw] rounded-3xl flex flex-col items-center shadow-[0_0_30px_rgba(234,179,8,0.1)]"
            >
              <div className="text-[4vw] mb-[2vh]">⭐</div>
              <h4 className="text-[2vw] text-white font-bold mb-[1vh]">94% Satisfaction Rate</h4>
              <p className="text-text-secondary text-[1.5vw]">Because accountability drives results.</p>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
