import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxSection = ({
  children,
  className = '',
  speed = 0.5,
  fadeIn = true,
  direction = 'up' // 'up', 'down', 'left', 'right'
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Calculate transform based on direction
  const yRange = direction === 'up' ? [100 * speed, -100 * speed] :
                 direction === 'down' ? [-100 * speed, 100 * speed] : [0, 0];
  const xRange = direction === 'left' ? [100 * speed, -100 * speed] :
                 direction === 'right' ? [-100 * speed, 100 * speed] : [0, 0];

  const y = useTransform(scrollYProgress, [0, 1], yRange);
  const x = useTransform(scrollYProgress, [0, 1], xRange);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    fadeIn ? [0, 1, 1, 0] : [1, 1, 1, 1]
  );

  return (
    <motion.div
      ref={ref}
      style={{ y, x, opacity }}
      className={`parallax-wrapper ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default ParallaxSection;
