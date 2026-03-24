import { AnimatePresence, motion } from 'framer-motion';
import { useVideoPlayer } from '@/lib/video';
import { Scene1_Hook } from './Scene1_Hook';
import { Scene2_Reveal } from './Scene2_Reveal';
import { Scene3_Escrow } from './Scene3_Escrow';
import { Scene4_Matching } from './Scene4_Matching';
import { Scene5_Dashboard } from './Scene5_Dashboard';
import { Scene6_Closing } from './Scene6_Closing';

const SCENE_DURATIONS = {
  hook: 13000,
  reveal: 8000,
  escrow: 11500,
  matching: 10000,
  dashboard: 9500,
  closing: 11000,
};

export default function VideoTemplate() {
  const { currentScene } = useVideoPlayer({
    durations: SCENE_DURATIONS,
  });

  return (
    <div
      className="w-full h-screen overflow-hidden relative"
      style={{ backgroundColor: 'var(--color-bg-dark)' }}
    >
      {/* Global persistent elements could go here */}
      <div className="absolute inset-0 pointer-events-none z-50">
        <motion.div 
          className="absolute top-[4vh] right-[4vw] text-white/50 font-display text-[1.5vw] font-bold tracking-widest uppercase mix-blend-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Lerank
        </motion.div>
      </div>

      {/* mode="wait" = sequential, "sync" = simultaneous, "popLayout" = new snaps in while old animates out */}
      <AnimatePresence mode="wait">
        {currentScene === 0 && <Scene1_Hook key="hook" />}
        {currentScene === 1 && <Scene2_Reveal key="reveal" />}
        {currentScene === 2 && <Scene3_Escrow key="escrow" />}
        {currentScene === 3 && <Scene4_Matching key="matching" />}
        {currentScene === 4 && <Scene5_Dashboard key="dashboard" />}
        {currentScene === 5 && <Scene6_Closing key="closing" />}
      </AnimatePresence>
    </div>
  );
}
