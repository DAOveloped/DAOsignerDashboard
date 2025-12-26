import { useMemo } from 'react';

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
      {/* Animated gradient background */}
      <div className="animated-bg" />

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
