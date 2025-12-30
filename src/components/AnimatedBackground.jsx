import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  return (
    <>
      {/* Deep dark base */}
      <div className="animated-bg" />

      {/* Artistic iridescent layers */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: -1 }}>

        {/* Primary aurora sweep - flows diagonally across screen */}
        <motion.div
          className="absolute"
          style={{
            width: '200%',
            height: '60%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(139,92,246,0.15) 15%, rgba(6,182,212,0.2) 35%, rgba(236,72,153,0.15) 55%, rgba(168,85,247,0.18) 75%, transparent 100%)',
            top: '10%',
            left: '-50%',
            filter: 'blur(80px)',
            transform: 'rotate(-12deg)',
          }}
          animate={{
            x: [0, 100, 0],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary aurora sweep - opposite direction */}
        <motion.div
          className="absolute"
          style={{
            width: '200%',
            height: '50%',
            background: 'linear-gradient(90deg, transparent 0%, rgba(52,211,153,0.12) 20%, rgba(59,130,246,0.18) 40%, rgba(139,92,246,0.15) 60%, rgba(244,114,182,0.12) 80%, transparent 100%)',
            bottom: '5%',
            left: '-50%',
            filter: 'blur(90px)',
            transform: 'rotate(8deg)',
          }}
          animate={{
            x: [0, -80, 0],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Iridescent focal point - top left */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '800px',
            height: '800px',
            background: 'conic-gradient(from 0deg, rgba(139,92,246,0.25), rgba(6,182,212,0.2), rgba(52,211,153,0.15), rgba(250,204,21,0.1), rgba(251,146,60,0.15), rgba(236,72,153,0.2), rgba(139,92,246,0.25))',
            top: '-20%',
            left: '-15%',
            filter: 'blur(100px)',
          }}
          animate={{
            rotate: [0, 360],
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 60, repeat: Infinity, ease: "linear" },
            scale: { duration: 15, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Iridescent focal point - bottom right */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '700px',
            height: '700px',
            background: 'conic-gradient(from 180deg, rgba(236,72,153,0.2), rgba(168,85,247,0.25), rgba(59,130,246,0.2), rgba(34,211,238,0.15), rgba(52,211,153,0.18), rgba(250,204,21,0.12), rgba(236,72,153,0.2))',
            bottom: '-15%',
            right: '-10%',
            filter: 'blur(90px)',
          }}
          animate={{
            rotate: [360, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            rotate: { duration: 50, repeat: Infinity, ease: "linear" },
            scale: { duration: 18, repeat: Infinity, ease: "easeInOut" },
          }}
        />

        {/* Floating iridescent ribbon - center */}
        <motion.div
          className="absolute"
          style={{
            width: '120%',
            height: '200px',
            background: 'linear-gradient(180deg, transparent, rgba(139,92,246,0.1) 20%, rgba(6,182,212,0.15) 40%, rgba(236,72,153,0.12) 60%, rgba(168,85,247,0.1) 80%, transparent)',
            top: '40%',
            left: '-10%',
            filter: 'blur(60px)',
            transform: 'rotate(-5deg)',
          }}
          animate={{
            y: [-30, 30, -30],
            x: [-20, 20, -20],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Subtle shimmer accents */}
        <motion.div
          className="absolute rounded-full"
          style={{
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            top: '25%',
            right: '20%',
            filter: 'blur(40px)',
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute rounded-full"
          style={{
            width: '300px',
            height: '300px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
            bottom: '30%',
            left: '15%',
            filter: 'blur(30px)',
          }}
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

      </div>

      {/* Subtle noise texture overlay for depth */}
      <div className="noise-overlay" />
    </>
  );
};

export default AnimatedBackground;
