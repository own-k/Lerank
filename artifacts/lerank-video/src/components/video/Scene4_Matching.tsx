import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { AnimatedText } from './Typography';
import { sceneTransitions } from '@/lib/video';

export function Scene4_Matching() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1200),
      setTimeout(() => setPhase(2), 2400),
      setTimeout(() => setPhase(3), 3600),
      setTimeout(() => setPhase(4), 4800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const tags = [
    { label: 'GPA 3.8+', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
    { label: 'Budget $5k', color: 'bg-green-500/20 text-green-300 border-green-500/30' },
    { label: 'Master\'s Degree', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { label: 'Target: USA', color: 'bg-orange-500/20 text-orange-300 border-orange-500/30' },
  ];

  return (
    <motion.div 
      className="absolute inset-0 w-full h-full flex flex-row items-center justify-center bg-bg-dark"
      {...sceneTransitions.clipPolygon}
    >
      {/* Left side text */}
      <div className="w-1/2 p-[6vw] relative z-10 flex flex-col justify-center">
        <AnimatedText 
          text="Precision Matching Engine" 
          className="font-display font-bold text-[5vw] mb-[4vh] leading-tight text-white"
        />
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="text-[2vw] text-text-secondary font-body mb-[6vh]"
        >
          Your top match, tailored to you. Ranked by:
        </motion.p>

        <div className="flex flex-wrap gap-[1vw]">
          {tags.map((tag, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.8, x: -20 }}
              animate={phase >= i + 1 ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className={`px-[2vw] py-[1vh] rounded-full border text-[1.5vw] font-mono ${tag.color}`}
            >
              {tag.label}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right side visuals */}
      <div className="w-1/2 h-full relative flex items-center justify-center overflow-hidden">
        <motion.img 
          src={`${import.meta.env.BASE_URL}matching-3d.png`} 
          alt="3D Matching"
          className="absolute max-w-[100%] max-h-[100%] object-contain"
          initial={{ y: 100, opacity: 0, rotate: -10 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 25, delay: 0.5 }}
        />
        
        {phase >= 4 && (
          <motion.div 
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="absolute z-20 bg-bg-dark/80 backdrop-blur-xl border border-white/20 p-[2vw] rounded-3xl text-center shadow-[0_0_50px_rgba(234,179,8,0.2)]"
          >
            <div className="text-primary text-[5vw] font-bold font-mono mb-[1vh]">99%</div>
            <div className="text-white text-[1.5vw]">Match Score</div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
