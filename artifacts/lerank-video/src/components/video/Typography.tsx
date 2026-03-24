import { motion } from 'framer-motion';
import { charVariants, staggerConfigs } from '@/lib/video/animations';

export const AnimatedText = ({
  text,
  className = '',
  stagger = 'charMedium',
}: {
  text: string;
  className?: string;
  stagger?: keyof typeof staggerConfigs;
}) => {
  return (
    <motion.div
      variants={{
        hidden: {},
        visible: {
          transition: staggerConfigs[stagger],
        },
      }}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {text.split(' ').map((word, wordIndex) => (
        <span key={wordIndex} className="inline-block mr-[0.25em] whitespace-nowrap">
          {word.split('').map((char, charIndex) => (
            <motion.span
              key={charIndex}
              variants={charVariants}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.div>
  );
};
