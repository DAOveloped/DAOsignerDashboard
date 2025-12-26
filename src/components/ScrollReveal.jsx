import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const ScrollReveal = ({
  children,
  className = '',
  delay = 0,
  direction = 'up', // 'up', 'down', 'left', 'right', 'none'
  duration = 0.8,
  distance = 50,
  once = true
}) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: once,
  });

  const getInitialPosition = () => {
    switch (direction) {
      case 'up': return { y: distance, x: 0 };
      case 'down': return { y: -distance, x: 0 };
      case 'left': return { y: 0, x: distance };
      case 'right': return { y: 0, x: -distance };
      case 'none': return { y: 0, x: 0 };
      default: return { y: distance, x: 0 };
    }
  };

  const variants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(),
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
