import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AnimatedText } from './Typography';
import { sceneTransitions } from '@/lib/video';

export function Scene3_Escrow() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),
      setTimeout(() => setPhase(2), 3500),
      setTimeout(() => setPhase(3), 5500),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const flowVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 25 } }
  };

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center bg-bg-muted"
      {...sceneTransitions.slideLeft}
    >
      <div className="absolute top-[8vh] left-[8vw] z-20">
        <AnimatedText text="The Escrow Flow" className="text-[3vw] font-display font-bold text-white mb-[1vh]" />
        <div className="h-[0.5vh] w-[8vw] bg-primary rounded-full" />
      </div>

      <div className="relative z-10 w-full px-[8vw] flex flex-col items-center">
        
        <div className="flex items-center justify-between w-full relative">
          {/* Connecting Line */}
          <div className="absolute top-1/2 left-0 w-full h-[0.5vh] bg-white/10 -translate-y-1/2 z-0" />
          <motion.div 
            className="absolute top-1/2 left-0 h-[0.5vh] bg-primary -translate-y-1/2 z-0 origin-left"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: phase === 1 ? 0.33 : phase === 2 ? 0.66 : phase === 3 ? 1 : 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Step 1 */}
          <motion.div 
            variants={flowVariants}
            initial="hidden"
            animate="visible"
            className="relative z-10 flex flex-col items-center"
          >
            <div className={`w-[8vw] h-[8vw] rounded-full flex items-center justify-center text-[3vw] mb-[3vh] shadow-2xl transition-colors duration-500 ${phase >= 0 ? 'bg-primary text-bg-dark' : 'bg-bg-dark border-2 border-white/20'}`}>
              💰
            </div>
            <h3 className="text-[1.8vw] font-bold font-display text-white">Student Funds</h3>
            <p className="text-text-secondary text-[1.2vw] mt-[1vh]">Money held safely</p>
          </motion.div>

          {/* Step 2 */}
          <motion.div 
            variants={flowVariants}
            initial="hidden"
            animate={phase >= 1 ? "visible" : "hidden"}
            className="relative z-10 flex flex-col items-center"
          >
            <div className={`w-[8vw] h-[8vw] rounded-full flex items-center justify-center text-[3vw] mb-[3vh] shadow-2xl transition-colors duration-500 ${phase >= 1 ? 'bg-accent text-bg-dark' : 'bg-bg-dark border-2 border-white/20'}`}>
              📝
            </div>
            <h3 className="text-[1.8vw] font-bold font-display text-white">Consultant Delivers</h3>
            <p className="text-text-secondary text-[1.2vw] mt-[1vh]">Milestone complete</p>
          </motion.div>

          {/* Step 3 */}
          <motion.div 
            variants={flowVariants}
            initial="hidden"
            animate={phase >= 2 ? "visible" : "hidden"}
            className="relative z-10 flex flex-col items-center"
          >
            <div className={`w-[8vw] h-[8vw] rounded-full flex items-center justify-center text-[3vw] mb-[3vh] shadow-2xl transition-colors duration-500 ${phase >= 2 ? 'bg-white text-bg-dark' : 'bg-bg-dark border-2 border-white/20'}`}>
              ✅
            </div>
            <h3 className="text-[1.8vw] font-bold font-display text-white">Student Approves</h3>
            <p className="text-text-secondary text-[1.2vw] mt-[1vh]">Verifies quality</p>
          </motion.div>

          {/* Step 4 */}
          <motion.div 
            variants={flowVariants}
            initial="hidden"
            animate={phase >= 3 ? "visible" : "hidden"}
            className="relative z-10 flex flex-col items-center"
          >
            <div className={`w-[8vw] h-[8vw] rounded-full flex items-center justify-center text-[3vw] mb-[3vh] shadow-2xl transition-colors duration-500 ${phase >= 3 ? 'bg-success text-white' : 'bg-bg-dark border-2 border-white/20'}`}>
              💸
            </div>
            <h3 className="text-[1.8vw] font-bold font-display text-white">Funds Release</h3>
            <p className="text-text-secondary text-[1.2vw] mt-[1vh]">Zero disputes</p>
          </motion.div>
        </div>

        {phase >= 3 && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-[10vh] px-[4vw] py-[2vh] bg-success/10 border border-success/30 rounded-2xl text-center"
          >
            <span className="text-success text-[3vw] font-mono font-bold block">$0</span>
            <span className="text-white text-[1.5vw]">Lost to disputes</span>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
