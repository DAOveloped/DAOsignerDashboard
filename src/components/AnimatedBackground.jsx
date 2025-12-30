import { useMemo } from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  // Generate random particles
  const particles = useMemo(() => {
    return Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 15}s`,
      duration: `${15 + Math.random() * 10}s`,
      size: `${3 + Math.random() * 4}px`,
      color: i % 3 === 0
        ? 'rgba(139, 92, 246, 0.6)'
        : i % 3 === 1
          ? 'rgba(6, 182, 212, 0.4)'
          : 'rgba(245, 158, 11, 0.3)'
    }));
  }, []);

  return (
    <>
      {/* Base animated gradient background */}
      <div className="animated-bg" />

      {/* Large gradient orbs - fixed position, visible throughout the page */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>
        {/* Primary purple/cyan orb - top left area */}
        <motion.div
          className="absolute w-[600px] h-[600px] md:w-[800px] md:h-[800px] bg-gradient-to-br from-purple-500/25 via-cyan-500/15 to-amber-500/10 blur-3xl rounded-full"
          style={{ top: '10%', left: '5%' }}
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary amber/purple orb - bottom right area */}
        <motion.div
          className="absolute w-[500px] h-[500px] md:w-[700px] md:h-[700px] bg-gradient-to-br from-amber-500/15 via-purple-500/20 to-cyan-500/10 blur-3xl rounded-full"
          style={{ bottom: '10%', right: '5%' }}
          animate={{
            x: [0, -40, 0],
            y: [0, -50, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Third accent orb - center area, subtle */}
        <motion.div
          className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] bg-gradient-to-br from-cyan-500/10 via-purple-500/15 to-transparent blur-3xl rounded-full"
          style={{ top: '40%', left: '40%' }}
          animate={{
            x: [0, -30, 30, 0],
            y: [0, 40, -20, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Floating particles */}
      <div className="particles">
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: particle.left,
              animationDelay: particle.delay,
              animationDuration: particle.duration,
              width: particle.size,
              height: particle.size,
              background: particle.color,
            }}
          />
        ))}
      </div>

      {/* Noise texture overlay */}
      <div className="noise-overlay" />
    </>
  );
};

export default AnimatedBackground;
